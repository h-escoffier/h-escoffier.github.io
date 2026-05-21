
// Computer

function computerChoice() {
    var options = ["rock", "paper", "scissors"];
    var choice = options[Math.floor(Math.random()*options.length)];
    return choice
}

// Human

// function humanChoice() {
    //     let choice = prompt('rock, paper or scissors ?'); 
    //     return choice.toLowerCase()
// }

let human = ''
const rockBtn = document.getElementById("rock")
const paperBtn = document.getElementById("paper")
const scissorsBtn = document.getElementById("scissors")
const btn = document.querySelectorAll(".btn")

rockBtn.addEventListener("click", function () {
    // console.log("rock");
    return human = "rock";
});

paperBtn.addEventListener("click", function () {
    // console.log("paper");
    return human = "paper";
});

scissorsBtn.addEventListener("click", function () {
    return human = "scissors";
});

// Match 

let c_points = 0 
let h_points = 0

const score = document.querySelector("h2");
const sentence = document.querySelector("p");
score.textContent = (h_points + ' - ' + c_points);

function round(human, computer) {
    if (human === computer) {
        return 'Tie'
    } else if (human === 'rock' && computer === 'scissors') {
        h_points += 1 
        return 'You win! Rock beats Scissor'
    } else if (human === 'scissors' && computer === 'paper') {
        h_points += 1 
        return 'You win! Scissors beats Paper'
    } else if (human === 'paper' && computer === 'rock') {
        h_points += 1 
        return 'You win! Paper beats Rock'
    } else if (computer === 'rock' && human === 'scissors') {
        c_points += 1 
        return 'You lose! Rock beats Scissors'
    } else if (computer === 'scissors' && human === 'paper') {
        c_points += 1 
        return 'You lose! Scissors beats Paper'
    } else if (computer === 'paper' && human === 'rock') {
        c_points += 1 
        return 'You lose! Paper beats Rock'
    } 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

btn.forEach(button => {
     button.addEventListener("click", async (e) => {
        const computer = computerChoice()
        sentence.textContent = 'Computer is choosing...'
        await sleep(1000);
        output = round(human, computer)
        if (h_points === 5) {
            sentence.textContent = 'You win !'
            score.textContent = (h_points + ' - ' + c_points)
            await sleep(3000)
            c_points = 0 
            h_points = 0
            sentence.textContent = ''
            score.textContent = (h_points + ' - ' + c_points)
        } else if (c_points === 5) {
            sentence.textContent = 'You loose !'
            score.textContent = (h_points + ' - ' + c_points)
            await sleep(3000)
            c_points = 0 
            h_points = 0
            sentence.textContent = ''
            score.textContent = (h_points + ' - ' + c_points)
        } else {
            sentence.textContent = output;
            score.textContent = (h_points + ' - ' + c_points)
        }
    })});

// console.log(round(human, computer))

// function game(num) {
//     for (let i = 0; i < num; i++) {
//             const human = humanChoice()
//             const computer = computerChoice()
//             console.log(round(human, computer))
//         }
// }

// const human = humanChoice()
// const computer = computerChoice()

// console.log(round(human, computer));
// game(5)

console.log(h_points + ' - ' + c_points)