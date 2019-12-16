//Instancia de espaco
//Cada um dos espacos do tabuleiro de jogo
	function Space(coluna,linha){
		this.status = 0;
		this.posicaoX = coluna;
		this.posicaoY = linha;
		this.bloco = null;
		this.bomba = null;
		this.item = null;
		//Array de jogadores pra permitir mais de um jogador por espaço
		this.jogador = new Array();
		this.explosao = null;
		this.fogo = null;
		//Atualizacao de posicao a cada ciclo
		this.AtualizarPosicao = function(){
			//Limpeza de posicao com redesenho de chao
			context.drawImage(sprite,9*30,0*30,30,30,this.posicaoX*30,this.posicaoY*30,30,30);
			//No caso de existencia de uma instancia de fogo no espaco somente seguir com animacao e desalocar fogo ao final
			if(this.fogo!=null){
				this.fogo.Desenhar();
				switch(this.fogo.imagemY){
					case 1:this.fogo.imagemY = 2;break;
					case 2:this.fogo.imagemY = 3;break;
					case 3:this.fogo = null;break;
					default:break;
				}
			//No caso de não haver fogo...
			}else{
				//Se houver instancia de item somente desenha-lo
				if(this.item!=null){
					this.item.Desenhar();
				}
				//No caso de instancia de bloco, verificar a situação do bloco
				if(this.bloco){
					this.bloco.Desenhar();
					//Caso a quebra tenha sido ativada prosseguir com a animacao e desalocar o bloco do espaco
					switch(this.bloco.imagemY){
						case 5:this.bloco.imagemY = 4;break;
						case 4:this.bloco.imagemY = 3;break;
						case 3:this.status -= this.bloco.valor;this.bloco = null;break;
						default:break;
					}
				}else{
					//Caso exista ao menos um jogador no espaco...
					if(this.jogador.length>0){
						for(var n in this.jogador){
							//No caso de ser acertado por mais de uma bomba a vida torna negativa. Flag impossivel de ser alcançada pra permitir animação.
							if(this.jogador[n].vida<=0&&this.jogador[n].vida>(-999)){
								this.jogador[n].Morrer();
								//Flag impossivel de ser alcançada por quantidade de bombas acertando simultaneamente.
								this.jogador[n].vida = -999;
							}
							//Timer para reduzir velocidade de animação true. Estetica.
							if(this.jogador[n].timer){
							//ImagemY define a imagem do jogador e também sua situação atual
							switch(this.jogador[n].imagemY){
								//Imagens de movimentação normal
								case 1:	this.jogador[n].imagemY = 2;break;
								case 2:	this.jogador[n].imagemY = 3;break;
								case 3:	this.jogador[n].imagemY = 4;break;
								case 4:	this.jogador[n].imagemY = 1;break;
								//Ativada situação de morte, então animação prossegue e é ativada desalocação de jogador
								case 5:	this.jogador[n].imagemY = 6;break;
								case 6:	this.jogador[n].imagemY = 7;break;
								case 7:	this.status-=this.jogador[n].valor;
										//Flag para controlar quantos jogadores ainda estão em jogo decrementada baseada no valor do jogador
										_vitoria-=this.jogador[n].valor;
										this.jogador[n].Desalocar();
										break;
								//Animação de vitoria do jogador
								case 8: this.jogador[n].imagemY = 9;break;
								case 9: this.jogador[n].imagemY = 8;break;
								default:break;
							}
							//Timer para reduzir velocidade de animação false. Estetica
							this.jogador[n].timer=false;
							}else{
								this.jogador[n].timer=true;
							}
							//Reducao de ciclos restantes para nova movimentacao
							this.jogador[n].tempoMover--;
							this.jogador[n].Desenhar();
						}
					}
					//No caso de bomba...
					if(this.bomba){
						switch(this.bomba.imagemY){
							//Animação comum de bomba
							case 0:this.bomba.imagemY = 1;break;
							case 1:this.bomba.imagemY = 2;break;
							case 2:this.bomba.imagemY = 3;break;
							case 3:this.bomba.imagemY = 0;break;
						}
						//Caso o timer de bomba tenha expirado ativar explosao
						if(this.bomba.timer<=0){
							this.status -= _bomba;
							this.bomba.Explodir();
						}
						//Reduzir timer de bomba a cada ciclo. Não afeta caso a bomba já tenha explodido.
						this.bomba.timer--;
						this.bomba.Desenhar();
					}
				}
			}
		}
		//Funcao estetica para ativar animacao de fogo
		this.Incendiar = function(){
			this.fogo = new Fire(this.posicaoX,this.posicaoY);
		}
	}