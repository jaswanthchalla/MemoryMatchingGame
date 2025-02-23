const themeCards = document.querySelectorAll(".theme");

themeCards.forEach(theme => {
    theme.addEventListener("click", function () {
        displayGame(theme.id);
    });
});

function displayGame(themeId){
    document.getElementById("home-page").style.display = "none";
    document.getElementById("game").style.display = "block";

    shuffleCard(themeId);
}

const cards = document.querySelectorAll(".card");


function startGame(){
    document.querySelector(".start-button").style.display = 'none';
    cards.forEach(card => {
        card.addEventListener("click", handleCardClick);
    });
    startTimer();
}

let card1, card2,disableClick = false, matchedCards = 0;

function handleCardClick(e){
    let clickedCard = e.target;
    if(clickedCard !== card1 && !disableClick){
        clickedCard.classList.add("flip");
        if(!card1){
            card1 = clickedCard;
            return;
        }
        card2 = clickedCard;
        disableClick = true;
        let card1Img = card1.querySelector("img").src;
        let card2Img = card2.querySelector("img").src;

        matchCards(card1Img, card2Img);
    }
}

function matchCards(img1, img2){
    if(img1 === img2){
        matchedCards++;
        document.getElementById("score").textContent = matchedCards*10;
        if(matchedCards == 8){
            clearInterval(timer);
            displayScore();
            return;
        }
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = card2 = "";
        disableClick = false;
        return;
    }

    setTimeout(() => {
        card1.classList.add("shake");
        card2.classList.add("shake");
    }, 400);
    
    setTimeout(() => {
        card1.classList.remove("shake", "flip");
        card2.classList.remove("shake", "flip");
        card1 = card2 = "";
        disableClick = false;
    }, 1200);
    
}

function shuffleCard(theme){
    matchedCards = 0;
    disableClick = false;
    card1 = card2 = "";
    document.querySelector(".start-button").style.display = 'block';
    document.getElementById("time").textContent = 30 + "s";
    document.getElementById("score").textContent = 0;
    document.querySelector(".final-score").textContent = 0;
    document.querySelector('.play-again-themes').style.display = "none";
    document.getElementById("time").style.color = "black";
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/${theme}/img-${arr[index]}.png`;
    });
}

function displayScore(){
    cards.forEach(card => {
        card.removeEventListener("click", handleCardClick);
    });
    const resultEle = document.querySelector('.result');
    const finalScore = document.querySelector(".final-score");
    resultEle.style.display = "flex";
    finalScore.textContent = matchedCards*10;
    let matchedCardsPrecentage = parseInt(matchedCards/8 * 100);
    document.querySelector(".matchedPercentage").textContent = matchedCardsPrecentage + "%";
    if(matchedCards === 8){
        document.querySelector(".congo-text").style.display = "inline";
    }
}

function playAgain(){
    document.querySelector(".congo-text").style.display = "none";
    document.querySelector('.result').style.display = "none";
    document.querySelector('.play-again-themes').style.display = "block";
}


let timer;
function startTimer() {
    let timeLeft = 30; // 30 seconds countdown
    timer = setInterval(() => {
        document.getElementById("time").textContent = timeLeft + "s";
        timeLeft--;

        if(timeLeft < 10){
            document.getElementById("time").style.color = "red";
        }

        if (timeLeft < 0) {
            clearInterval(timer); // Stop the timer when it reaches 0
            displayScore(); // Display score when time runs out
        }
    }, 1000);
}
