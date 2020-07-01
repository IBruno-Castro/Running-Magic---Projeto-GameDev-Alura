class Jogo {
  constructor() {
    this.indice = 0;
    
    this.mapa = fita.mapa
  }

  setup() {
    cenario = new Cenario(imagemCenario, 3);
    pontuacao = new Pontuacao();
    vida = new Vida(fita.configuracao.vidaMaxima, fita.configuracao.vidaInicial);

    personagem = new Personagem(matrizPersonagem, imagemPersonagem, 5, 30, 110, 135, 220, 270);
    const inimigo = new Inimigo(matrizInimigo, imagemInimigo, width - 52, 30, 52, 52, 104, 104, 12);
    const inimigoGrande = new Inimigo(matrizInimigoGrande, imagemInimigoGrande, width, 0, 200, 200, 400, 400, 10);
    const inimigoVoador = new Inimigo(matrizInimigoVoador, imagemInimigoVoador, width, 130, 100, 75, 200, 150, 14);

    inimigos.push(inimigo)
    inimigos.push(inimigoGrande)
    inimigos.push(inimigoVoador)
  }

  keyPressed(key) {
    if (key === 'ArrowUp') {
      personagem.pula()
      somDoPulo.play()
    }
  }

  draw() {
    cenario.exibe();
    cenario.move();
    
    vida.draw()

    pontuacao.exibe();
    pontuacao.adicionaPontos()

    personagem.exibe();
    personagem.aplicaGravidade();

    const linhaAtual = this.mapa[this.indice];
    const inimigo = inimigos[linhaAtual.inimigo];
    const inimigoVisivel = inimigo.x < -inimigo.largura;

    if (inimigoVisivel) {
      this.indice++
      inimigo.aparece()
      if (this.indice > this.mapa.length - 1) {
        this.indice = 0;
      }
      inimigo.velocidade = linhaAtual.velocidade
    }
    
    inimigo.exibe();
    inimigo.move();

    if (personagem.estaColidindo(inimigo)) {
      console.log('colidiu')
      vida.perdeVida()
      personagem.ficaInvencivel()
      if(vida.vidas === 0){
        image(imagemGameOver, width / 2 - 200, height / 2 - 100)
        noLoop()
      }
    }
  }
}