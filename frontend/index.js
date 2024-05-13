// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    document.addEventListener('keydown', evt => {
      const currentSquare = document.querySelector('.targeted'); // Get the currently targeted square
      
      // Check which arrow key was pressed
      switch (evt.key) {
        case keys.up:
          moveHighlight(currentSquare, 'up');
          break;
        case keys.right:
          moveHighlight(currentSquare, 'right');
          break;
        case keys.down:
          moveHighlight(currentSquare, 'down');
          break;
        case keys.left:
          moveHighlight(currentSquare, 'left');
          break;
        default:
          break;
      }
    });
    
    function moveHighlight(currentSquare, direction) {
      // Get the row and column index of the current square
      const rowIndex = currentSquare.parentElement.rowIndex;
      const colIndex = Array.from(currentSquare.parentElement.children).indexOf(currentSquare);
    
      // Get the adjacent square based on the direction
      let newSquare;
      switch (direction) {
        case 'up':
          newSquare = currentSquare.parentElement.previousElementSibling?.children[colIndex];
          break;
        case 'right':
          newSquare = currentSquare.nextElementSibling;
          break;
        case 'down':
          newSquare = currentSquare.parentElement.nextElementSibling?.children[colIndex];
          break;
        case 'left':
          newSquare = currentSquare.previousElementSibling;
          break;
        default:
          break;
      }
    
      // If there's a new square and it's not already highlighted, move the highlight
      if (newSquare && !newSquare.classList.contains('highlighted')) {
        currentSquare.classList.remove('highlighted');
        newSquare.classList.add('highlighted');
      }
    }
    

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    document.addEventListener('keydown', evt => {
      const currentSquare = document.querySelector('.targeted'); // Get the currently targeted square
      const mosquito = currentSquare.querySelector('img[data-status="alive"]'); // Get the live mosquito in the targeted square
    
      // Check if the space bar is pressed and there is a live mosquito in the square
      if (evt.key === keys.space && mosquito) {
        // Change the data attribute of the mosquito to mark it as dead
        mosquito.dataset.status = 'dead';
        
        // Change the background color of the square to red
        currentSquare.style.backgroundColor = 'red';
      }
    });
    

    // 👉 TASK 5 - End the game 👈
    document.addEventListener('keydown', evt => {
      const currentSquare = document.querySelector('.targeted'); // Get the currently targeted square
      const mosquito = currentSquare.querySelector('img[data-status="alive"]'); // Get the live mosquito in the targeted square
    
      // Check if the space bar is pressed and there is a live mosquito in the square
      if (evt.key === keys.space && mosquito) {
        // Change the data attribute of the mosquito to mark it as dead
        mosquito.dataset.status = 'dead';
        
        // Change the background color of the square to red
        currentSquare.style.backgroundColor = 'red';
    
        // Check if all mosquitoes are dead
        const remainingMosquitoes = document.querySelectorAll('img[data-status="alive"]').length;
        if (remainingMosquitoes === 0) {
          // Game over, update end-game changes
          const elapsedTime = getTimeElapsed() / 1000; // Convert milliseconds to seconds
          document.querySelector('p.info').textContent = `Extermination completed in ${elapsedTime} seconds!`;
          document.querySelector('header h2').innerHTML = '<button id="restartBtn">Restart</button>';
          
          // Add click event listener to restart button
          document.getElementById('restartBtn').addEventListener('click', () => {
            // Reload the page to restart the game
            location.reload();
          });
    
          // Move focus to the restart button
          document.getElementById('restartBtn').focus();
        }
      }
    });    
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
