const Header = () => {
  return (
    <header className="w-full flex items-center justify-between">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-2xl font-medium text-gray-800">Material Exploration</h1>
        
        <p>
          By <a href="https://www.instagram.com/devethanvalladares/?hl=en/" className="text-gray-600 underline hover:text-gray-800">Dev Valladres</a> 
          {" "}and <a href="https://x.com/trudypainter" className="text-gray-600 underline hover:text-gray-800">Trudy Painter</a>
        </p>
      </div>
      <div className="text-sm text-gray-500">
      <span className="text-sm text-gray-600 bg-gray-200 px-4 py-2 rounded-full">Using Gemini 2.0 Native Image Generation</span>
      </div>
    </header>
  );
};

export default Header; 