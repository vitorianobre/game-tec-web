function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function criaPista(quantidadePistas) {
    this.elemento = novoElemento('img', 'barreiras')
    this.elemento.src = '/personagens/pista.png'
}

function NovoCarro(largura, altura) {
    this.elemento = novoElemento('img', 'par-de-barreiras')
    this.elemento.src = '/personagens/luigi.png'

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = (posicaoNaTela) => this.elemento.style.left = `${posicaoNaTela}px`
    this.getY = () => parseInt(this.elemento.style.top.split('px')[0])
    this.setY = (posicaoNaTela) => this.elemento.style.top = `${posicaoNaTela}px`
    this.getAltura = () => this.elemento.clientHeight

    var posicaoXAleatoria = Math.floor(Math.random() * (400 - this.getAltura()))
    var posicaoYAleatoria = Math.floor(Math.random() * (altura - this.getAltura()))

    var margemX = (800 - this.getAltura()) / 2 // Margem horizontal para centralizar
    var margemY = (altura - this.getAltura()) / 2 // Margem vertical para centralizar

    this.setX(posicaoXAleatoria + margemX)
    this.setY(posicaoYAleatoria + margemY)
}

function Corredores(largura, altura, quantidadeJogadores) {
    this.jogadores = []

    var quantidadeMaximaJogadores = Math.min(quantidadeJogadores, 3) // Limita a quantidade de jogadores em até 3

    for (var i = 0; i < quantidadeMaximaJogadores; i++) {
        var jogador = new NovoCarro(largura, altura);
        this.jogadores.push(jogador)
    }

    const deslocamento = 3;
    this.animar = () => {
        this.jogadores.forEach(jogador => {
            var yAtual = jogador.getY()
            var novaPosicao = yAtual + deslocamento

            if (novaPosicao > altura) {
                jogador.setY(-jogador.getAltura())
            } else {
                jogador.setY(novaPosicao)
            }
        });
    };
}

function Car(larguraJogo) {
    let movingLeft = false
    let movingRight = false

    this.elemento = novoElemento('img', 'car')
    this.elemento.src = '/personagens/mario.png'

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = y => this.elemento.style.left = `${y}px`

    window.onkeydown = e => {
        if (e.which == '37') {
            movingLeft = true;
        } else if (e.which == '39') {
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
            novoX += 15
        } else if (movingLeft) {
            novoX -= 15
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

function Game() {
    let pontos = 0
    const areaDoJogo = document.querySelector('[game]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth

    // const progresso = new Progresso()
    const corredores = new Corredores(largura, altura, 200)

    const car = new Car(largura)

    const pista = new criaPista()

    // areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(car.elemento)
    areaDoJogo.appendChild(pista.elemento)

    corredores.jogadores.forEach(jogador => areaDoJogo.appendChild(jogador.elemento))

    // this.start = () => {
    //     const temporizador = setInterval(() => {
    //         corredores.animar()
    //         passaro.animar()

    //           if(colidiu(passaro,corredores)){
    //              clearInterval(temporizador) 
    //          } 
    //     }, 20)
    // }

    this.start = () => {
        const temporizador = setInterval(() => {
            corredores.animar()
            car.animar()
        }, 20)
    }
}

function Progresso() {

    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)
}

new Game().start()
