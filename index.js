console.log("Hello!")
const saveBtn = document.querySelector('.button');
const blocksContainer = document.querySelector('.blocks-container');
const input = document.querySelector('.length-input');


const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


const addBlock = () => {
  const block = document.createElement("div");
  block.classList.add('block');
  block.style.width = `${input.value}px`;
  input.max = input.max - input.value;
  block.style.backgroundColor = getRandomColor();
  block.style.opacity = 0.5;
  blocksContainer.appendChild(block);
}

saveBtn.addEventListener('click', addBlock);