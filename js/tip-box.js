let tipBox = {
    tipBoxWrapper: document.getElementById('tip-box-wrapper'),
    tipsHeader: document.getElementById('tips-header'),
    tipInfo: document.getElementById('tip-info'),
    tipsArr: [
        "A recipe has no soul. You as the cook must bring soul to the recipe.",
        "Cooking is like love. It should be entered into with abandon or not at all.",
        "Real cooking is more about following your heart than following recipes.",
        "Good painting is like good cooking; it can be tasted, but not explained.",
        "Food was a labor of love you felt by cooking it and eating it.",
        "When it comes to cooking, it's a skill you learn and develop."],
    currentCard: 0,
    closeCross: document.getElementById('cross'),
    prevCardButton: document.getElementById('prev-tip-button'),
    nextCardButton: document.getElementById('next-tip-button'),
    dontShowCheckbox: document.getElementById('disable-checkbox'),
}

function init() {
    tipBox.tipBoxWrapper.hidden = true;
    if (localStorage.getItem('show-tips') === '0') {
        return;
    }
    printDots();
    update();
    setTimeout(() => tipBox.tipBoxWrapper.hidden = false, 5);
}

function printDots() {
    let tipBoxDotsContainer = document.getElementById('tip-box-dots');
    for (let i = 0; i < tipBox.tipsArr.length; i++) {
        tipBoxDotsContainer.innerHTML += "<i class=\"fas fa-circle dot cursor-pointer\"></i>";
    }
    tipBox.tipBoxDots = document.querySelectorAll('i.dot');
    for (let i = 0; i < tipBox.tipBoxDots.length; i++) {
        tipBox.tipBoxDots[i].addEventListener('click', () => {
            tipBox.currentCard = i;
            update();
        });
    }
}

function update() {
    tipBox.tipsHeader.innerText = 'TIP OF THE DAY';
    tipBox.tipInfo.innerText = tipBox.tipsArr[tipBox.currentCard];
    for (let i = 0; i < tipBox.tipBoxDots.length; i++) {
        tipBox.tipBoxDots[i].setAttribute('class', 'fas fa-circle dot cursor-pointer');
    }
    tipBox.tipBoxDots[tipBox.currentCard].setAttribute('class', 'far fa-circle dot');
}

document.addEventListener('keydown', e => {
    if (e.key === "Escape") {
        tipBox.tipBoxWrapper.hidden = true;
    }
});

tipBox.closeCross.addEventListener('click', () => {
    tipBox.tipBoxWrapper.hidden = true;
});

function prevCard() {
    if (tipBox.currentCard === 0) {
        tipBox.currentCard = tipBox.tipsArr.length;
    }
    tipBox.currentCard--;
    update();
}

tipBox.prevCardButton.addEventListener('click', prevCard);

document.addEventListener('keydown', e => {
    if (e.key === "ArrowLeft") {
        prevCard();
    }
});

function nextCard() {
    if (tipBox.currentCard === tipBox.tipsArr.length - 1) {
        tipBox.currentCard = -1;
    }
    tipBox.currentCard++;
    update();
}

tipBox.nextCardButton.addEventListener('click', nextCard);

document.addEventListener('keydown', e => {
    if (e.key === "ArrowRight") {
        nextCard();
    }
});

document.getElementById('logo').addEventListener('click', () => {
    localStorage.setItem('show-tips', '1');
});

tipBox.dontShowCheckbox.addEventListener('change', () => {
    if (tipBox.dontShowCheckbox.checked === true) {
        localStorage.setItem('show-tips', '0');
    } else {
        localStorage.setItem('show-tips', '1');
    }
});

init();
