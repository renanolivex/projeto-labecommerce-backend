// Exercicio "Fazer um Jogo de pedra papel e tesoura"

const gerarValor = Math.floor(Math.random() * (3 - 1 + 1) + 1)
const escolha = process.argv[2]


Resultados(gerarValor, escolha.toLowerCase())
function Resultados(gerarValor, escolha) {
    if (escolha === "tesoura") {
        switch (gerarValor) {
            case 1: console.log("Computador escolheu PEDRA, pedra quebra tesoura, computador vence!")
                break;
            case 2: console.log("Computador também escolheu TESOURA, empate!")
                break;
            case 3: console.log("Computador escolheu PAPEL, tesoura corta papel, você vence!")
                break;
        }
    }
    else if (escolha === "pedra") {
        switch (gerarValor) {
            case 1: console.log("Computador também escolheu PEDRA, empate!")
                break;
            case 2: console.log("Computador escolheu TESOURA, pedra quebra tesoura, você vence!")
                break;
            case 3: console.log("Computador escolheu PAPEL, papel embrulha pedra, computador vence!")
                break;
        }
        

    }
    else if (escolha === "papel") {
        switch (gerarValor) {
            case 1: console.log("Computador escolheu PEDRA, papel embrulha pedra, você vence!")
                break;
            case 2: console.log("Computador escolheu TESOURA, tesoura corta papel, computador vence!")
                break;
            case 3: console.log("Computador também escolheu PAPEL, empate!")
                break;
        }
        

    }

}