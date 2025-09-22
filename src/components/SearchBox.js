import React from 'react';

const SearchBox = ({ 
  searchInput, 
  onSearchInputChange, 
  onSearch, 
  onKeyPress, 
  isLoading 
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-4 px-2 sm:px-4">
      {/* caixa de busca */}
      <input
        type="text"
        value={searchInput}
        onChange={onSearchInputChange}
        onKeyPress={onKeyPress}
        placeholder="Pesquisar por cidade"
        className="w-full max-w-xs sm:max-w-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-600 font-trebuchet
                   border-2 border-gray-300 rounded-full 
                   shadow-lg transform transition-all duration-500 ease-in-out
                   focus:outline-none focus:border-blue-400 focus:scale-105
                   hover:shadow-xl touch-manipulation"
        style={{ boxShadow: '5px 2px 7px rgba(0, 0, 0, 0.5)' }}
      />
      
      {/* botao buscar */}
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-b from-orange-400 to-orange-700 text-white font-lexend rounded-md cursor-pointer
                   shadow-lg transform transition-all duration-300 ease-in-out
                   hover:bg-gray-500 hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                   disabled:opacity-50 disabled:cursor-not-allowed
                   touch-manipulation min-h-[44px] min-w-[44px]"
        style={{ boxShadow: '5px 2px 7px rgba(0, 0, 0, 0.5)' }}
      >
        {isLoading ? 'Carregando...' : 'Pesquisar'}
      </button>
      
      {/* rodinha de loading */}
      {isLoading && (
        <div className="flex justify-center mt-4 sm:mt-8">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;