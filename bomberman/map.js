//Funcao principal de configuracao de mapa
	function ConfigMap(){
		mapa = new Mapa();
		//Calcula blocos fixo
		mapa.DefineFixos();
		//Instancia matriz
		mapa.PrepararMapa();
		totalPosicoes = (Math.pow(mapa.tamanho,2));
		//Habilita canvas para desenho
		canvas = new Canvas();
		//Distribui blocos fixo
		mapa.PosicionarBloco(BlockSolid(),mapa.DefineFixos());
		//Distribui blocos quebraveis
		mapa.PosicionarBloco(BlockDefault(),mapa.DefineQuebraveis());
		//Distribui itens
		mapa.DefineItens();
	}
//Instancia de mapa
	function Mapa(){
		//Vetor de direções usado para verificação de explosão
		this.direcoes = new Array({x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0});
		//Espaços reservados para os 4 jogadores. Não pode colocar blocos.
		this.reservados = new Array({x:0,y:0},{x:1,y:0},{x:0,y:1},{x:10,y:10},{x:9,y:10},{x:10,y:9},{x:9,y:0},{x:10,y:0},{x:10,y:1},{x:0,y:9},{x:0,y:10},{x:1,y:10});
		//Tamanho do mapa
		this.tamanho = 11;
		
		//Inicialização da matriz de tabuleiro. Array de array de 'space'.
		this.PrepararMapa = function() {
			this.matriz = new Array(this.tamanho);
			for(var count = 0; count < this.tamanho; count++){
					this.matriz[count] = new Array(this.tamanho);
			}
			for(var coluna=0;coluna<this.tamanho;coluna++){
				for(var linha=0;linha<this.tamanho;linha++){
					this.matriz[coluna][linha] = new Space(coluna,linha);
				}
			}
		}
		//Colocação de item em posicao de matriz
		//Parametro 'itemtipo' define o item a ser colocado
		this.PosicionarItem = function(itemTipo,posicaoItem){
			mapa.matriz[posicaoItem.x][posicaoItem.y].item = new Item(itemTipo);
			mapa.matriz[posicaoItem.x][posicaoItem.y].status += _item;
			mapa.matriz[posicaoItem.x][posicaoItem.y].item.posicaoX = posicaoItem.x;
			mapa.matriz[posicaoItem.x][posicaoItem.y].item.posicaoY = posicaoItem.y;
		}
		//Colocacao de blocos de acordo com vetor de posicoes
		//Parametro 'blocotipo' define o tipo de bloco a ser colocado
		//Parametro 'posicoesBlocos' define as posicoes a serem colocados
		this.PosicionarBloco = function(blocoTipo,posicoesBlocos){
			var x; var y;
			for(var count in posicoesBlocos){
				x = posicoesBlocos[count].x; 
				y = posicoesBlocos[count].y;
				mapa.matriz[x][y].bloco = new Block(blocoTipo);
				mapa.matriz[x][y].status += blocoTipo.valor;
				mapa.matriz[x][y].bloco.posicaoX = x;
				mapa.matriz[x][y].bloco.posicaoY = y;
			}
		}
		//Funcao de atualizao de espaco. Ciclica
		this.Atualizar = function(){
			for(var coluna=0;coluna<mapa.tamanho;coluna++){
				for(var linha=0;linha<mapa.tamanho;linha++){
					mapa.matriz[coluna][linha].AtualizarPosicao();
				}
			}
		}
		//Calcula posicao dos blocos fixos e retorna um vetor de posicoes
		this.DefineFixos = function(){
			this.blocosFixos = new Array();
			for(var coluna=1;coluna<this.tamanho;coluna+=2){
				for(var linha=1;linha<this.tamanho;linha+=2){
					this.blocosFixos.push({x:coluna,y:linha});
				}
			}
			return this.blocosFixos;
		}
		//Calcula posicao dos blocos quebraveis e retorna um vetor de posicoes
		this.DefineQuebraveis = function(){
			//Inicialização de um vetor com todas as cordenadas de matriz
			this.quebraveis = VetorCordenadas();
			//Exclusao das posicoes reservadas
			this.quebraveis = RefinarCordenada(this.quebraveis,this.reservados);
			//Exclusao das posicoes que ja possuem blocos fixos
			this.quebraveis = RefinarCordenada(this.quebraveis,this.blocosFixos);
			//Exclusao de uma quantidade de posicoes aleatorias
			this.quebraveis = RefinarAleatorio(this.quebraveis,Random(30)+10);
			//Posicoes que sobrarem definem os blocos quebraveis
			return this.quebraveis;
		}
		//Calculo de posicoes dos itens
		this.DefineItens = function(){
			this.itens = new Array();
			//Do vetor de posicoes dos blocos quebraveis é eliminada a metade das posicoes aleatoriamente
			this.itens = RefinarAleatorio(this.quebraveis,this.quebraveis.length/2);
			//Nas que sobrarem são colocados itens aleatoriamente
			for(var count in this.itens){
				this.PosicionarItem(SorteiaItem(),{x:this.itens[count].x,y:this.itens[count].y});
			}
		}
	}