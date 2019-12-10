//Aumenta em 1 o limite de bombas que o jogador coloca por vez
	function ItemMaisBomba(){
		this.imagemX = 8;
		this.imagemY = 0;
		this.Usar = function(jogador){
			jogador.bombaLimite++;
		}
		return this;
	}
//Aumenta em 1 o alcance de explosão da bomba
	function ItemMaisFogo(){
		this.imagemX = 8;
		this.imagemY = 4;
		this.Usar = function(jogador){
			if(jogador.potencia<10){
				jogador.potencia++;
			}
		}
		return this;
	}
//Diminui o numero de ciclos de espera antes da proxima movimentacao
	function ItemMaisVelocidade(){
		this.imagemX = 8;
		this.imagemY = 2;
		this.Usar = function(jogador){
			if(jogador.velocidade>1){
				jogador.velocidade--;
			}
		}
		return this;
	}
//Aumenta a capacidade de explosao da bomba para o maximo do tabuleiro
	function ItemMaximoFogo(){
		this.imagemX = 8;
		this.imagemY = 1;
		this.Usar = function(jogador){
			jogador.potencia=10;
		}
		return this;
	}