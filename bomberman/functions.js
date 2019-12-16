//Preparação do canvas
	function Canvas(){
		myCanvas = document.getElementById("tabuleiro");
		context = myCanvas.getContext("2d");
	}
//Função para obter valores aleatorios
	function Random(limite){
		return (Math.floor(Math.random()*limite));
	}
//Criar jogadores conforme botao clicado na interface
	function CriarJogadores(numeroJogadores){
		p1 = null;
		p2 = null;
		p3 = null;
		p4 = null;
		if(numeroJogadores>0){
			p1 = InstanciaJogador(p1,Player1(),_jogador1);
		}
		if(numeroJogadores>1){
			p2 = InstanciaJogador(p2,Player2(),_jogador2);
		}
		if(numeroJogadores>2){
			p3 = InstanciaJogador(p3,Player3(),_jogador3);
		}
		if(numeroJogadores>3){
			p4 = InstanciaJogador(p4,Player4(),_jogador4);
		}
	}
//Criação de instancia de jogadores
	function InstanciaJogador(jogador,tipoJogador,valorJogador){
		jogador = new Player(tipoJogador);
		jogador.PosicionarJogador();
		_vitoria += valorJogador;
		return jogador;
	}
//Verifica se posição está fora do tabuleiro
	function PosicaoInvalida(posicaoX,posicaoY,x,y){
		return (posicaoX+x<0||posicaoY+y<0||posicaoX+x>=mapa.tamanho||posicaoY+y>=mapa.tamanho) ? true : false;
	}
//Colisão
	function PosicaoOcupada(posicaoX,posicaoY,x,y){
		return (mapa.matriz[posicaoX+x][posicaoY+y].status>=_blocoFixo) ? true : false;
	}
//Interface para selecao de jogadores
function PrepararJogadores(n){
	numeroJogadores=n;
	document.getElementById('2player').disabled='disabled';
	document.getElementById('3player').disabled='disabled';
	document.getElementById('4player').disabled='disabled';
	document.getElementById('start').style.display='block';
}
//Fim de jogo baseado na Flag _vitoria
	function FimJogo(){
		switch(_vitoria){
			case 1:AnunciarVitoria(1);p1.Vencer();break;
			case 2:AnunciarVitoria(2);p2.Vencer();break;
			case 4:AnunciarVitoria(3);p3.Vencer();break;
			case 8:AnunciarVitoria(4);p4.Vencer();break;
			case 0:AnunciarVitoria(0);AnimacaoEmpate();break;
			default:if(_minutos==0 && _segundos==0){AnunciarVitoria(0);AnimacaoEmpate();}break;
		}
	}
//Interface para anuncio de vencedor
	function AnunciarVitoria(vencedor){
		clearInterval(relogio);
		clearInterval(vitoria);
		var mostrador = document.getElementById('resultado');
		switch(vencedor){
			case 1:mostrador.innerHTML = 'P1 VENCEU';break;
			case 2:mostrador.innerHTML = 'P2 VENCEU';break;
			case 3:mostrador.innerHTML = 'P3 VENCEU';break;
			case 4:mostrador.innerHTML = 'P4 VENCEU';break;
			default:mostrador.innerHTML = 'EMPATE';break;
		}
	}
//Tempo de partido com encerramento de jogo
	function Timer(){
		var segundos = (_segundos <= 9) ? '0'+_segundos : _segundos ;
		document.getElementById('relogio').innerHTML = '0'+_minutos+':'+segundos;
		if(_minutos==0 && _segundos==10){
			document.getElementById('relogio').style.color = '#cc3300';
		}
		if(_segundos==0){
			if(_minutos==0){
				FimJogo();
			}else{
				_minutos--;
				_segundos = 59;
			}
		}else{
			_segundos--;
		}
	}
//Seta animação para jogadores em caso de empate
	function AnimacaoEmpate(){
		var players = new Array(p1,p2,p3,p4);
		for(var count in players){
			if(players[count]){
				players[count].imagemY=10;
				players[count].capacidadeMover = null;
			}
		}
	}
//Exclui aleatoriamente um número definido de valores de um array
	function RefinarAleatorio(vetor,limite){
		var random;
		var temp;
		for(var count=0;count<limite;count++){
			random = Random(vetor.length);
			temp = vetor[random];
			vetor[random] = vetor[0];
			vetor[0] = temp;
			vetor.shift();
		}
		return vetor;
	}
//Exclui valores de um array de acordo com um outro array de posicoes de matriz
	function RefinarCordenada(vetorAlvo,vetorLimitador){
		var temp;
		for(var countLimitador in vetorLimitador){
			for(var countAlvo in vetorAlvo){
				if(vetorLimitador[countLimitador].x == vetorAlvo[countAlvo].x && vetorLimitador[countLimitador].y == vetorAlvo[countAlvo].y){
						temp = vetorAlvo[countAlvo];
						vetorAlvo[countAlvo] = vetorAlvo[0];
						vetorAlvo[0] = temp;
						vetorAlvo.shift();
				}
			}
		}
		return vetorAlvo;
	}
//Criação de um vetor com todas as cordenadas da matriz
	function VetorCordenadas(){
		var vetorCordenada = new Array();
		for(var i=0;i<11;i++){
			for(var j=0;j<11;j++){
				vetorCordenada[i+11*j] = {x:i,y:j};
			}
		}
		return vetorCordenada;
	}
//Sorteio de item baseado na taxa de incidencia
	function SorteiaItem(){
		var item;
		var random = Random(_MaximoFogo);
		if(random < _MaisBomba){
			item = ItemMaisBomba();
		}else{
			if(random < _MaisFogo){
				item = ItemMaisFogo();
			}else{
				if(random < _MaisVelocidade){
					item = ItemMaisVelocidade();
				}else{
					if(random < _MaximoFogo){
						item = ItemMaximoFogo();
					}
				}
			}
		}
		return item;
	}