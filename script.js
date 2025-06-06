const display = document.getElementById('display');
let currentInput = '';

// Update display function
function updateDisplay() {
  display.textContent = currentInput || '0';
}

// Clear function
document.getElementById('clear').addEventListener('click', () => {
  currentInput = '';
  updateDisplay();
});

// Backspace function
document.getElementById('backspace').addEventListener('click', () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
});

// Number buttons
document.querySelectorAll('[data-num]').forEach(button => {
  button.addEventListener('click', () => {
    const num = button.getAttribute('data-num');

    // Avoid multiple dots in a single number
    if (num === '.' && currentInput.endsWith('.')) return;
    if (num === '.' && currentInput.split(/[\+\-\*\/]/).pop().includes('.')) return;

    currentInput += num;
    updateDisplay();
  });
});

// Operator buttons
document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    const op = button.getAttribute('data-op');
    if (!currentInput) return;

    // Prevent double operators
    if (['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1);
    }

    currentInput += op;
    updateDisplay();
  });
});

// Equals button
document.getElementById('equals').addEventListener('click', () => {
  try {
    // Replace symbols with JS operators
    const expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
    const result = eval(expression);

    if (result === undefined) {
      display.textContent = 'Error';
    } else {
      currentInput = result.toString();
      updateDisplay();
    }
  } catch {
    display.textContent = 'Error';
    currentInput = '';
  }
});
