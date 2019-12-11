//Controle de teclado e movimentacao
	function Movimento(e){
		var carac = String.fromCharCode(e.which);
		//Verificacao de tecla ocorre de acordo com a existencia de cada jogador
		VerificarMovimento(p1,carac);
		if(p2!=null){
			VerificarMovimento(p2,carac);
			if(p3!=null){
				VerificarMovimento(p3,carac);
				if(p4!=null){
					VerificarMovimento(p4,carac);
				}
			}
		}
		return false;
	}
//Movimento de personagem e colocação de bombas são independentes
//para que o contador de ciclo não pare a colocação da bomba
	function VerificarMovimento(jogador,caracter){
		//Movimentacao de personagem
		if(jogador.tempoMover<1 && jogador.capacidadeMover!=null){
			switch(caracter){
				//Movimento ocorre por cordenadas x,y
				case jogador.comandos.up:jogador.Mover(0,-1);break;
				case jogador.comandos.right:jogador.Mover(1,0);break;
				case jogador.comandos.down:jogador.Mover(0,1);break;
				case jogador.comandos.left:jogador.Mover(-1,0);break;
			}
		}
		//Colocação de bombas
		if(caracter == jogador.comandos.colocarBomba){
			jogador.ColocarBomba()
		}
	}
//Verificação constante de teclas que ativa a função de movimento
	document.captureEvents(Event.KEYPRESS);
	document.onkeypress = Movimento;