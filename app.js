const uCardsArr = [
    {
        set: 1,
        path:'images/cat-gb563d9095_640.png'
    },
    {
        set: 2,
        path:'images/dog-g924f54dfd_640.jpg'
    },
    {
        set: 3,
        path: 'images/dog-gc99455678_640.jpg'
    },
    {
        set: 4,
        path: 'images/dog-ge40dad750_640.jpg'
    },
    {
        set: 5,
        path:'images/pugs-g51e254b26_640.png'
    },
    {
        set: 6,
        path:'images/puppy-g07efd7216_640.png'
    }
]

let cardsArr = [1, 2, 3, 4, 5, 6]
cardsArr = [...cardsArr, ...cardsArr]

cardsArr.sort(()=>0.5 - Math.random())

const wildCard = 'images/stripes-gf0306262b_640.jpg'

let card1 = null, card2 = null
let cardsWon = 0

const gridDisplay = document.getElementById('grid')
const scoreDisplay = document.getElementById('score')

createBoard()
function createBoard() {
    cardsArr.forEach((c, index) => {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/stripes-gf0306262b_640.jpg')
        card.setAttribute('data-id', index)
        card.setAttribute('data-set', c)
        card.addEventListener('click', cardFlip)
        gridDisplay.appendChild(card)
    })
}

function cardFlip() {
    const id = this.getAttribute('data-id')
    const set = this.getAttribute('data-set')
    const match = uCardsArr.filter((c)=> c.set == set)
    this.setAttribute('src', match[0].path)
    if (card1 === null) {
        card1 = {id: id, set:set}
    }
    else {
        card2 = {id: id, set:set}
        checkMatch() 
        scoreDisplay.innerHTML = cardsWon
        if (cardsWon === 6) {
            alert('You won')
        }
        card1 = null
        card2 = null
        
    }
}

function checkMatch() {
    if (card1.set === card2.set) {
        cardsWon = cardsWon + 1
        const cardsChosen = document.querySelectorAll(`img[data-set="${card1.set}"]`)
        cardsChosen.forEach( c => {
            c.style.opacity = 0.1
            c.removeEventListener('click', cardFlip)
        })
    }
    else {
        setTimeout(revertCards, 500, card1.id, card2.id)
    }
}

function revertCards(id1, id2) {
    const cardSet1 = [ document.querySelectorAll(`img[data-id="${id1}"]`)]
    cardSet1.forEach( c => {
        c[0].setAttribute('src', wildCard)
    })
    const cardSet2 = [ document.querySelectorAll(`img[data-id="${id2}"]`)]
    cardSet2.forEach( c => {
        c[0].setAttribute('src', wildCard)
    })
}