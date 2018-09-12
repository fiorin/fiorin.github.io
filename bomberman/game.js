// ------------------------------------
// Ra 48885 | Danilo Pereira da Silva
// Ra 48896 | Luciano Fiorin Junior
// ------------------------------------

//arquivos de configuracao
document.write('<script type="text/javascript" src="config/configValue.js"></script>');
document.write('<script type="text/javascript" src="config/configPlayer.js"></script>');
document.write('<script type="text/javascript" src="config/configBlock.js"></script>');
document.write('<script type="text/javascript" src="config/configBomb.js"></script>');
document.write('<script type="text/javascript" src="config/configItem.js"></script>');

//arquivos de elementos de jogo
document.write('<script type="text/javascript" src="object/player.js"></script>');
document.write('<script type="text/javascript" src="object/bomb.js"></script>');
document.write('<script type="text/javascript" src="object/block.js"></script>');
document.write('<script type="text/javascript" src="object/item.js"></script>');
document.write('<script type="text/javascript" src="object/fire.js"></script>');

//arquivos de funcionalidades
document.write('<script type="text/javascript" src="map.js"></script>');
document.write('<script type="text/javascript" src="space.js"></script>');
document.write('<script type="text/javascript" src="move.js"></script>');
document.write('<script type="text/javascript" src="functions.js"></script>');

function Game(){
	//Sprite de elementos de jogo
	sprite = new Image();
	sprite.src = 'resource/sprite.png';
	sprite.onload = function(){
		//Configuração de tabuleiro
		ConfigMap();
		//Instancia de jogadores baseado na seleção em tela
		CriarJogadores(numeroJogadores);
		//Ciclo de atualização de mapa
		loop = setInterval(mapa.Atualizar,100);
		//Relogio de partida
		relogio = setInterval(Timer,1000);
		//Verificacao de vitoria
		vitoria = setInterval(FimJogo,200);
	}
}