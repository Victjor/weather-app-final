import React from 'react';

const Header = ({ darkMode, onToggleDarkMode }) => {
  return (
    <>
      {/* botao tema escuro/claro */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <button
          onClick={onToggleDarkMode}
          className={`w-12 h-6 sm:w-14 sm:h-8 rounded-full transition-all duration-300 ease-in-out
                     ${darkMode ? 'bg-blue-600' : 'bg-yellow-400'} 
                     shadow-lg hover:shadow-xl transform hover:scale-105`}
          style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' }}
        >
          <div className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white shadow-md transform transition-all duration-300 ease-in-out
                          ${darkMode ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'} 
                          flex items-center justify-center`}>
            <span className="text-xs">
              {darkMode ? '🌙' : '☀️'}
            </span>
          </div>
        </button>
      </div>

      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl   text-center text-white font-lexend font-bold
                     mx-4 sm:mx-6 my-6 sm:my-8 md:my-7 px-2
                     transform transition-all duration-1000 ease-in-out
                     hover:scale-105"
          style={{ textShadow: '3px 2px 6px black' }}>
        Weather Check
      </h1>
    </>
  );
};

export default Header;