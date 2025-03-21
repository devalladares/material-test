import { RefreshCw } from 'lucide-react';

// Define style options with display names and prompts
export const styleOptions = {
  material: {
    name: "Chrome",
    file: "chrome.png",
    prompt: "Recreate this doodle as a physical chrome sculpture made of a chromium metal tubes or pipes in a professional studio setting. If it is typography, render it accordingly, but always always have a black background and studio lighting. Render it in Cinema 4D with Octane, using studio lighting against a pure black background. Make it look like a high-end product rendering of a sculptural piece. Flat Black background always"
  },
  honey: {
    name: "Honey",
    file: "honey.png",
    prompt: "Transform this sketch into a honey-like substance. Render it as if made entirely of translucent, golden honey with characteristic viscous drips and flows. Add realistic liquid properties including surface tension, reflections, and light refraction. Use studio lighting to highlight the amber tones and glossy surface against a black background. Make it appear as if captured in a high-end commercial photography setup."
  },
  softbody: {
    name: "Soft Body",
    file: "softbody.png",
    prompt: "Convert this drawing / text into a soft body physics render. Render it as if made of a soft, jelly-like material that responds to gravity and motion. Add realistic deformation, bounce, and squash effects typical of soft body dynamics. Use dramatic lighting against a black background to emphasize the material's translucency and surface properties. Make it look like a high-end 3D animation frame."
  }
};

// Function to get prompt based on style mode
export const getPromptForStyle = (styleMode) => {
  return styleOptions[styleMode]?.prompt || styleOptions.material.prompt;
};

const StyleSelector = ({ styleMode, setStyleMode, handleGenerate }) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-4 p-4 -translate-x-4">
        <div className="flex space-x-4 min-w-max">
          {Object.entries(styleOptions).map(([key, { name, file }]) => (
            <button
              key={key}
              onClick={() => setStyleMode(key)}
              type="button"
              aria-label={`Select ${name} style`}
              aria-pressed={styleMode === key}
              className="focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <div className={`w-36 border border-gray-300 overflow-hidden rounded-xl transition-all hover:scale-105 hover:cursor-pointer duration-200 ${
                styleMode === key 
                  ? 'scale-105 ring-2 ring-gray-400 shadow-medium' 
                  : 'opacity-80 hover:opacity-100'
              }`}>
                {/* 4:3 aspect ratio container with image */}
                <div className="relative pb-[75%]">
                  <img 
                    src={`/samples/${file}`}
                    alt={`${name} style example`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className={`px-2 py-1.5 text-center text-sm font-medium ${
                  styleMode === key ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                  {name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleSelector; 