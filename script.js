function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function criaArbustos() {
    this.elemento = novoElemento('img', 'arbustos')
    this.elemento.src = './personagens/arvore-removebg-preview.png'
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

function Corredores(largura, altura, espaco, notificarPonto) {
    this.jogadores = [
        new NovoCarro(largura, altura, altura),
        new NovoCarro(largura, altura, altura),
        new NovoCarro(largura, altura, altura)
    ]

    const deslocamento = 2
    this.animar = () => {
        this.jogadores.forEach(jogador => {
            jogador.setY(jogador.getY() - deslocamento)

            if (jogador.getY() < -jogador.getAltura()) {
                jogador.setY(jogador.getY() + espaco * this.jogadores.length)
                jogador.sortearPosicao()
            }
            const meio = 60 / 2
            const cruzouMeio = jogador.getY() + deslocamento >= meio
                && jogador.getY() < meio
            if(cruzouMeio){
                notificarPonto()
            }
        })
    }
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
    let colidiu = false

    corredores.jogadores.forEach(jogador => {
        if (!colidiu) {
            colidiu = estaoSobrepostos(carroMario.elemento, jogador.elemento)
        }
    })
    return colidiu
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

    const progresso = new Progresso()
    const corredores = new Corredores(largura, altura, 300, () => progresso.atualizarPontos(++pontos))

    const car = new Car(largura)

    const pista = new criaPista()

    areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(car.elemento)
    areaDoJogo.appendChild(pista.elemento)

    corredores.jogadores.forEach(jogador => areaDoJogo.appendChild(jogador.elemento))

    this.start = () => {
        const temporizador = setInterval(() => {
            corredores.animar()
            car.animar()

            if(colidiu(car, corredores)){
                progresso.atualizarPontos(--pontos)
            }
        }, 10)
    }
}

new Game().start()
