
function getTextbyClicking(){
  const clickableText = document.getElementById('clickable-text');

  // Add a click event listener to the text element
  clickableText.addEventListener('click', function() {
    // Store the text content of the clicked element in a variable
    const clickedText = this.textContent;
    textCrossOut(clickedText);
    
    // Display the text in the console (you can store it in a variable or use it as needed)
    //console.log(clickedText);
    return clickedText;
    // Example: Store the text in a variable for later use
    // const storedText = clickedText;
  });
    
}

function textCrossOut(text) {
  const element = document.createElement('p');
  element.textContent = text;
  console.log(element.textContent);
  element.classList.add('text-to-cross-out');

  element.addEventListener('mouseenter', () => {
    element.classList.add('crossed-out');
  });

  element.addEventListener('mouseleave', () => {
    element.classList.remove('crossed-out');
  });

  element.addEventListener('click', () => {
    element.style.display = 'none'; // Hide the text when clicked
  });

  document.body.appendChild(element);


}

let textToCrossOut = getTextbyClicking();

const crossedText = textCrossOut(textToCrossOut);

