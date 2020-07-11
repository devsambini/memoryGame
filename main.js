// Renderizando o HTML
const cardBoard = document.querySelector('#cardboard')
const images = [
  "angular.svg",
  "aurelia.svg",
  "backbone.svg",
  "ember.svg",
  "react.svg",
  "vue.svg"
];

let cardHTML = "";

images.forEach(image => {
  cardHTML += `
    <div class="memory-card" data-card="${image}">
      <img class="front-face" src="images/${image}">
      <img class="back-face" src="images/js-badge.svg">
    </div>
  `
});

cardBoard.innerHTML = cardHTML + cardHTML;

// Criando as interações

const cards = document.querySelectorAll('.memory-card');
let firstCard;
let secoundCard;
let lockCard = false;

function flipCard() {
  if(lockCard) return false;

  this.classList.add('flip');
  if(!firstCard){
    firstCard = this;
    return false;
  };
  secoundCard = this;

  checkForMatch();
};

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secoundCard.dataset.card;
  !isMatch ? disableCards() : resetCards(isMatch);
};

function disableCards() {
  lockCard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secoundCard.classList.remove('flip');

    resetCards();
  }, 1000);
};

(function shuffle(){
  cards.forEach( card => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();


function resetCards(isMatch = false) {
  if(isMatch){
    firstCard.removeEventListener('click', flipCard);
    secoundCard.removeEventListener('click', flipCard);
  }
  [firstCard, secoundCard, lockCard] = [null, null, false];
};

cards.forEach(card => card.addEventListener('click', flipCard));