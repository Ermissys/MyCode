/* Exemplo 01 */

function ex1() {

    var Num = parseInt(prompt("Digite um número:", ["Ex: 78"]));

    var Tot = 0

    while( Num > 0 ){

         if ( Num % 2 == 0 ){

            alert( Num );
            Tot = Tot + Num

        }

        Num--;

    }

    alert("A soma total dos valores é "+Tot+".")

}

/* Exemplo 02 */

function ex2() {

    C = parseFloat(prompt("Digite a temperatuta em Celcius para converter em Fahrenheit:", ["Ex: 34"]))

    Temp = C * 1.8 + 32

    alert("O temperatura em fahrenheit é "+Temp)

    F = parseFloat(prompt("Digite a temperatuta em Fahrenheit para converter em Celcius:", ["Ex: 120"]))

    Temp = (F - 32) / 1.8

    alert("O temperatura em fahrenheit é "+Temp)

}

/* Exemplo 03 */

function ex3() {

    Prod1 = prompt("Digite o nome do primeiro produto:")
    Prod2=prompt("Digite o nome do segundo produto:")
    Prod3=prompt("Digite o nome do terceiro produto:")

    Vlr1=parseFloat(prompt("Digite o valor do primeiro produto:"))
    Vlr2=parseFloat(prompt("Digite o valor do segundo produto:"))
    Vlr3=parseFloat(prompt("Digite o valor do terceiro produto:"))

    Qntd1=parseInt(prompt("Digite a quantidade vendida do primeiro produto:"))
    Qntd2=parseInt(prompt("Digite a quantidade vendida do segundo produto:"))
    Qntd3=parseInt(prompt("Digite a quantidade vendida do terceiro produto:"))

    Tot1 = Vlr1 * Qntd1
    Tot2 = Vlr2 * Qntd2
    Tot3 = Vlr3 * Qntd3

    alert("O valor total da venda do primeiro produto "+Prod1+" é "+Tot1+".")
    alert("O valor total da venda do primeiro produto "+Prod2+" é "+Tot2+".")
    alert("O valor total da venda do primeiro produto "+Prod3+" é "+Tot3+".")

}

/* Exemplo 04 */

function ex4() {

    Dtnc = parseFloat(prompt("Digite a distância percorrida em quilômetros:"))

    Vlr = parseFloat(prompt("Digite o valor do combustível:"))

    Tot = ( Dtnc / 8 ) * Vlr

    alert("O valor total é "+Tot)

}

/* Exemplo 05 */

function ex5() {

    Larg = parseFloat(prompt("Digite a largura do cômodo:"))

    Compri = parseFloat(prompt("Digite o comprimento do cômodo:"))

    Com = Larg * Compri

    Valor = Com * 36

    alert("O custo total é "+Valor+".")

}

/* Exemplo 06 */

function ex6() {

    Sexo = parseInt(prompt("Digite seu sexo, 1 para feminino e 2 para masculino."))

    Alt = parseFloat(prompt("Digite sua altura:"))

    switch( Sexo ){

        case 1:
        Pid = 62.4 * Alt - 44.7;
        alert("Seu peso ideal é "+Pid+".");
        break;

        case 2:
        Pid = 72.7 * Alt - 58;
        alert("Seu peso ideal é "+Pid+".");
        break;

    }   

}

/* Exemplo 07 */

function ex7() {

        numeros = document.getElementById("txtNumeros").value;

        numeros = numeros.split(",");

        var maior = parseInt(numeros[0]);

        for( i = 1; i < numeros.length; i++ ){

            if(parseInt(numeros[i]) > maior){

                maior = parseInt(numeros[i]);

            }
        }

        alert("O maior número é "+maior);

        var menor = parseInt(numeros[0]);

        for( i = 1; i < numeros.length; i++ ){

            if(parseInt(numeros[i]) < menor){

                menor = parseInt(numeros[i]);

            }
        }

        alert("O menor número é "+menor);

}




/* CAMPO MINADO */

document.getElementById('backgroundMusic').play();
document.getElementById('backgroundMusic').volume = 0.1;

let musicPlaying = true;

// Adicionar evento de clique ao botão de alternância
const toggleMusicButton = document.getElementById('toggleMusicButton');
toggleMusicButton.addEventListener('click', toggleMusic);

