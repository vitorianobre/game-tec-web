function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function criaPista() {
    this.elemento = novoElemento('img', 'pista')
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

    // let posicaoXAleatoria = Math.floor(Math.random() * (400 - this.getAltura()))
    let posicaoXAleatoria = Math.floor(Math.random() * 380)
    let posicaoYAleatoria = Math.floor(Math.random() * 300)
    // let posicaoYAleatoria = Math.floor(Math.random() * (altura - this.getAltura()))

    // let margemX = (800 - this.getAltura()) / 2 // Margem horizontal para centralizar
    let margemX = ((largura / 2) - 200) // Margem horizontal para centralizar
    let margemY = (altura - this.getAltura()) / 2 // Margem vertical para centralizar

    this.setX(posicaoXAleatoria + margemX)
    this.setY(posicaoYAleatoria )
}

function Corredores(largura, altura) {
    this.jogadores = []

    for (let i = 0; i < 3; i++) {
        const jogador = new NovoCarro(largura, altura);
        this.jogadores.push(jogador)
    }

    const deslocamento = 3;
    this.animar = () => {
        this.jogadores.forEach(jogador => {
            const yAtual = jogador.getY()
            const novaPosicao = yAtual + deslocamento

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

function Progresso() {

    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)
}

function Game() {
    let pontos = 0
    const areaDoJogo = document.querySelector('[game]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth

    // const progresso = new Progresso()
    const corredores = new Corredores(largura, altura)

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

new Game().start()
