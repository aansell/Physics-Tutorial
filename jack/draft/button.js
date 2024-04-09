const body = document.querySelector('body');

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');

const leftButton = document.createElement('button');
leftButton.textContent = 'Back';

const rightButton = document.createElement('button');
rightButton.textContent = 'Next';

buttonContainer.appendChild(leftButton);
buttonContainer.appendChild(rightButton);

body.appendChild(buttonContainer);