import { useRef, useEffect, useState } from 'react';
import { 
  getCoordinates, 
  drawBezierCurve, 
  drawBezierGuides, 
  createAnchorPoint,
  isNearHandle,
  updateHandle
} from './utils/canvasUtils';
import { PencilLine } from 'lucide-react';
import ToolBar from './ToolBar';

const Canvas = ({
  canvasRef,
  currentTool,
  isDrawing,
  startDrawing,
  draw,
  stopDrawing,
  handleCanvasClick,
  handlePenClick,
  handleGeneration,
  tempPoints,
  setTempPoints,
  handleUndo,
  clearCanvas,
  setCurrentTool
}) => {
  const [showBezierGuides, setShowBezierGuides] = useState(true);
  const [activePoint, setActivePoint] = useState(-1);
  const [activeHandle, setActiveHandle] = useState(null);
  const [symmetric, setSymmetric] = useState(true);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [hasDrawing, setHasDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);

  // Add touch event prevention function
  useEffect(() => {
    // Function to prevent default touch behavior on canvas
    const preventTouchDefault = (e) => {
      if (isDrawing) {
        e.preventDefault();
      }
    };

    // Add event listener when component mounts
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('touchstart', preventTouchDefault, { passive: false });
      canvas.addEventListener('touchmove', preventTouchDefault, { passive: false });
    }

    // Remove event listener when component unmounts
    return () => {
      if (canvas) {
        canvas.removeEventListener('touchstart', preventTouchDefault);
        canvas.removeEventListener('touchmove', preventTouchDefault);
      }
    };
  }, [isDrawing, canvasRef]);

  // Add debugging info to console
  useEffect(() => {
    console.log('Canvas tool changed or isDrawing changed:', { currentTool, isDrawing });
  }, [currentTool, isDrawing]);

  // Redraw bezier guides and control points when tempPoints change
  useEffect(() => {
    if (currentTool === 'pen' && tempPoints.length > 0 && showBezierGuides) {
      redrawBezierGuides();
    }
  }, [tempPoints, showBezierGuides, currentTool]);

  // Add useEffect to check if canvas has content
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Check if canvas has any non-white pixels (i.e., has a drawing)
    const hasNonWhitePixels = Array.from(imageData.data).some((pixel, index) => {
      // Check only RGB values (skip alpha)
      return index % 4 !== 3 && pixel !== 255;
    });
    
    setHasDrawing(hasNonWhitePixels);
  }, [canvasRef]);

  const handleKeyDown = (e) => {
    // Add keyboard accessibility
    if (e.key === 'Enter' || e.key === ' ') {
      handleCanvasClick(e);
    }
    
    // Toggle symmetric handles with Shift key
    if (e.key === 'Shift') {
      setSymmetric(!symmetric);
    }
  };

  // Draw bezier control points and guide lines
  const redrawBezierGuides = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get the canvas context
    const ctx = canvas.getContext('2d');
    
    // Save the current canvas state to redraw later
    const canvasImage = new Image();
    canvasImage.src = canvas.toDataURL();
    
    canvasImage.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Redraw the canvas content
      ctx.drawImage(canvasImage, 0, 0);
      
      // Draw the control points and guide lines
      drawBezierGuides(ctx, tempPoints);
    };
  };

  // Custom handler for stopping drawing with pen tool
  const handleStopDrawing = (e) => {
    console.log('handleStopDrawing called', { 
      eventType: e?.type, 
      currentTool, 
      isDrawing, 
      activePoint, 
      activeHandle
    });
    
    // If we're using the pen tool with active point or handle
    if (currentTool === 'pen') {
      // If we were dragging a handle, just release it
      if (activeHandle) {
        setActiveHandle(null);
        return;
      }
      
      // If we were dragging an anchor point, just release it
      if (activePoint !== -1) {
        setActivePoint(-1);
        return;
      }
    }
    
    stopDrawing(e);
    
    // If using the pencil tool and we've just finished a drag, trigger generation
    if (currentTool === 'pencil' && isDrawing) {
      console.log(`${currentTool} tool condition met, will try to trigger generation`);
      
      // Small delay to ensure the drawing is complete
      setTimeout(() => {
        console.log('Attempting to call handleGeneration after timeout');
        if (typeof handleGeneration === 'function') {
          console.log('Calling handleGeneration function');
          handleGeneration();
        } else {
          console.error('handleGeneration is not a function:', handleGeneration);
        }
      }, 100);
    } else {
      console.log('Generation not triggered because:', { 
        isPenTool: currentTool === 'pen',
        isPencilTool: currentTool === 'pencil',
        wasDrawing: isDrawing 
      });
    }
  };

  // Check if we clicked on an existing point or handle
  const checkForPointOrHandle = (e) => {
    if (currentTool !== 'pen' || !showBezierGuides || tempPoints.length === 0) {
      return false;
    }
    
    const canvas = canvasRef.current;
    const { x, y } = getCoordinates(e, canvas);
    setLastMousePos({ x, y });
    
    // Check if we clicked on a handle
    for (let i = 0; i < tempPoints.length; i++) {
      const point = tempPoints[i];
      
      // Check for handleIn
      if (isNearHandle(point, 'handleIn', x, y)) {
        setActivePoint(i);
        setActiveHandle('handleIn');
        return true;
      }
      
      // Check for handleOut
      if (isNearHandle(point, 'handleOut', x, y)) {
        setActivePoint(i);
        setActiveHandle('handleOut');
        return true;
      }
      
      // Check for the anchor point itself
      const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
      if (distance <= 10) {
        setActivePoint(i);
        setActiveHandle(null);
        return true;
      }
    }
    
    return false;
  };
  
  // Handle mouse move for bezier control point or handle dragging
  const handleBezierMouseMove = (e) => {
    if (currentTool !== 'pen') {
      return false;
    }
    
    const canvas = canvasRef.current;
    const { x, y } = getCoordinates(e, canvas);
    const dx = x - lastMousePos.x;
    const dy = y - lastMousePos.y;
    
    // If we're dragging a handle
    if (activePoint !== -1 && activeHandle) {
      const newPoints = [...tempPoints];
      updateHandle(newPoints[activePoint], activeHandle, dx, dy, symmetric);
      setTempPoints(newPoints);
      setLastMousePos({ x, y });
      return true;
    }
    
    // If we're dragging an anchor point
    if (activePoint !== -1) {
      const newPoints = [...tempPoints];
      newPoints[activePoint].x += dx;
      newPoints[activePoint].y += dy;
      
      // If this point has handles, move them with the point
      if (newPoints[activePoint].handleIn) {
        // No need to change the handle's offset, just move with the point
      }
      
      if (newPoints[activePoint].handleOut) {
        // No need to change the handle's offset, just move with the point
      }
      
      setTempPoints(newPoints);
      setLastMousePos({ x, y });
      return true;
    }
    
    return false;
  };

  // Handle clicks for bezier curve tool
  const handlePenToolClick = (e) => {
    const canvas = canvasRef.current;
    const { x, y } = getCoordinates(e, canvas);
    
    // Add a new point
    if (tempPoints.length === 0) {
      // First point has no handles initially
      const newPoint = { x, y, handleIn: null, handleOut: null };
      setTempPoints([newPoint]);
    } else {
      // Create a new point with handles relative to the last point
      const newPoint = createAnchorPoint(x, y, tempPoints[tempPoints.length - 1]);
      setTempPoints([...tempPoints, newPoint]);
    }
    
    // Always show guides when adding points
    setShowBezierGuides(true);
  };
  
  // Toggle bezier guide visibility
  const toggleBezierGuides = () => {
    setShowBezierGuides(!showBezierGuides);
    if (showBezierGuides) {
      redrawBezierGuides();
    }
  };

  // Draw the final bezier curve and clear control points
  const finalizeBezierCurve = () => {
    if (tempPoints.length < 2) {
      // Need at least 2 points for a path
      console.log('Need at least 2 control points to draw a path');
      return;
    }
    
    const canvas = canvasRef.current;
    
    // Draw the actual bezier curve
    drawBezierCurve(canvas, tempPoints);
    
    // Hide guides and reset control points
    setShowBezierGuides(false);
    setTempPoints([]);
    
    // Trigger generation
    setTimeout(() => {
      if (typeof handleGeneration === 'function') {
        handleGeneration();
      }
    }, 100);
  };

  // Add control point to segment
  const addControlPoint = (e) => {
    if (currentTool !== 'pen' || tempPoints.length < 2) return;
    
    const canvas = canvasRef.current;
    const { x, y } = getCoordinates(e, canvas);
    
    // Find the closest segment to add a point to
    let closestDistance = Number.POSITIVE_INFINITY;
    let insertIndex = -1;
    
    for (let i = 0; i < tempPoints.length - 1; i++) {
      const p1 = tempPoints[i];
      const p2 = tempPoints[i + 1];
      
      // Calculate distance from click to line between points
      // This is a simplified distance calculation for demo purposes
      const lineLength = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
      if (lineLength === 0) continue;
      
      // Project point onto line
      const t = ((x - p1.x) * (p2.x - p1.x) + (y - p1.y) * (p2.y - p1.y)) / (lineLength * lineLength);
      
      // If projection is outside the line segment, skip
      if (t < 0 || t > 1) continue;
      
      // Calculate closest point on line
      const closestX = p1.x + t * (p2.x - p1.x);
      const closestY = p1.y + t * (p2.y - p1.y);
      
      // Calculate distance to closest point
      const distance = Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2);
      
      if (distance < closestDistance && distance < 20) {
        closestDistance = distance;
        insertIndex = i + 1;
      }
    }
    
    if (insertIndex > 0) {
      // Create a new array with the new point inserted
      const newPoints = [...tempPoints];
      const prevPoint = newPoints[insertIndex - 1];
      const nextPoint = newPoints[insertIndex];
      
      // Create a new point at the click position with automatically calculated handles
      const newPoint = { 
        x, 
        y,
        // Calculate handles based on the positions of adjacent points
        handleIn: { 
          x: (prevPoint.x - x) * 0.25, 
          y: (prevPoint.y - y) * 0.25 
        },
        handleOut: { 
          x: (nextPoint.x - x) * 0.25, 
          y: (nextPoint.y - y) * 0.25 
        }
      };
      
      // Insert the new point
      newPoints.splice(insertIndex, 0, newPoint);
      setTempPoints(newPoints);
    }
  };

  // Wrap the original startDrawing function to handle empty canvas
  const handleStartDrawing = (e) => {
    // Call the original startDrawing function
    startDrawing(e);
    setHasDrawing(true);
  };

  return (
    <div className="relative">
      {currentTool === 'pen' && (
        <div className="flex flex-wrap mb-3 gap-2">
          <button
            type="button"
            onClick={toggleBezierGuides}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm shadow-soft hover:bg-gray-300 transition-colors"
          >
            {showBezierGuides ? 'Hide Guides' : 'Show Guides'}
          </button>
          
          <button
            type="button"
            onClick={() => setSymmetric(!symmetric)}
            className={`px-2 py-1 ${symmetric ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg text-sm shadow-soft hover:bg-gray-300 hover:text-gray-800 transition-colors`}
          >
            {symmetric ? 'Symmetric Handles' : 'Free Handles'}
          </button>
          
          {tempPoints.length >= 2 && (
            <button
              type="button"
              onClick={finalizeBezierCurve}
              className="px-2 py-1 bg-gray-700 text-white rounded-lg text-sm shadow-soft hover:bg-gray-800 transition-colors"
            >
              Draw Path
            </button>
          )}
          
          {tempPoints.length > 0 && (
            <button
              type="button"
              onClick={() => setTempPoints([])}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm shadow-soft hover:bg-gray-300 transition-colors"
            >
              Clear Points
            </button>
          )}
          
          <span className="text-sm ml-2 text-gray-600">
            {tempPoints.length} point{tempPoints.length !== 1 ? 's' : ''} 
            {tempPoints.length >= 2 ? ' (ready)' : ' (need 2+)'}
          </span>
          
          <div className="w-full text-xs text-gray-500 mt-1">
            Tip: Click to add points, click + drag handles to adjust curves, double-click on segments to add points
          </div>
        </div>
      )}
      
      <div className="relative">
        {/* ToolBar component - absolutely positioned in the top right */}
        <div className="absolute top-4 right-4 z-10">
          <ToolBar 
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
            handleUndo={handleUndo}
            clearCanvas={clearCanvas}
          />
        </div>

        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          onMouseDown={(e) => {
            console.log('Canvas onMouseDown', { currentTool, isDrawing });
            
            // For pen (bezier) tool, handle differently
            if (currentTool === 'pen') {
              // Check if we clicked on an existing point or handle
              if (!checkForPointOrHandle(e)) {
                // If not interacting with existing points/handles, add a new point
                handlePenToolClick(e);
              }
            } else {
              // For other tools, use the regular drawing behavior
              console.log('Executing regular startDrawing handler');
              handleStartDrawing(e);
            }
          }}
          onMouseMove={(e) => {
            // For pen (bezier) tool, handle control point/handle dragging
            if (currentTool === 'pen' && handleBezierMouseMove(e)) {
              // If we handled a bezier element move, return early
              return;
            }
            
            // For other tools, use regular drawing
            draw(e);
          }}
          onMouseUp={(e) => {
            console.log('onMouseUp event triggered', { currentTool, isDrawing });
            handleStopDrawing(e);
          }}
          onMouseLeave={(e) => {
            console.log('onMouseLeave event triggered', { currentTool, isDrawing });
            handleStopDrawing(e);
          }}
          onDoubleClick={(e) => {
            if (currentTool === 'pen') {
              addControlPoint(e);
            } else {
              handleCanvasClick(e);
            }
          }}
          onClick={handleCanvasClick}
          onTouchStart={handleStartDrawing}
          onTouchMove={draw}
          onTouchEnd={handleStopDrawing}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className={`border border-gray-300 w-full sm:h-[60vh] h-[30vh] min-h-[320px] bg-white rounded-xl shadow-soft touch-none ${
            currentTool === 'pen' ? 'cursor-crosshair' : 'hover:cursor-crosshair'
          }`}
          aria-label="Drawing canvas"
        />
        
        {/* Placeholder overlay */}
        {!hasDrawing && !isDrawing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <PencilLine className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500 text-xl font-medium">Draw here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas; 