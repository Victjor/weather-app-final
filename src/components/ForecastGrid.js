import React, { useState, useRef } from 'react';

const ForecastGrid = ({ forecastData, darkMode, isAnimating }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  if (!forecastData || forecastData.length === 0) return null;

  const scrollToIndex = (index) => {
    const container = scrollContainerRef.current;
    if (container) {
      const itemWidth = container.children[0]?.offsetWidth + 16;
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const itemWidth = container.children[0]?.offsetWidth + 16;
      const newIndex = Math.round(container.scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className={`mt-8 transform transition-all duration-700 ease-in-out
                   ${isAnimating ? 
                     'opacity-0 translate-y-8' : 
                     'opacity-100 translate-y-0'}`}>
      
      <h3 className="text-2xl text-white font-lexend font-semibold text-center mb-6"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
        Próximos 5 Dias
      </h3>
      
      {/* grade pra tela grande */}
      <div className="hidden sm:grid sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
        {forecastData.map((day, index) => (
          <div key={index}
               className={`${darkMode ? 'bg-gray-800/90 hover:bg-gray-700/95' : 'bg-white/90 hover:bg-white'} 
                         backdrop-blur-sm rounded-lg p-4 
                         shadow-lg transform transition-all duration-500 ease-in-out
                         hover:scale-105
                         ${isAnimating ? 
                           'opacity-0 translate-y-4' : 
                           'opacity-100 translate-y-0'}`}
               style={{ 
                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                 transitionDelay: `${index * 100}ms`
               }}>
            
            <div className="text-center mb-3">
              <p className={`font-lexend font-semibold capitalize ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {day.dayName}
              </p>
              <p className={`text-xs font-lexend ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {day.date.toLocaleDateString('pt-BR', {
                  day: '2-digit', 
                  month: '2-digit' 
                })}
              </p>
            </div>
            
            <div className="flex justify-center mb-3">
              <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-blue-200'} flex items-center justify-center`}>
                <img 
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="w-12 h-12 transform transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
            
            <div className="text-center mb-3">
              <p className={`text-2xl font-lexend font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {day.temperature}°C
              </p>
            </div>
            
            <div className="text-center">
              <p className={`text-xs font-trebuchet capitalize leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {day.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* carrossel pro celular */}
      <div className="sm:hidden px-4">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}>
          {forecastData.map((day, index) => (
            <div key={index}
                 className={`flex-shrink-0 w-64 snap-center ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} 
                           backdrop-blur-sm rounded-lg p-4 shadow-lg transform transition-all duration-500 ease-in-out
                           ${isAnimating ? 
                             'opacity-0 translate-y-4' : 
                             'opacity-100 translate-y-0'}`}
                 style={{ 
                   boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                   transitionDelay: `${index * 100}ms`
                 }}>
              
              <div className="text-center mb-3">
                <p className={`text-lg font-lexend font-semibold capitalize ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {day.dayName}
                </p>
                <p className={`text-sm font-trebuchet ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {day.date.toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: '2-digit' 
                  })}
                </p>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className={`w-20 h-20 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-blue-200'} flex items-center justify-center`}>
                  <img 
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                    className="w-16 h-16 transform transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="text-center mb-3">
                <p className={`text-3xl font-lexend font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  {day.temperature}°C
                </p>
              </div>
              
              <div className="text-center">
                <p className={`text-sm font-trebuchet capitalize leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {day.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* pontinhos de navegacao */}
        <div className="flex justify-center mt-4 space-x-2">
          {forecastData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir para o dia ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastGrid;