const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playButton = document.getElementById('play-button');
const popupContainer = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const notificationContainer = document.getElementById('notification-container');
const hangmanCanvas = document.getElementById('hangman');
const keyboardElement = document.getElementById('keyboard');
const context = hangmanCanvas.getContext('2d');

const words = ['javascript', 'hangman', 'coding', 'programming', 'github'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordElement.innerHTML = `${selectedWord
        .split('')
        .map(
            letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `
        )
        .join('')}`;

    const innerWord = wordElement.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popupContainer.style.display = 'flex';
    }
}

function updateWrongLetters() {
    wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong letters:</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join(', ')}
    `;

    drawHangman();

    if (wrongLetters.length === 6) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popupContainer.style.display = 'flex';
    }
}

function showNotification() {
    notificationContainer.classList.add('show');

    setTimeout(() => {
        notificationContainer.classList.remove('show');
    }, 2000);
}

function drawHangman() {
    context.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    context.lineWidth = 2;
    context.strokeStyle = '#000';

    // Draw base
    context.beginPath();
    context.moveTo(10, 190);
    context.lineTo(190, 190);
    context.stroke();

    // Draw pole
    context.beginPath();
    context.moveTo(50, 190);
    context.lineTo(50, 20);
    context.lineTo(150, 20);
    context.lineTo(150, 40);
    context.stroke();

    if (wrongLetters.length > 0) {
        // Draw head
        context.beginPath();
        context.arc(150, 50, 10, 0, Math.PI * 2);
        context.stroke();
    }
    if (wrongLetters.length > 1) {
        // Draw body
        context.beginPath();
        context.moveTo(150, 60);
        context.lineTo(150, 100);
        context.stroke();
    }
    if (wrongLetters.length > 2) {
        // Draw left arm
        context.beginPath();
        context.moveTo(150, 70);
        context.lineTo(130, 90);
        context.stroke();
    }
    if (wrongLetters.length > 3) {
        // Draw right arm
        context.beginPath();
        context.moveTo(150, 70);
        context.lineTo(170, 90);
        context.stroke();
    }
    if (wrongLetters.length > 4) {
        // Draw left leg
        context.beginPath();
        context.moveTo(150, 100);
        context.lineTo(130, 130);
        context.stroke();
    }
    if (wrongLetters.length > 5) {
        // Draw right leg
        context.beginPath();
        context.moveTo(150, 100);
        context.lineTo(170, 130);
        context.stroke();
    }
}

window.addEventListener('keydown', e => {
    if (e.key >= 'a' && e.key <= 'z') {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
});

playButton.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLetters();
    popupContainer.style.display = 'none';
});

function createKeyboard() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    keyboardElement.innerHTML = letters
        .split('')
        .map(
            letter => `<button>${letter}</button>`
        )
        .join('');

    keyboardElement.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const letter = button.innerText;

            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLetters();
                } else {
                    showNotification();
                }
            }
        });
    });
}

createKeyboard();
displayWord();
