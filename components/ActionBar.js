import { Download, RefreshCw } from 'lucide-react';

const ActionBar = ({ handleSaveImage, handleRegenerate }) => {
  return (
    <div className="flex justify-end mb-4">
      <menu className="flex items-center bg-gray-200 rounded-full p-2 shadow-soft gap-2">
        <button
          type="button"
          onClick={handleSaveImage}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-600 shadow-soft transition-all hover:scale-110 hover:bg-gray-50"
          aria-label="Save Image"
        >
          <Download className="w-5 h-5" />
        </button>
        
        <button
          type="button"
          onClick={handleRegenerate}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-600 shadow-soft transition-all hover:scale-110 hover:bg-gray-50"
          aria-label="Regenerate"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </menu>
    </div>
  );
};

export default ActionBar; 