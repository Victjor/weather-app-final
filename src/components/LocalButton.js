import React, { useState } from 'react';

function BotaoLocalizacao({ onBuscarCidade, API_KEY }) {
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscarLocalizacao = () => {
    if (!navigator.geolocation) {
      setMensagem('Geolocalização não é suportada neste navegador.');
      return;
    }

    setCarregando(true);
    setMensagem('Obtendo sua localização...');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMensagem('Buscando cidade...');
        
        try {
          // api que transforma lat/lon em nome da cidade
          const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
          const resposta = await fetch(url);
          
          if (!resposta.ok) {
            setMensagem('Erro ao buscar informações da cidade.');
            setCarregando(false);
            return;
          }
          
          const dados = await resposta.json();
          
          if (dados.length > 0) {
            const cidade = dados[0].name;
            setMensagem(`Cidade detectada: ${cidade}`);
            
            // delete a mensagem
            setTimeout(() => {
              setMensagem('');
            }, 2000);
            
            // chama funcao pra buscar o tempo
            if (onBuscarCidade) {
              onBuscarCidade(cidade);
            }
          } else {
            setMensagem('Não foi possível identificar sua cidade.');
          }
        } catch (erro) {
          console.error('Erro ao buscar cidade:', erro);
          setMensagem('Erro ao buscar informações da cidade.');
        }
        
        setCarregando(false);
      },
      (erro) => {
        console.error('Erro de geolocalização:', erro);
        let mensagemErro = 'Não foi possível obter sua localização.';
        
        switch(erro.code) {
          case 1: 
            mensagemErro = 'Permissão de localização negada.';
            break;
          case 2: 
            mensagemErro = 'Informação de localização indisponível no momento.';
            break;
          case 3: 
            mensagemErro = 'Tempo limite para obter localização excedido.';
            break;
          default:
            mensagemErro = 'Erro desconhecido de geolocalização.';
            break;
        }
        
        setMensagem(mensagemErro);
        setCarregando(false);
      }
    );
  };

  return (
    <div className="flex flex-col items-center mb-1">
      <button
        className="px-6 mt-2 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-b from-violet-400 to-violet-700 text-white font-lexend rounded-md cursor-pointer
                   shadow-lg transform transition-all duration-300 ease-in-out
                   hover:bg-gray-500 hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                   disabled:opacity-50 disabled:cursor-not-allowed
                   touch-manipulation min-h-[44px] min-w-[44px]"
                   style={{ boxShadow: '5px 2px 7px rgba(0, 0, 0, 0.5)' }}
        onClick={buscarLocalizacao}
        disabled={carregando}
      >
        {carregando ? 'Localizando...' : 'Usar Localização'}
      </button>
      
      {mensagem && (
        <p className="mt-2 text-sm text-center text-gray-200 dark:text-gray-300 max-w-xs">
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default BotaoLocalizacao;