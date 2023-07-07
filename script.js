function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function NovoCarro(largura, posicaoNaTela) {
    this.elemento = novoElemento('img', 'par-de-barreiras');
    this.elemento.src = 'luigi-removebg-preview.png';

    this.getX = () => parseInt(this.elemento.style.top.split('px')[0])
    this.setX =  posicaoNaTela => this.elemento.style.top = `${posicaoNaTela}px`
    this.getAltura = () => this.elemento.clientHeight

    this.setX(posicaoNaTela)
}

function Corredores(largura, altura, espaco) {
    this.jogadores = [
        new NovoCarro(largura, espaco*0),
        new NovoCarro(largura, espaco*-1),
        new NovoCarro(largura, espaco*-2),
        new NovoCarro(largura, espaco*-3),
    ]

    const deslocamento = 3
    this.animar = () => {
        this.jogadores.forEach(jogador => {
            jogador.setX(jogador.getX() + deslocamento)
        })
    }
}

function Car(larguraJogo) {
    let movingLeft = false;
    let movingRight = false;

    this.elemento = novoElemento('img', 'car')
    this.elemento.src = 'mario-removebg-preview.png'

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

    // areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(car.elemento)
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