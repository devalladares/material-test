import { useState, useRef, useEffect, useCallback } from "react";
import Canvas from "./Canvas";
import DisplayCanvas from "./DisplayCanvas";
import ToolBar from "./ToolBar";
import StyleSelector from "./StyleSelector";
import { getPromptForStyle } from "./StyleSelector";
import ActionBar from "./ActionBar";
import ErrorModal from "./ErrorModal";
import TextInput from "./TextInput";
import Header from "./Header";
import { getCoordinates, initializeCanvas, drawImageToCanvas, drawBezierCurve } from "./utils/canvasUtils";

const CanvasContainer = () => {
  const canvasRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const colorInputRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customApiKey, setCustomApiKey] = useState("");
  const [styleMode, setStyleMode] = useState('material');
  const [strokeCount, setStrokeCount] = useState(0);
  const strokeTimeoutRef = useRef(null);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const MIN_REQUEST_INTERVAL = 2000; // Minimum 2 seconds between requests
  const [currentTool, setCurrentTool] = useState('pencil'); // 'pencil', 'pen', 'eraser', 'text'
  const [isTyping, setIsTyping] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [bezierPoints, setBezierPoints] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const textInputRef = useRef(null);
  const [isPenDrawing, setIsPenDrawing] = useState(false);
  const [currentBezierPath, setCurrentBezierPath] = useState([]);
  const [tempPoints, setTempPoints] = useState([]);
  const [hasGeneratedContent, setHasGeneratedContent] = useState(false);

  // Load background image when generatedImage changes
  useEffect(() => {
    if (generatedImage && canvasRef.current) {
      // Use the window.Image constructor to avoid conflict with Next.js Image component
      const img = new window.Image();
      img.onload = () => {
        backgroundImageRef.current = img;
        drawImageToCanvas(canvasRef.current, backgroundImageRef.current);
      };
      img.src = generatedImage;
    }
  }, [generatedImage]);

  // Initialize canvas with white background when component mounts
  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas(canvasRef.current);
    }
  }, []);

  const startDrawing = (e) => {
    const { x, y } = getCoordinates(e, canvasRef.current);
    
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    
    console.log('startDrawing called', { currentTool, x, y });
    
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setStrokeCount(prev => prev + 1);
    
    // Save canvas state before drawing
    saveCanvasState();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e, canvas);
    
    // Occasionally log drawing activity
    if (Math.random() < 0.05) { // Only log ~5% of move events to avoid console spam
      console.log('draw called', { currentTool, isDrawing, x, y });
    }
    
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    
    if (currentTool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 20;
    } else {
      ctx.strokeStyle = '#000000';
    }
    
    if (currentTool === 'pen') {
      // Show preview line while moving
      if (tempPoints.length > 0) {
        const lastPoint = tempPoints[tempPoints.length - 1];
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = async (e) => {
    console.log('stopDrawing called in CanvasContainer', { 
      isDrawing, 
      currentTool, 
      hasEvent: !!e,
      eventType: e ? e.type : 'none'
    });
    
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Remove the timeout-based generation
    if (strokeTimeoutRef.current) {
      clearTimeout(strokeTimeoutRef.current);
      strokeTimeoutRef.current = null;
    }

    // The Canvas component will handle generation for pen and pencil tools directly
    // This function now primarily handles stroke counting for other tools
    
    // Only generate on mouse/touch up events when not using the pen or pencil tool
    // (since those are handled by the Canvas component)
    if (e && (e.type === 'mouseup' || e.type === 'touchend') && 
        currentTool !== 'pen' && currentTool !== 'pencil') {
      console.log('stopDrawing: detected mouseup/touchend event', { strokeCount });
      // Check if we have enough strokes to generate (increased to 10 from 3)
      if (strokeCount >= 10) {
        console.log('stopDrawing: calling handleGeneration due to stroke count');
        await handleGeneration();
        setStrokeCount(0);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    initializeCanvas(canvas);
    
    setGeneratedImage(null);
    backgroundImageRef.current = null;
    
    // Also clear the display canvas and reset generated content flag
    if (displayCanvasRef.current) {
      const displayCtx = displayCanvasRef.current.getContext('2d');
      displayCtx.clearRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
      displayCtx.fillStyle = '#FFFFFF';
      displayCtx.fillRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
      setHasGeneratedContent(false);
    }
    
    // Save empty canvas state
    saveCanvasState();
  };

  const handleGeneration = useCallback(async () => {
    console.log('handleGeneration called');
    
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      console.log("Request throttled - too soon after last request");
      return;
    }
    
    setLastRequestTime(now);
    if (!canvasRef.current) return;
    
    console.log('Starting generation process');
    setIsLoading(true);
    
    try {
      const canvas = canvasRef.current;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      
      tempCtx.fillStyle = '#FFFFFF';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.drawImage(canvas, 0, 0);
      
      const drawingData = tempCanvas.toDataURL("image/png").split(",")[1];
      
      const requestPayload = {
        prompt: getPromptForStyle(styleMode),
        drawingData,
        customApiKey
      };
      
      console.log('Making API request with style:', styleMode);
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });
      
      console.log('API response received, status:', response.status);
      
      const data = await response.json();
      
      if (data.success && data.imageData) {
        console.log('Image generated successfully');
        const imageUrl = `data:image/png;base64,${data.imageData}`;
        
        // Draw the generated image to the display canvas
        const displayCanvas = displayCanvasRef.current;
        if (!displayCanvas) {
          console.error('Display canvas ref is null');
          return;
        }
        
        const displayCtx = displayCanvas.getContext('2d');
        
        // Clear the display canvas first
        displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
        displayCtx.fillStyle = '#FFFFFF';
        displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);
        
        // Create and load the new image
        const img = new Image();
        
        // Set up the onload handler before setting the src
        img.onload = () => {
          console.log('Generated image loaded, drawing to display canvas');
          displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
          displayCtx.drawImage(img, 0, 0, displayCanvas.width, displayCanvas.height);
          console.log('Image drawn to display canvas');
          
          // Update our state to indicate we have generated content
          setHasGeneratedContent(true);
        };
        
        // Set the src to trigger loading
        img.src = imageUrl;
      } else {
        console.error("Failed to generate image:", data.error);
        
        // When generation fails, ensure display canvas is cleared
        if (displayCanvasRef.current) {
          const displayCtx = displayCanvasRef.current.getContext('2d');
          displayCtx.clearRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
          displayCtx.fillStyle = '#FFFFFF';
          displayCtx.fillRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
        }
        
        // Make sure we mark that we don't have generated content
        setHasGeneratedContent(false);
        
        if (data.error && (
          data.error.includes("Resource has been exhausted") || 
          data.error.includes("quota") ||
          response.status === 429 ||
          response.status === 500
        )) {
          setErrorMessage(data.error);
          setShowErrorModal(true);
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
      setShowErrorModal(true);
      
      // When generation errors, ensure display canvas is cleared
      if (displayCanvasRef.current) {
        const displayCtx = displayCanvasRef.current.getContext('2d');
        displayCtx.clearRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
        displayCtx.fillStyle = '#FFFFFF';
        displayCtx.fillRect(0, 0, displayCanvasRef.current.width, displayCanvasRef.current.height);
      }
      
      // Make sure we mark that we don't have generated content
      setHasGeneratedContent(false);
    } finally {
      setIsLoading(false);
      console.log('Generation process completed');
    }
  }, [
    lastRequestTime, 
    styleMode, 
    customApiKey
  ]);

  // Close the error modal
  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  // Handle the custom API key submission
  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    setShowErrorModal(false);
    // Will use the customApiKey state in the next API call
  };

  // Add this function to handle undo
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const previousState = undoStack[undoStack.length - 2]; // Get second to last state
      
      if (previousState) {
        const img = new Image();
        img.onload = () => {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = previousState;
      } else {
        // If no previous state, clear to white
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      setUndoStack(prev => prev.slice(0, -1));
    }
  };

  // Add this function to save canvas state
  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL();
    setUndoStack(prev => [...prev, dataURL]);
  };

  // Add this function to handle text input
  const handleTextInput = (e) => {
    if (e.key === 'Enter') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.font = '24px Arial';
      ctx.fillStyle = '#000000';
      ctx.fillText(textInput, textPosition.x, textPosition.y);
      setTextInput('');
      setIsTyping(false);
      saveCanvasState();
    }
  };

  // Modify the canvas click handler to handle text placement
  const handleCanvasClick = (e) => {
    if (currentTool === 'text') {
      const { x, y } = getCoordinates(e, canvasRef.current);
      setTextPosition({ x, y });
      setIsTyping(true);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }
  };

  // Handle pen click for bezier curve tool
  const handlePenClick = (e) => {
    if (currentTool !== 'pen') return;
    
    // Note: Actual point creation is now handled in the Canvas component
    // This function is primarily used as a callback to inform the CanvasContainer
    // that a pen action happened
    
    console.log('handlePenClick called in CanvasContainer');
    
    // Set isDrawing flag to true when using pen tool
    // This ensures handleStopDrawing knows we're in drawing mode with the pen
    setIsDrawing(true);
    
    // Save canvas state when adding new points
    saveCanvasState();
  };

  // Add this new function near your other utility functions
  const handleSaveImage = () => {
    // For the generated image
    if (displayCanvasRef.current) {
      const link = document.createElement('a');
      link.download = 'chrome-study.png';
      link.href = displayCanvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  // Add this function to handle regeneration
  const handleRegenerate = async () => {
    if (canvasRef.current) {
      // Temporarily reset hasGeneratedContent so placeholder shows during loading
      setHasGeneratedContent(false);
      await handleGeneration();
    }
  };

  // Add useEffect to watch for styleMode changes and regenerate
  useEffect(() => {
    // Only trigger if we have something drawn (check if canvas is not empty)
    const checkCanvasAndGenerate = async () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Check if canvas has any non-white pixels
      const hasDrawing = Array.from(imageData.data).some((pixel, index) => {
        // Check only RGB values (skip alpha)
        return index % 4 !== 3 && pixel !== 255;
      });

      if (hasDrawing) {
        await handleGeneration();
      }
    };

    // Skip on first render
    if (styleMode) {
      checkCanvasAndGenerate();
    }
  }, [styleMode, handleGeneration]); // Added handleGeneration to dependency array

  // Cleanup function - keep this to prevent memory leaks
  useEffect(() => {
    return () => {
      if (strokeTimeoutRef.current) {
        clearTimeout(strokeTimeoutRef.current);
        strokeTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-6 md:p-8">
      <div className="relative w-full max-w-7xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Header />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Canvas 
              canvasRef={canvasRef}
              currentTool={currentTool}
              isDrawing={isDrawing}
              startDrawing={startDrawing}
              draw={draw}
              stopDrawing={stopDrawing}
              handleCanvasClick={handleCanvasClick}
              handlePenClick={handlePenClick}
              handleGeneration={handleGeneration}
              tempPoints={tempPoints}
              setTempPoints={setTempPoints}
              handleUndo={handleUndo}
              clearCanvas={clearCanvas}
              setCurrentTool={setCurrentTool}
            />

            <DisplayCanvas 
              displayCanvasRef={displayCanvasRef}
              isLoading={isLoading}
              handleSaveImage={handleSaveImage}
              handleRegenerate={handleRegenerate}
              hasGeneratedContent={hasGeneratedContent}
            />
          </div>

          <div className="w-full mt-4 mb-6">
            <StyleSelector 
              styleMode={styleMode}
              setStyleMode={setStyleMode}
              handleGenerate={handleGeneration}
            />
          </div>
        </div>
      </div>

      <ErrorModal 
        showErrorModal={showErrorModal}
        closeErrorModal={closeErrorModal}
        customApiKey={customApiKey}
        setCustomApiKey={setCustomApiKey}
        handleApiKeySubmit={handleApiKeySubmit}
      />

      <TextInput 
        isTyping={isTyping}
        textInputRef={textInputRef}
        textInput={textInput}
        setTextInput={setTextInput}
        handleTextInput={handleTextInput}
        textPosition={textPosition}
      />
    </div>
  );
};

export default CanvasContainer; 