// Função para ligar/desligar a música
function toggleMusic() {
const backgroundMusic = document.getElementById('backgroundMusic');

if (musicPlaying) {
    backgroundMusic.pause();
    } else {
        backgroundMusic.play();
        }

        musicPlaying = !musicPlaying;
}

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const rows = 10;
const cols = 10;
const totalBombs = 20; // Ajustado para 20% de bombas

let grid = [];

// Função para gerar o campo minado
function generateField() {
    grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
            isBomb: false,
            isOpen: false,
            bombsAround: 0,
            isFlagged: false, // Novo atributo para bandeirinhas
        }))
    );

    // Colocar bombas aleatórias
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].isBomb = Math.random() < totalBombs / 100;
        }
    }

    // Calcular o número de bombas ao redor de cada célula
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!grid[i][j].isBomb) {
                grid[i][j].bombsAround = countBombsAround(i, j);
            }
        }
    }

    drawField(); // Chame a função drawField após gerar o campo
}

// Função para contar o número de bombas ao redor de uma célula
function countBombsAround(row, col) {
    let count = 0;

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < rows && j >= 0 && j < cols && grid[i][j].isBomb) {
                count++;
            }
        }
    }

    return count;
}

// Função para desenhar o campo minado no canvas
function drawField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellSize = 50;
    const cellPadding = 2;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = j * (cellSize + cellPadding);
            const y = i * (cellSize + cellPadding);

            if (grid[i][j].isOpen) {
                ctx.fillStyle = grid[i][j].isBomb ? '#ff0000' : '#362F2E';
            } else {
                ctx.fillStyle = '#B59F9C';
            }

            ctx.fillRect(x, y, cellSize, cellSize);

            if (grid[i][j].isFlagged) {
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#362F2E';
                ctx.fillText('B', x + cellSize / 2, y + cellSize / 2 + 8);
            } else if (grid[i][j].isOpen && !grid[i][j].isBomb && grid[i][j].bombsAround > 0) {
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#B59F9C';
                ctx.fillText(grid[i][j].bombsAround, x + cellSize / 2, y + cellSize / 2 + 8);
            }
        }
    }
}

// Função para lidar com os cliques do jogador
function handleMouseClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const col = Math.floor(mouseX / (50 + 2));
    const row = Math.floor(mouseY / (50 + 2));

    const cell = grid[row][col];

    if (!cell.isOpen) {
        if (event.shiftKey) {
            // Clicar com shift pressionado adiciona ou remove bandeira
            cell.isFlagged = !cell.isFlagged;
        } else if (!cell.isFlagged) {
            // Abrir a célula apenas se não houver bandeira
            cell.isOpen = true;

            if (cell.isBomb) {
                playLoseSound();
                setTimeout(() => {
                    alert('Game Over! Você atingiu uma bomba.');
                    generateField();
                }, 1000); // Aguarda 1 segundo antes de exibir o alerta
            } else {
                // Verificar se o jogador ganhou (abriu todas as células não-bomba)
                const nonBombCells = rows * cols - totalBombs;
                const openedNonBombCells = grid.flat().filter(cell => cell.isOpen && !cell.isBomb).length;

                if (openedNonBombCells === nonBombCells) {
                    playWinSound();
                    setTimeout(() => {
                        alert('Parabéns! Você ganhou!');
                        generateField();
                    }, 1000); // Aguarda 1 segundo antes de exibir o alerta
                }
            }
        }

        drawField(); // Mova a chamada para drawField aqui para garantir o desenho imediato
    }
}

// Função para reiniciar o jogo
function restartGame() {
    generateField();
    drawField();
}

// Função para reproduzir o som de vitória
function playWinSound() {
    const winSound = document.getElementById('winSound');
    winSound.play();
}

// Função para reproduzir o som de derrota
function playLoseSound() {
    const loseSound = document.getElementById('loseSound');
    loseSound.play();
}

// Adicionar evento de clique ao canvas
canvas.addEventListener('click', handleMouseClick);

// Inicializar e desenhar o campo minado
generateField();
drawField();

canvas.addEventListener('click', handleCellClick);

function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.play();
}

function handleCellClick() {
    playClickSound();
    }