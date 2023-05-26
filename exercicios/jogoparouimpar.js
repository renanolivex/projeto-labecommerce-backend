
//Exercicio "Fazer um jogo de par ou impar gerando numero aleatorio"

const valor = process.argv[2]
const parOuImpar = process.argv[3]
const gerarNumero = Math.floor(Math.random()*(5 - 0 + 1))
const valorFinal = Number(valor) + gerarNumero

parImpar(valorFinal, parOuImpar.toLowerCase())
function parImpar(total, parOuImpar){

        
        if (total % 2 ===0){

          switch(parOuImpar){
            case "par": console.log(`O total deu ${total}, Você Venceu!`)
            break;
            case "impar": console.log(`O total deu ${total}, Você Perdeu!`)
            break;
          }
        
        }
        else {  
            switch(parOuImpar){
                case "par": console.log(`O total deu ${total}, Você Perdeu!`)
                break;
                case "impar": console.log(`O total deu ${total}, Você Venceu!`)
                break;
              }      
    }
}
