function getTextbyClicking() {
  // Get the clickable text at the start of the program
  const clickableText = document.getElementById('clickable-text');
  console.log(clickableText.textContent);

  // Add event listeners to the clickable text to toggle the crossed-out style
  clickableText.addEventListener('mouseenter', () => {
    console.log("mouse enter");
    clickableText.classList.add('crossed-out');
    //clickableText.style.textDecoration = 'line-through';
    //clickableText.style.color = 'red';
  });

  clickableText.addEventListener('mouseleave', () => {
    clickableText.classList.remove('crossed-out');
    //clickableText.style.textDecoration = 'none';
    //clickableText.style.color = ''; // Reset color to default
  });

  clickableText.addEventListener('click', () => {
    clickableText.style.display = 'none'; // Hide the text when clicked
  });
}

getTextbyClicking();