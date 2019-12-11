//Instancia de Bomba
//Parametro 'jogador' define o dono da bomba
	function Bomb(jogador){
		this.timer = _bombaTimer;
		this.valor = _bomba;
		this.jogador = jogador;
		this.imagemX = jogador.bomba.imagemX;
		this.imagemY = jogador.bomba.imagemY;
		this.potencia = jogador.potencia;
		this.posicaoX = jogador.posicaoX;
		this.posicaoY = jogador.posicaoY;
		this.Desenhar = function(){
			context.drawImage(sprite,this.imagemX*30,this.imagemY*30,30,30,this.posicaoX*30,this.posicaoY*30,30,30);
		}
		//Explodir fera uma instancia de explosao e desaloca a bomba do espaco
		this.Explodir = function(){
			this.jogador.bombaLimite++;
			mapa.matriz[this.posicaoX][this.posicaoY].explosao = new Explosao(this.posicaoX,this.posicaoY,this.potencia);
			mapa.matriz[this.posicaoX][this.posicaoY].bomba = null;
			mapa.matriz[this.posicaoX][this.posicaoY].explosao.Explodir();
		}
	}
//Estouro de bomba gera uma instancia de 'explosão'
//Explosão é responsavel pela verificação de acertos e contabilização de danos
function Explosao(posicaoX,posicaoY,potencia){
	this.posicaoX = posicaoX;
	this.posicaoY = posicaoY;
	this.potencia = potencia;
	this.Explodir = function(){
		var x;
		var y;
		//Verificação de existencia de jogador no local da bomba
		//Somente para efeito estetico de fogo no caso de nao existir
		if(mapa.matriz[this.posicaoX][this.posicaoY].jogador.length==0){
			mapa.matriz[this.posicaoX][this.posicaoY].Incendiar();
		}
		//Todos os jogadores no local da bomba perdem vida, mesmo que nao exista nenhum
		for(var m in mapa.matriz[this.posicaoX][this.posicaoY].jogador){
			mapa.matriz[this.posicaoX][this.posicaoY].jogador[m].vida--;	
		}
		//Verificao de acertos acontece cada direção de cada vez baseado num vetor de cordenadas
		for(var count in mapa.direcoes){
			//A verificação ocorre de 1 até o limite de potencia e cessa na direção caso de posicao invalida
			for(var raio=1;raio<=this.potencia;raio++){
			//Tratamento para funcionamento radial
			x = mapa.direcoes[count].x; 
			y = mapa.direcoes[count].y; 
			x = x*raio;
			y = y*raio;
				//No caso de posição invalida já cessa as verificações na direção corrente
				if(!PosicaoInvalida(this.posicaoX,this.posicaoY,x,y)){
					x += this.posicaoX;
					y += this.posicaoY;
					posicao = mapa.matriz[x][y];
					//Efeito visual no caso de campo vazio
					if(posicao.status==0){
						posicao.Incendiar();	
					}else{
						//Campo com bloco é quebrado e cessa verificação na direção
						if(posicao.bloco){
							posicao.bloco.Quebrar();
							break;
						}else{
							//Campo com item o item é eliminado e o campo recebe efeito de fogo
							if(posicao.item){
								posicao.status-=_item;
								posicao.item=null;
								posicao.Incendiar();	
							}
							//No caso de acertar bomba, zera o contador da bomba acertada para que ela exploda no próximo ciclo
							if(posicao.bomba){
								posicao.bomba.timer = 0;
							}
							//Caso acerte jogador é reduzida a vida
							for(var m in posicao.jogador){
								posicao.Incendiar();	
								posicao.jogador[m].vida--;
							}
						}
					}
				}
			}
		}
	}
}