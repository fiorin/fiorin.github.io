//Blocos indestrutiveis
	function BlockSolid(){	
		this.quebravel = null;
		this.valor = _blocoFixo;
		this.imagemX = 9;
		this.imagemY = 1;
		return this;
	}
//Blocos quebraveis
	function BlockDefault(){
		this.quebravel = 1;
		this.valor = _blocoQuebravel;
		this.imagemX = 9;
		this.imagemY = 2;
		return this;
	}