const saveBtn = document.querySelector(".save-button");
const orderBtn = document.querySelector(".order-button");
const blocksContainer = document.querySelector(".blocks-container");
const input = document.querySelector(".length-input");

const handleMaxValue = () => {
  if (Number(input.value) > Number(input.max)) {
    input.value = input.max;
  }
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const splitBlock = (block, hiddenBlock) => {
  const hiddenBlockLength = hiddenBlock.style.width.slice(0, -2);
  if (Number(hiddenBlockLength) > Number(block.style.width.slice(0, -2))) {
    hiddenBlock.style.width = `${hiddenBlock.style.width.slice(0, -2) - Number(input.value)}px`;
    blocksContainer.insertBefore(block, hiddenBlock);
  } else if (Number(hiddenBlockLength) < Number(block.style.width.slice(0, -2))) {
      const nextElement = hiddenBlock.nextElementSibling;
      hiddenBlock.style.backgroundColor = block.style.backgroundColor;
      hiddenBlock.classList.remove("selected");
      hiddenBlock.classList.remove("hidden");
      hiddenBlock.dataset.designator = block.dataset.designator;
      if (!nextElement) {
        hiddenBlock.style.width = block.style.width;
      } else if (nextElement && nextElement.classList.contains("hidden")) {
        nextElement.style.width = `${Number(nextElement.style.width.slice(0, -2)) + Number(hiddenBlockLength)}px`;
        blocksContainer.removeChild(hiddenBlock);
        return splitBlock(block, nextElement);
      } else {
        const newHidden = document.querySelector(".hidden");
        block.style.width = `${Number(block.style.width.slice(0, -2)) - Number(hiddenBlockLength)}px`;
        if (newHidden !== null) {
          return splitBlock(block, newHidden);
        }
        blocksContainer.appendChild(block);
      }
  } else {
    hiddenBlock.style.backgroundColor = block.style.backgroundColor;
    hiddenBlock.dataset.designator = block.dataset.designator;
    hiddenBlock.classList.remove("selected");
    hiddenBlock.classList.remove("hidden");
  }
}

const addBlock = () => {
  const block = document.createElement("div");
  block.classList.add("block");
  const blockColor = getRandomColor();
  block.style.backgroundColor = blockColor;
  block.dataset.designator = blockColor;
  block.style.width = `${Number(input.value)}px`;
  const hiddenBlock = document.querySelector(".hidden");
  if (hiddenBlock !== null) {
    splitBlock(block, hiddenBlock);
  } else {
    blocksContainer.appendChild(block);
    block.style.width = `${input.value}px`;
  }
  input.max = Number(input.max) - Number(input.value);
  if (Number(input.max) <= 0) {
    saveBtn.disabled = true;
  }
};

const handleBlockClick = () => {
  const tails = document.querySelectorAll(`[data-designator="${event.target.dataset.designator}"]`);
  console.log(tails);
  tails.forEach(tail => {
    if (tail.classList.contains("selected")) {
      tail.classList.add("hidden");
      tail.dataset.designator = "hidden";
      input.max = Number(input.max) + Number(tail.style.width.slice(0, -2));
    }
    if (tail.classList.contains("block")) {
      tail.classList.add("selected");
    }
  })
  if (Number(input.max) > 0) {
    saveBtn.disabled = false;
  }
};

const orderBlocks = () => {
  const allBlocks = Array.from(document.querySelectorAll(".block"));
  for (let i = 0; i < allBlocks.length; i++) {
    for (let j = i + 1; j < allBlocks.length; j++) {
      if (allBlocks[j].dataset.designator === allBlocks[i].dataset.designator) {
        if (allBlocks[j].dataset.designator === 'hidden') {
          allBlocks[j].style.width = `${Number(allBlocks[j].style.width.slice(0, -2)) + Number(allBlocks[i].style.width.slice(0, -2))}px`;
          blocksContainer.removeChild(allBlocks[i]);
          return orderBlocks();
        } else {
          allBlocks[i].style.width = `${Number(allBlocks[j].style.width.slice(0, -2)) + Number(allBlocks[i].style.width.slice(0, -2))}px`;
          blocksContainer.removeChild(allBlocks[j]);
          return orderBlocks();
        }
      }
    }
    if (allBlocks[i].dataset.designator === 'hidden') {
      blocksContainer.removeChild(allBlocks[i]);
      blocksContainer.appendChild(allBlocks[i])
    }
  }
}



saveBtn.addEventListener("click", addBlock);
orderBtn.addEventListener("click", orderBlocks);
input.addEventListener("input", handleMaxValue);
blocksContainer.addEventListener("click", handleBlockClick);
