for (let i = 0; i < 25; i++) {
    let cell = document.createElement('button')
    cell.classList.add('cell')
    document.querySelector('.board').appendChild(cell)
}

const socket = io.connect('http://localhost:1953/')

const cells = document.querySelectorAll('.cell')
const bingo = document.querySelectorAll('span')
const sound = document.getElementById('sound')
const overl = document.querySelector('.overlay')
const resrt = document.querySelector('.restart')
const color = '#59ec59'
let arr = Array.from({
    length: 25
}, (v, i) => i + 1)
let point = 0
let valid = []

const contains = (...cells) => cells.every(cell => cell.classList.contains('strike'))

const pattern = (...pats) => pats.forEach(pat => pat.style.backgroundColor = color)

const checkVertical = () => {
    for (let i = 0; i < 5; i++) {
        switch (i) {
            case 0:
                if (!valid.includes(i + 'v') && (contains(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20]))) {
                    point++
                    valid.push(i + 'v')
                    pattern(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20])
                }
                break
            case 1:
                if (!valid.includes(i + 'v') && (contains(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20]))) {
                    point++
                    valid.push(i + 'v')
                    pattern(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20])
                }
                break
            case 2:
                if (!valid.includes(i + 'v') && (contains(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20]))) {
                    point++
                    valid.push(i + 'v')
                    pattern(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20])
                }
                break
            case 3:
                if (!valid.includes(i + 'v') && (contains(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20]))) {
                    point++
                    valid.push(i + 'v')
                    pattern(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20])
                }
                break
            case 4:
                if (!valid.includes(i + 'v') && (contains(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20]))) {
                    point++
                    valid.push(i + 'v')
                    pattern(cells[i], cells[i + 5], cells[i + 10], cells[i + 15], cells[i + 20])
                }
                break
        }
    }
}

const checkHorizontal = () => {
    for (let i = 0; i < 5; i++) {
        switch (i) {
            case 0:
                if (!valid.includes(i + 'h') && (contains(cells[i], cells[i + 1], cells[i + 2], cells[i + 3], cells[i + 4]))) {
                    point++
                    valid.push(i + 'h')
                    pattern(cells[i], cells[i + 1], cells[i + 2], cells[i + 3], cells[i + 4])
                }
                break
            case 1:
                if (!valid.includes(i + 'h') && (contains(cells[i + 4], cells[i + 5], cells[i + 6], cells[i + 7], cells[i + 8]))) {
                    point++
                    valid.push(i + 'h')
                    pattern(cells[i + 4], cells[i + 5], cells[i + 6], cells[i + 7], cells[i + 8])
                }
                break
            case 2:
                if (!valid.includes(i + 'h') && (contains(cells[i + 8], cells[i + 9], cells[i + 10], cells[i + 11], cells[i + 12]))) {
                    point++
                    valid.push(i + 'h')
                    pattern(cells[i + 8], cells[i + 9], cells[i + 10], cells[i + 11], cells[i + 12])
                }
                break
            case 3:
                if (!valid.includes(i + 'h') && (contains(cells[i + 12], cells[i + 13], cells[i + 14], cells[i + 15], cells[i + 16]))) {
                    point++
                    valid.push(i + 'h')
                    pattern(cells[i + 12], cells[i + 13], cells[i + 14], cells[i + 15], cells[i + 16])
                }
                break
            case 4:
                if (!valid.includes(i + 'h') && (contains(cells[i + 16], cells[i + 17], cells[i + 18], cells[i + 19], cells[i + 20]))) {
                    point++
                    valid.push(i + 'h')
                    pattern(cells[i + 16], cells[i + 17], cells[i + 18], cells[i + 19], cells[i + 20])
                }
                break
        }
    }
}

const checkDiagonal = () => {
    for (let i = 0; i < 5; i++) {
        switch (i) {
            case 0:
                if (!valid.includes(i + 'd') && (contains(cells[i], cells[i + 6], cells[i + 12], cells[i + 18], cells[i + 24]))) {
                    point++
                    valid.push(i + 'd')
                    pattern(cells[i], cells[i + 6], cells[i + 12], cells[i + 18], cells[i + 24])
                }
                break
            case 4:
                if (!valid.includes(i + 'd') && (contains(cells[i], cells[i + 4], cells[i + 8], cells[i + 12], cells[i + 16]))) {
                    point++
                    valid.push(i + 'd')
                    pattern(cells[i], cells[i + 4], cells[i + 8], cells[i + 12], cells[i + 16])
                }
                break
        }
    }
}

const checkBINGO = () => {
    if (point > 0 && point < 7)
        for (let i = 0; i < point; i++)(point > 5) ? bingo[4].style.backgroundColor = color : bingo[i].style.backgroundColor = color
}

const winningMsg = () => {
    if (point >= 5) {
        sound.play()
        cells.forEach(cell => cell.disabled = true)
        overl.style.display = 'flex'
    }
}

const shuffle = a => a.sort(() => Math.random() - 0.5)

const restart = () => {
    point = 0
    valid = []
    arr = shuffle(arr)
    cells.forEach((cell, i) => {
        cell.textContent = arr[i]
        cell.classList.remove('strike')
        overl.style.display = 'none'
        cell.disabled = false
        cell.style.backgroundColor = 'transparent'
    })
    bingo.forEach(bing => bing.style.backgroundColor = 'transparent')
    cells.forEach(cell => cell.addEventListener('click', () => {
        cell.classList.add('strike')
        checkVertical()
        checkHorizontal()
        checkDiagonal()
        checkBINGO()
        winningMsg()
    }))
}

restart()
resrt.addEventListener('click', restart)