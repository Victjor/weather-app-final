import React from 'react';

const WeatherCard = ({ weatherData, darkMode, isAnimating }) => {
  if (!weatherData) return null;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center
                   ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
                   rounded-lg mx-auto mt-4 sm:mt-6 md:mt-4 p-4 sm:p-6 
                   shadow-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl transform transition-all duration-700 ease-in-out
                   ${isAnimating ? 
                     'opacity-0 translate-y-8 scale-95' : 
                     'opacity-100 translate-y-0 scale-100'}`}
         style={{ 
           boxShadow: '5px 2px 7px rgba(0, 0, 0, 0.5)',
           textShadow: '5px 2px 7px rgba(0, 0, 0, 0.2)'
         }}>
      
      {weatherData.error ? (
        // mostra erro
        <div className="text-center transform transition-all duration-500 ease-in-out">
          <h2 className={`text-xl font-lexend mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            {weatherData.title}
          </h2>
          <p className={`font-trebuchet ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {weatherData.message}
          </p>
        </div>
      ) : (
        // dados do tempo
        <>
          {/* icone do clima */}
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
            alt={weatherData.iconAlt}
            className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-blue-200'} mb-3 sm:mb-4 md:mb-0 sm:mr-4 md:mr-6
                       flex-shrink-0 transform transition-all duration-700 ease-in-out
                       ${isAnimating ? 
                         'opacity-0 translate-x-8 scale-90' : 
                         'opacity-100 translate-x-0 scale-100 hover:scale-110'}`}
          />
          
          {/* info do clima */}
          <div className={`text-center sm:text-left transform transition-all duration-700 ease-in-out
                         ${isAnimating ? 
                           'opacity-0 translate-x-8 translate-y-4' : 
                           'opacity-100 translate-x-0 translate-y-0'}`}>
            <h2 className={`text-lg sm:text-xl font-lexend mb-2 
                          transform transition-all duration-300 hover:scale-105 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {weatherData.name}
            </h2>
            
            <div className="mb-3">
              <p className={`font-lexend ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>Temperatura:</strong>
              </p>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-lexend -mt-1 sm:-mt-1 -mb-1 sm:-mb-2
                           transform transition-all duration-500 ease-in-out
                           hover:scale-110 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
                  style={{ textShadow: '5px 2px 7px rgba(0, 0, 0, 0.2)' }}>
                {weatherData.temperature}°C
              </h1>
            </div>
            
            <p className={`font-lexend capitalize
                        transform transition-all duration-300 ${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'}`}>
              <strong>Condição Atual:</strong> {weatherData.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;