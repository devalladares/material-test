import { LoaderCircle, ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import ActionBar from './ActionBar';

const DisplayCanvas = ({ 
  displayCanvasRef, 
  isLoading,
  handleSaveImage,
  handleRegenerate,
  hasGeneratedContent = false
}) => {
  // Use a local state that combines props with local state
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  // Update placeholder visibility when loading or content prop changes
  useEffect(() => {
    if (hasGeneratedContent) {
      setShowPlaceholder(false);
    } else if (isLoading) {
      setShowPlaceholder(true);
    }
  }, [isLoading, hasGeneratedContent]);

  return (
    <div className="relative">
      {/* ActionBar component - positioned in the top right */}
      <div className="absolute top-4 right-4 z-10">
        <ActionBar
          handleSaveImage={handleSaveImage}
          handleRegenerate={handleRegenerate}
        />
      </div>

      <canvas
        ref={displayCanvasRef}
        width={960}
        height={540}
        className="border border-gray-300 w-full sm:h-[60vh] h-[30vh] min-h-[320px] bg-white rounded-xl shadow-soft"
        aria-label="Generated image canvas"
      />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-xl">
          <div className="bg-white/90 rounded-full p-3 shadow-medium">
            <LoaderCircle className="w-8 h-8 animate-spin text-gray-700" />
          </div>
        </div>
      )}
      
      {/* Placeholder overlay - only show when not loading and no content has been generated */}
      {showPlaceholder && !isLoading && !hasGeneratedContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <ImageIcon className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-gray-500 text-xl font-medium">Generation will appear here</p>
        </div>
      )}
    </div>
  );
};

export default DisplayCanvas; 