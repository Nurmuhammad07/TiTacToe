let changerText = document.querySelector('.h2')
let restartBtn = document.querySelector('.btn')
let items = Array.from(document.querySelectorAll('.item'))
let box = document.querySelector('.container')
let winningBlock = getComputedStyle(document.body).getPropertyValue('--winning-block')

const X_TEXT = 'X'
const O_TEXT = 'O'
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    items.forEach(item => item.addEventListener('click', clickedItem))
}

function clickedItem(e) {
    const id = e.target.id

    if (!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (playerHasWon() !== false) {
            changerText.innerText = `${currentPlayer} has won`
            let winning_blocks = playerHasWon()
            winning_blocks.map(item => items[item].style.background = winningBlock)
            return
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function playerHasWon() {

    for (const cond of winningComb) {
        let [a, b, c] = cond

        if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
            return [a, b, c]
        }

    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    items.forEach(item => {
        item.innerText = ''
        item.style.background = ''
    })
    currentPlayer = X_TEXT
}

startGame()