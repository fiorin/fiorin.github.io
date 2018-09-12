//Instancia de animação de fogo
function Fire(posicaoX,posicaoY){
	this.posicaoX = posicaoX;
	this.posicaoY = posicaoY;
	this.imagemX = 6;
	this.imagemY = 1;
	this.Desenhar = function(){
		context.drawImage(sprite,this.imagemX*30,this.imagemY*30,30,30,this.posicaoX*30,this.posicaoY*30,30,30);
	}
	return this;
}