class TextCrossOut {
    constructor(text) {
      this.element = document.createElement('p');
      this.element.textContent = text;
      this.element.classList.add('text-to-cross-out');
  
      this.element.addEventListener('mouseenter', () => {
        this.element.classList.add('crossed-out');
      });
  
      this.element.addEventListener('mouseleave', () => {
        this.element.classList.remove('crossed-out');
      });
  
      this.element.addEventListener('click', () => {
        this.element.style.display = 'none'; // Hide the text when clicked
      });
  
      document.body.appendChild(this.element);
    }
  }
  
  const textToCrossOut = new TextCrossOut('meters');
  