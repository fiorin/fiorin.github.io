//Instancia de item
//Parametro 'item' define qual o efeito do item sobre o jogador
function Item(item){
	this.imagemX = item.imagemX;
	this.imagemY = item.imagemY;
	this.posicaoX = 0;
	this.posicaoY = 0;
	this.Desenhar = function(){
		context.drawImage(sprite,this.imagemX*30,this.imagemY*30,30,30,this.posicaoX*30,this.posicaoY*30,30,30);
	}
	this.Usar = item.Usar;
}