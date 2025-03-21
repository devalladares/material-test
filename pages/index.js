import { useState, useRef, useEffect } from "react";
import { SendHorizontal, LoaderCircle, Trash2, X, Pencil, Pen, Eraser, Type, Undo2, Download, RefreshCw } from "lucide-react";
import Head from "next/head";

export default function Home() {
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

  // Load background image when generatedImage changes
  useEffect(() => {
    if (generatedImage && canvasRef.current) {
      // Use the window.Image constructor to avoid conflict with Next.js Image component
      const img = new window.Image();
      img.onload = () => {
        backgroundImageRef.current = img;
        drawImageToCanvas();
      };
      img.src = generatedImage;
    }
  }, [generatedImage]);

  // Initialize canvas with white background when component mounts
  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas();
    }
  }, []);

  // Initialize canvas with white background
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Fill canvas with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Draw the background image to the canvas
  const drawImageToCanvas = () => {
    if (!canvasRef.current || !backgroundImageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Fill with white background first
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the background image
    ctx.drawImage(
      backgroundImageRef.current,
      0, 0,
      canvas.width, canvas.height
    );
  };

  // Get the correct coordinates based on canvas scaling
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate the scaling factor between the internal canvas size and displayed size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Apply the scaling to get accurate coordinates
    return {
      x: (e.nativeEvent.offsetX || (e.nativeEvent.touches?.[0]?.clientX - rect.left)) * scaleX,
      y: (e.nativeEvent.offsetY || (e.nativeEvent.touches?.[0]?.clientY - rect.top)) * scaleY
    };
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoordinates(e);
    
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setStrokeCount(prev => prev + 1);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    
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
    if (!isDrawing) return;
    setIsDrawing(false);
    
    if (strokeTimeoutRef.current) {
      clearTimeout(strokeTimeoutRef.current);
    }

    if (e.type === 'mouseup' || e.type === 'touchend') {
      if (strokeCount >= 3) {
        await handleGeneration();
        setStrokeCount(0);
      } else {
        strokeTimeoutRef.current = setTimeout(async () => {
          await handleGeneration();
          setStrokeCount(0);
        }, 500);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Fill with white instead of just clearing
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setGeneratedImage(null);
    backgroundImageRef.current = null;
  };

  const handleColorChange = (e) => {
    setPenColor(e.target.value);
  };

  const openColorPicker = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openColorPicker();
    }
  };

  const getPromptForStyle = () => {
    switch(styleMode) {
      case 'material':
        return "Recreate this doodle as a physical chrome sculpture made of a chromium metal tubes or pipes in a professional studio setting. If it is typography, render it accordingly, but always always have a black background and studio lighting. Render it in Cinema 4D with Octane, using studio lighting against a pure black background. Make it look like a high-end product rendering of a sculptural piece. Flat Black background always";
      case 'honey':
        return "Transform this sketch into a honey-like substance. Render it as if made entirely of translucent, golden honey with characteristic viscous drips and flows. Add realistic liquid properties including surface tension, reflections, and light refraction. Use studio lighting to highlight the amber tones and glossy surface against a black background. Make it appear as if captured in a high-end commercial photography setup.";
      case 'softbody':
        return "Convert this drawing into a soft body physics simulation. Render it as if made of a soft, jelly-like material that responds to gravity and motion. Add realistic deformation, bounce, and squash effects typical of soft body dynamics. Use dramatic lighting against a black background to emphasize the material's translucency and surface properties. Make it look like a high-end 3D animation frame.";
      default:
        return "Recreate this doodle as a physical chrome sculpture in a professional studio setting.";
    }
  };

  const handleGeneration = async () => {
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      console.log("Request throttled - too soon after last request");
      return;
    }
    
    setLastRequestTime(now);
    if (!canvasRef.current) return;
    
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
        prompt: getPromptForStyle(),
        drawingData,
        customApiKey
      };
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });
      
      const data = await response.json();
      
      if (data.success && data.imageData) {
        const imageUrl = `data:image/png;base64,${data.imageData}`;
        // Draw the generated image to the display canvas
        const displayCanvas = displayCanvasRef.current;
        const displayCtx = displayCanvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
          displayCtx.drawImage(img, 0, 0, displayCanvas.width, displayCanvas.height);
        };
        img.src = imageUrl;
      } else {
        console.error("Failed to generate image:", data.error);
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
    } finally {
      setIsLoading(false);
    }
  };

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
  }, [isDrawing]);

  useEffect(() => {
    return () => {
      if (strokeTimeoutRef.current) {
        clearTimeout(strokeTimeoutRef.current);
      }
    };
  }, []);

  // Add useEffect to watch for styleMode changes
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

    checkCanvasAndGenerate();
  }, [styleMode]); // Trigger when styleMode changes

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
      const { x, y } = getCoordinates(e);
      setTextPosition({ x, y });
      setIsTyping(true);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }
  };

  // Add new function to handle pen clicks
  const handlePenClick = (e) => {
    if (currentTool !== 'pen') return;
    
    const { x, y } = getCoordinates(e);
    const newPoint = { x, y };
    
    setTempPoints(prev => [...prev, newPoint]);
    
    // Draw point indicator
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // When we have 4 points, draw the bezier curve
    if (tempPoints.length === 3) {
      const points = [...tempPoints, newPoint];
      drawBezierCurve(points);
      setTempPoints([]); // Reset points for next curve
    }
  };

  // Add function to draw the actual bezier curve
  const drawBezierCurve = (points) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.bezierCurveTo(
      points[1].x, points[1].y,
      points[2].x, points[2].y,
      points[3].x, points[3].y
    );
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.stroke();
    
    // Save state after drawing curve
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
      await handleGeneration();
    }
  };

  return (
  <>
  <Head>
    <title>Gemini Co-Drawing</title>
    <meta name="description" content="Gemini Co-Drawing" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <div className="min-h-screen notebook-paper-bg text-gray-900 flex flex-col justify-start items-center">     
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-2 sm:mb-6 gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-0 leading-tight font-mega">Chrome Study</h1>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                Built with{" "}
                  <a className="underline" href="https://ai.google.dev/gemini-api/docs/image-generation" target="_blank" rel="noopener noreferrer">
                     Gemini 2.0 native image generation
                  </a>
                </p>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                by{" "}
                  <a className="underline" href="https://www.instagram.com/devethanvalladares/" target="_blank" rel="noopener noreferrer">
                    @devvalladares
                  </a>
                    {" "}and{" "}
                    <a className="underline" href="https://x.com/trudypainter" target="_blank" rel="noopener noreferrer">
                      @trudypainter
                    </a>
                </p>
              </div>
              
              <menu className="flex items-center bg-gray-300 rounded-full p-2 shadow-sm self-start sm:self-auto gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentTool('pencil')}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 ${
                    currentTool === 'pencil' ? 'bg-black text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <Pencil className="w-5 h-5" aria-label="Pencil Tool" />
                </button>
                
                <button
                  type="button"
                  onClick={() => setCurrentTool('pen')}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 ${
                    currentTool === 'pen' ? 'bg-black text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <Pen className="w-5 h-5" aria-label="Pen Tool" />
                </button>
                
                <button
                  type="button"
                  onClick={() => setCurrentTool('eraser')}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 ${
                    currentTool === 'eraser' ? 'bg-black text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <Eraser className="w-5 h-5" aria-label="Eraser" />
                </button>
                
                <button
                  type="button"
                  onClick={() => setCurrentTool('text')}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 ${
                    currentTool === 'text' ? 'bg-black text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <Type className="w-5 h-5" aria-label="Text Tool" />
                </button>
                
                <button
                  type="button"
                  onClick={handleUndo}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm transition-all hover:scale-110"
                >
                  <Undo2 className="w-5 h-5 text-gray-700" aria-label="Undo" />
                </button>
                
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm transition-all hover:scale-110"
                >
                  <Trash2 className="w-5 h-5 text-gray-700" aria-label="Clear Canvas" />
                </button>
              </menu>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <h2 className="text-lg font-bold mb-2">Draw here:</h2>
                <canvas
                  ref={canvasRef}
                  width={960}
                  height={540}
                  onMouseDown={(e) => {
                    if (currentTool === 'pen') {
                      handlePenClick(e);
                    } else {
                      startDrawing(e);
                    }
                  }}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onClick={handleCanvasClick}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className={`border-2 border-black w-full sm:h-[60vh] h-[30vh] min-h-[320px] bg-white/90 touch-none ${
                    currentTool === 'pen' ? 'cursor-crosshair' : 'hover:cursor-crosshair'
                  }`}
                />
              </div>

              <div className="relative">
                <h2 className="text-lg font-bold mb-2">Gemini's interpretation:</h2>
                <canvas
                  ref={displayCanvasRef}
                  width={960}
                  height={540}
                  className="border-2 border-black w-full sm:h-[60vh] h-[30vh] min-h-[320px] bg-white/90"
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="bg-white/80 rounded-full p-3">
                      <LoaderCircle className="w-8 h-8 animate-spin text-black" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Style:</label>
                <select 
                  value={styleMode}
                  onChange={(e) => setStyleMode(e.target.value)}
                  className="px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="material">Chrome</option>
                  <option value="honey">Honey</option>
                  <option value="softbody">Soft Body Dynamics</option>
                </select>
              </div>
            </div>

            {/* Add this new bottom toolbar after your canvas sections but before the style selector */}
            <div className="flex justify-end mb-4">
              <menu className="flex items-center bg-gray-300 rounded-full p-2 shadow-sm gap-2">
                <button
                  type="button"
                  onClick={handleSaveImage}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-700 shadow-sm transition-all hover:scale-110"
                  title="Save Image"
                >
                  <Download className="w-5 h-5" />
                </button>
                
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-700 shadow-sm transition-all hover:scale-110"
                  title="Regenerate"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </menu>
            </div>
          </div>
        </div>
      </main>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-700">Failed to generate</h3>
              <button 
                onClick={closeErrorModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            
            <form onSubmit={handleApiKeySubmit} className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                This space is pretty popular... add your own Gemini API key from  <a 
                href="https://ai.google.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                Google AI Studio
              </a>:

               
              </label>
              <input
                type="text"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="API Key..."
                className="w-full p-3 border border-gray-300 rounded mb-4 font-mono text-sm"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeErrorModal}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
                >
                  Use My API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add text input field */}
      {isTyping && (
        <input
          ref={textInputRef}
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={handleTextInput}
          className="fixed p-2 border border-gray-300 rounded shadow-sm"
          style={{
            left: textPosition.x + 'px',
            top: textPosition.y + 'px',
          }}
          autoFocus
        />
      )}
    </div>
    </>
  );
}
