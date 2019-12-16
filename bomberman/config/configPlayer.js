//Informações de jogador
	function Player1(){
		this.valor = _jogador1;
		this.numero = 1;
		this.nome = 'Player1';
		this.imagemX = 0;
		this.imagemY = 1;
		this.x = 0;
		this.y = 0;
		this.comandos = new ComandosPlayer1();
		return this;
	}
	function Player2(){
		this.valor = _jogador2;
		this.numero = 2;
		this.nome = 'Player2';
		this.imagemX = 1;
		this.imagemY = 1;
		this.x = mapa.tamanho-1;
		this.y = mapa.tamanho-1;
		this.comandos = new ComandosPlayer2();
		return this;
	}
	function Player3(){
		this.valor = _jogador3;
		this.numero = 3;
		this.nome = 'Player3';
		this.imagemX = 2;
		this.imagemY = 1;
		this.x = mapa.tamanho-1;
		this.y = 0;
		this.comandos = new ComandosPlayer3();
		return this;
	}
	function Player4(){
		this.valor = _jogador4;
		this.numero = 4;
		this.nome = 'Player4';
		this.imagemX = 3;
		this.imagemY = 1;
		this.x = 0;
		this.y = mapa.tamanho-1;
		this.comandos = new ComandosPlayer4();
		return this;
	}
//Comandos dos jogadores
	function ComandosPlayer1(){
		this.up = 'w';
		this.left = 'a';
		this.right = 'd';
		this.down = 's';
		this.colocarBomba = 'e';
		return this;
	}
	function ComandosPlayer2(){
		this.up = 'i';
		this.right = 'l';
		this.down = 'k';
		this.left = 'j';
		this.colocarBomba = 'o';
		return this;
	}
	function ComandosPlayer3(){
		this.up = '8';
		this.right = '6';
		this.down = '5';
		this.left = '4';
		this.colocarBomba = '9';
		return this;
	}
	function ComandosPlayer4(){
		this.up = 't';
		this.right = 'h';
		this.down = 'g';
		this.left = 'f';
		this.colocarBomba = 'y';
		return this;
	}