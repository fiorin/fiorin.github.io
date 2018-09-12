//Instancia de bloco
//Parametro 'bloco' define se é fixo ou quebravel
	function Block(bloco){
		this.valor = bloco.valor;
		this.quebravel = bloco.quebravel;
		this.posicaoX = null;
		this.posicaoY = null;
		this.imagemX = bloco.imagemX;
		this.imagemY = bloco.imagemY;
		this.Desenhar = function(){
			context.drawImage(sprite,this.imagemX*30,this.imagemY*30,30,30,this.posicaoX*30,this.posicaoY*30,30,30);
		}
		//Quebrar ativa animacao de quebra de bloco
		this.Quebrar = function(){
			if(this.quebravel){
				this.imagemY = 5;
			}
		}
	}