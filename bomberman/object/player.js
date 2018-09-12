//Instancia de jogador
function Player(jogador){
	this.vida = 1;
	this.valor = jogador.valor;
	this.imagemX = jogador.imagemX;
	this.imagemY = jogador.imagemY;
	this.posicaoX = jogador.x;
	this.posicaoY = jogador.y;
	this.comandos = jogador.comandos;
	//Tipo de bomba do jogador
	this.bomba = new BombDefault();
	//Numero de bombas
	this.bombaLimite = 1;
	//Alcance das bombas
	this.potencia = 1;
	//Velocidade define o numero de ciclos a se esperar antes do proximo movimento
	this.velocidade = 3;
	//TempoMover é o contador de ciclos restantes para movimento
	this.tempoMover = 0;
	//CapacidadedeMover é utilizada para cancelar movimentação em caso de vitoria ou morte
	this.capacidadeMover = 0;
	//Timer reduz pela metade a taxa de atualização de imagens. Aspecto estetico
	this.timer = true;
	//Dispoe jogador na matriz
	this.PosicionarJogador = function(){
		mapa.matriz[this.posicaoX][this.posicaoY].jogador.push(this);
		mapa.matriz[this.posicaoX][this.posicaoY].status += this.valor;
	}
	//Só é possivel colocar bomba no caso de já não haver uma no local ou ainda ser possivel pelo limite
	this.ColocarBomba = function(){
		if(!mapa.matriz[this.posicaoX][this.posicaoY].bomba && this.bombaLimite > 0){
			this.bombaLimite--;
			mapa.matriz[this.posicaoX][this.posicaoY].bomba = new Bomb(this);
			mapa.matriz[this.posicaoX][this.posicaoY].status += _bomba;
		}
	}
	this.Desenhar = function(){
		context.drawImage(sprite,this.imagemX*30,this.imagemY*30,30,30,this.posicaoX*30,this.posicaoY*30,30,30);
	}
	//Movimentação
	this.Mover = function(x,y){
		//Impossivel movimentar no caso de posicao invalida ou ocupada
		if(!PosicaoInvalida(this.posicaoX,this.posicaoY,x,y)){
			if(!PosicaoOcupada(this.posicaoX,this.posicaoY,x,y)){
				//Inicialização de contador pra ciclos de movimento
				this.tempoMover = this.velocidade;
				var posicaoAtual = mapa.matriz[this.posicaoX][this.posicaoY];
				//Como cada espaco pode conter mais de um jogador fica necessario uma realocação de posicoes de jogadores no vetor 'jogadores' do espaco
				//para ter certeza de que o jogador que se movimentou seja o considerado fora do espaco
				//como nao ha acesso direto ao jogador, entao o que se moveu vai para a primeira posicao e é cortado
				for(var count in posicaoAtual.jogador){
					if(posicaoAtual.jogador[count] === this){
						posicaoAtual.jogador[count] = posicaoAtual.jogador[0];
						posicaoAtual.jogador[0] = this;
						posicaoAtual.jogador.shift();
					}
				}
				posicaoAtual.status -= this.valor;
				this.posicaoX += x;
				this.posicaoY += y;
				posicaoAtual = mapa.matriz[this.posicaoX][this.posicaoY];
				//O jogador que moveu é empilhado no vetor de 'jogador' do novo espaço
				posicaoAtual.jogador.push(this);
				posicaoAtual.status += this.valor;
				//No caso de haver item no espaço o efeito dele é atribuido ao jogador
				if(posicaoAtual.item){
					posicaoAtual.item.Usar(this);
					posicaoAtual.status -= _item;
					posicaoAtual.item = null;
				}
			}
		}
	}
	//Desalocar funciona como um delete de jogadores no caso de morte para nao interferir no restante da partida
	this.Desalocar = function(){
		for(var count in mapa.matriz[this.posicaoX][this.posicaoY].jogador){
			if(mapa.matriz[this.posicaoX][this.posicaoY].jogador[count] === this){
				mapa.matriz[this.posicaoX][this.posicaoY].jogador[count] = mapa.matriz[this.posicaoX][this.posicaoY].jogador[0];
				mapa.matriz[this.posicaoX][this.posicaoY].jogador[0] = this;
				mapa.matriz[this.posicaoX][this.posicaoY].jogador.shift();
			}
		}
	}
	//Morrer ativa a animacao de morte e cessa movimento
	this.Morrer = function(){
		this.imagemY = 5;
		this.capacidadeMover = null;
	}
	//Vencer ativa a animacao de vitoria e cessa movimento
	this.Vencer = function(){
		this.imagemY = 8;
		this.capacidadeMover = null;
	}
}