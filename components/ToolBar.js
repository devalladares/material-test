import { Pencil, Eraser, Type, Undo, Trash2, PenLine } from 'lucide-react';

const ToolBar = ({ currentTool, setCurrentTool, handleUndo, clearCanvas }) => {
  const tools = [
    {
      id: "pencil",
      label: "Pencil",
      icon: <Pencil className="w-4 h-4" />,
    },
    // {
    //   id: "pen",
    //   label: "Pen",
    //   icon: <PenLine className="w-4 h-4" />,
    // },
    {
      id: "eraser",
      label: "Eraser",
      icon: <Eraser className="w-4 h-4" />,
    },
    // {
    //   id: "text",
    //   label: "Text",
    //   icon: <Type className="w-4 h-4" />,
    // },
  ];

  return (
    <div className="flex justify-end mb-4">
      <menu className="flex items-center bg-gray-200 rounded-full p-2 shadow-soft gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            onClick={() => setCurrentTool(tool.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentTool === tool.id
                ? "bg-gray-700 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            } shadow-soft transition-all hover:scale-110`}
            aria-label={tool.label}
            aria-pressed={currentTool === tool.id}
          >
            {tool.icon}
          </button>
        ))}

        {/* <div className="w-[1px] h-6 bg-gray-300 mx-1" /> */}

        <button
          type="button"
          onClick={handleUndo}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-600 shadow-soft transition-all hover:scale-110 hover:bg-gray-50"
          aria-label="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={clearCanvas}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-600 shadow-soft transition-all hover:scale-110 hover:bg-gray-50"
          aria-label="Clear Canvas"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </menu>
    </div>
  );
};

export default ToolBar; 