function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function criaArbustosEsquerda(largura, altura, popsicaoNaTela) {
    this.elemento = novoElemento('img', 'arbustos')
    this.elemento.src = '/personagens/arvore-removebg-preview.png'

    this.sortearPosicao = () => {
        let posicaoYAleatoria = Math.floor(Math.random() * altura)
        let margemY = (altura - this.getAltura()) / 2 // Margem vertical para centralizar
        this.setX(370)
        this.setY(posicaoYAleatoria + margemY)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = (posicaoNaTela) => this.elemento.style.left = `${posicaoNaTela}px`
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = (posicaoNaTela) => this.elemento.style.bottom = `${posicaoNaTela}px`
    this.getAltura = () => this.elemento.clientHeight

    this.sortearPosicao()
    this.setY(popsicaoNaTela)
}

function ArbustosEsquerda (largura, altura, espaco){
    this.arbustos = [
        new criaArbustosEsquerda(largura, altura, altura),
        new criaArbustosEsquerda(largura, altura, altura),
        new criaArbustosEsquerda(largura, altura, altura)
    ]

    const deslocamento = 3
    this.animar = () => {
        this.arbustos.forEach(arbusto =>{
            arbusto.setY(arbusto.getY() - deslocamento)

            if(arbusto.getY() < -arbusto.getAltura()){
                arbusto.setY(arbusto.getY() + espaco * this.arbustos.length)
                arbusto.sortearPosicao()
            }
        })
    }
}

function criaArbustosDireita(largura, altura, popsicaoNaTela) {
    this.elemento = novoElemento('img', 'arbustos')
    this.elemento.src = '/personagens/arvore-removebg-preview.png'

    this.sortearPosicao = () => {
        let posicaoYAleatoria = Math.floor(Math.random() * altura)
        let margemY = (altura - this.getAltura()) / 2 // Margem vertical para centralizar
        this.setX(860)
        this.setY(posicaoYAleatoria + margemY)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = (posicaoNaTela) => this.elemento.style.left = `${posicaoNaTela}px`
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = (posicaoNaTela) => this.elemento.style.bottom = `${posicaoNaTela}px`
    this.getAltura = () => this.elemento.clientHeight

    this.sortearPosicao()
    this.setY(popsicaoNaTela)
}

function ArbustosDireita (largura, altura, espaco){
    this.arbustos = [
        new criaArbustosDireita(largura, altura, altura),
        new criaArbustosDireita(largura, altura, altura),
        new criaArbustosDireita(largura, altura, altura)
    ]

    const deslocamento = 3
    this.animar = () => {
        this.arbustos.forEach(arbusto =>{
            arbusto.setY(arbusto.getY() - deslocamento)

            if(arbusto.getY() < -arbusto.getAltura()){
                arbusto.setY(arbusto.getY() + espaco * this.arbustos.length)
                arbusto.sortearPosicao()
            }
        })
    }
}

function criaPista() {
    this.elemento = novoElemento('img', 'pista')
    this.elemento.src = '/personagens/pista.png'
}

function NovoCarro(largura, altura, popsicaoNaTela) {
    this.elemento = novoElemento('img', 'par-de-barreiras')
    this.elemento.src = '/personagens/luigi.png'

    this.sortearPosicao = () => {
        let posicaoXAleatoria = Math.floor(Math.random() * 350)
        let posicaoYAleatoria = Math.floor(Math.random() * altura)
        let margemX = ((largura / 2) - 190) // Margem horizontal para centralizar
        let margemY = (altura - this.getAltura()) / 2 // Margem vertical para centralizar
        this.setX(posicaoXAleatoria + margemX)
        this.setY(posicaoYAleatoria + margemY)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = (posicaoNaTela) => this.elemento.style.left = `${posicaoNaTela}px`
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = (posicaoNaTela) => this.elemento.style.bottom = `${posicaoNaTela}px`
    this.getAltura = () => this.elemento.clientHeight

    this.sortearPosicao()
    this.setY(popsicaoNaTela)
} 

function Corredores(largura, altura, espaco) {
    this.jogadores = [
        new NovoCarro(largura, altura, altura),
        new NovoCarro(largura, altura, altura),
        new NovoCarro(largura, altura, altura)
    ];

    const deslocamento = 2;
    this.animar = () => {
        let carrosInimigosSairam = 0;

        this.jogadores.forEach(jogador => {
            jogador.setY(jogador.getY() - deslocamento);

            if (jogador.getY() < -jogador.getAltura()) {
                if (!jogador.colidiu) {
                    carrosInimigosSairam++;
                }
                jogador.setY(jogador.getY() + espaco * this.jogadores.length);
                jogador.sortearPosicao();
                jogador.colidiu = false;
            }
        });

        return carrosInimigosSairam;
    };
}

function Car(larguraJogo) {
    let movingLeft = false
    let movingRight = false
    let deslocamento = 8

    this.elemento = novoElemento('img', 'car')
    this.elemento.src = '/personagens/mario.png'

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = y => this.elemento.style.left = `${y}px`

    this.saiuDaPista = () => {
        let posicaoX = this.getX()
        if (posicaoX < 450 || posicaoX > 800) {
            deslocamento = 2
        } else {
            deslocamento = 8
        }
    }

    window.onkeydown = e => {
        if (e.which == '37' || e.which == '65') {
            movingLeft = true;
        } else if (e.which == '39' || e.which == '68') {
            movingRight = true;
        }
    }

    window.onkeyup = e => {
        movingLeft = false;
        movingRight = false;
    }

    this.animar = () => {
        const larguraMaxima = larguraJogo - this.elemento.clientWidth

        let novoX = this.getX();

        
        if (movingRight) {
            this.saiuDaPista()
            novoX += deslocamento
        } else if (movingLeft) {
            this.saiuDaPista()
            novoX -= deslocamento
        }

        if (novoX <= 0) {
            this.setX(0)
        } else if (novoX >= larguraMaxima) {
            this.setX(larguraMaxima)
        } else {
            this.setX(novoX)
        }
    }
    this.setX(larguraJogo / 2)
}

function estaoSobrepostos(elementoA, elementoB) {

    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()
    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function colidiu(carroMario, corredores) {
    let colidiu = false;

    corredores.jogadores.forEach(jogador => {
        if (!colidiu) {
            colidiu = estaoSobrepostos(carroMario.elemento, jogador.elemento);
            if (colidiu) {
                jogador.colidiu = true;
            }
        }
    });

    return colidiu;
}

function Progresso() {
    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)
}

function NovoCogumelo(largura, altura, popsicaoNaTela) {
    this.elemento = novoElemento('img', 'combustivel')
    this.elemento.src = '/personagens/Mushroom.png'

    this.sortearPosicao = () => {
        let posicaoXAleatoria = Math.floor(Math.random() * 350)
        let posicaoYAleatoria = Math.floor(Math.random() * altura)
        let margemX = ((largura / 2) - 190) // Margem horizontal para centralizar
        let margemY = (altura - this.getAltura()) / 2 // Margem vertical para centralizar
        this.setX(posicaoXAleatoria + margemX)
        this.setY(posicaoYAleatoria + margemY)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = (posicaoNaTela) => this.elemento.style.left = `${posicaoNaTela}px`
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = (posicaoNaTela) => this.elemento.style.bottom = `${posicaoNaTela}px`
    this.getAltura = () => this.elemento.clientHeight

    this.sortearPosicao()
    this.setY(popsicaoNaTela)
} 

function combustivel(largura, altura, espaco) {
    this.cogumelo = new NovoCogumelo(largura, altura, altura)

    const deslocamento = 4
    this.animar = () => {
        this.cogumelo.setY(this.cogumelo.getY() - deslocamento)

        if (this.cogumelo.getY() < - this.cogumelo.getAltura()) {
            this.cogumelo.setY(this.cogumelo.getY() + espaco)
            this.cogumelo.sortearPosicao()
        }
    }
}

function colidiuCombustivel(carroMario, combustivel) {
    const colidiu = estaoSobrepostos(carroMario.elemento, combustivel.cogumelo.elemento);

    return colidiu;
}

function MostraEnergia() {
    this.elemento = novoElemento('span', 'energia')
    this.atualizarEnergia = energia => {
        this.elemento.innerHTML = ''
        for (i=0; i<energia; i++) {
            this.elemento.innerHTML += `<img src="personagens/Mushroom.png" class="vida" alt="">`
        }
    }
}

function Game() {
    let pontos = 0;
    let energia = 16;
    const areaDoJogo = document.querySelector('[game]');
    const altura = areaDoJogo.clientHeight;
    const largura = areaDoJogo.clientWidth;

    const progresso = new Progresso();
    const mostraEnergia = new MostraEnergia();
    const corredores = new Corredores(largura, altura, 300);
    const combustivelCogumelo = new combustivel(largura, altura, 300);
    const combustivelCogumelo2 = new combustivel(largura, altura, 300);

    const arbustosEsquerda = new ArbustosEsquerda(largura, altura, 300)
    const arbustosDireita = new ArbustosDireita(largura, altura, 300)

    const car = new Car(largura);

    const pista = new criaPista();

    areaDoJogo.appendChild(progresso.elemento);
    areaDoJogo.appendChild(mostraEnergia.elemento);
    areaDoJogo.appendChild(car.elemento);
    areaDoJogo.appendChild(pista.elemento);
    areaDoJogo.appendChild(combustivelCogumelo.cogumelo.elemento);
    areaDoJogo.appendChild(combustivelCogumelo2.cogumelo.elemento);

    corredores.jogadores.forEach(jogador => areaDoJogo.appendChild(jogador.elemento));
    arbustosEsquerda.arbustos.forEach(arbusto => areaDoJogo.appendChild(arbusto.elemento))
    arbustosDireita.arbustos.forEach(arbusto => areaDoJogo.appendChild(arbusto.elemento))

    let colidiuCarroAnterior = false;

    this.start = () => {
        const temporizador = setInterval(() => {
            const carrosInimigosSairam = corredores.animar();

            combustivelCogumelo.animar();
            combustivelCogumelo2.animar();
            car.animar();
            arbustosEsquerda.animar()
            arbustosDireita.animar()

            const houveColisao = colidiu(car, corredores);

            if (houveColisao && !colidiuCarroAnterior) {
                colidiuCarroAnterior = true;
                if (pontos > 0) {
                    progresso.atualizarPontos(--pontos);
                }
            } else if (!houveColisao) {
                colidiuCarroAnterior = false;
            }

            if (carrosInimigosSairam > 0 && !houveColisao) {
                pontos += carrosInimigosSairam;
                progresso.atualizarPontos(pontos);
            }

            colidiuComCogumelo = colidiuCombustivel(car, combustivelCogumelo);
            colidiuComCogumelo2 = colidiuCombustivel(car, combustivelCogumelo2);

            if (colidiuComCogumelo) {
                if (energia < 16) {
                    ++energia
                }
                combustivelCogumelo.cogumelo.setY(-combustivelCogumelo.cogumelo.getAltura());
                mostraEnergia.atualizarEnergia(energia)
            }

            if (colidiuComCogumelo2) {
                if (energia < 16) {
                    ++energia
                }
                combustivelCogumelo2.cogumelo.setY(-combustivelCogumelo2.cogumelo.getAltura());
                mostraEnergia.atualizarEnergia(energia)
            }
            mostraEnergia.atualizarEnergia(energia)
        }, 10);

        const tiraEnergia = setInterval(() => {
            energia = energia-1
            mostraEnergia.atualizarEnergia(energia)
            if (energia == 0) {
                clearInterval(temporizador)
            }
        }, 1000)
    };
}

new Game().start()
