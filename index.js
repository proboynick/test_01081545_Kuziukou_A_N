const saveBtn = document.querySelector(".button");
const blocksContainer = document.querySelector(".blocks-container");
const input = document.querySelector(".length-input");

const handleMaxValue = () => {
  if (Number(input.value) > Number(input.max)) {
    console.log("max");
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

const addBlock = () => {
  const block = document.createElement("div");
  block.classList.add("block");
  const blockColor = getRandomColor();
  block.style.backgroundColor = blockColor;
  const hiddenBlock = document.querySelector(".hidden");
  if (hiddenBlock !== null) {
    const lng = hiddenBlock.style.width.slice(0, -2);
    if (Number(lng) > Number(input.value)) {
      hiddenBlock.style.width = `${Number(lng) - Number(input.value)}px`;
      blocksContainer.insertBefore(block, hiddenBlock);
    } else if (Number(lng) < Number(input.value)) {
      const blocks = document.querySelectorAll(".block");
      hiddenBlock.style.backgroundColor = blockColor;
      hiddenBlock.classList.remove("selected");
      hiddenBlock.classList.remove("hidden");
      if (blocks.length < 3) {
        hiddenBlock.style.width = `${input.value}px`;
      } else {
        block.style.width = `${Number(input.value) - Number(lng)}px`;
        blocksContainer.appendChild(block);
      }
    } else {
      hiddenBlock.style.backgroundColor = blockColor;
      hiddenBlock.classList.remove("selected");
      hiddenBlock.classList.remove("hidden");
    }
  } else {
    blocksContainer.appendChild(block);
    input.max = Number(input.max) - Number(input.value);
    block.style.width = `${input.value}px`;
  }
  if (Number(input.max) <= 0) {
    saveBtn.disabled = true;
  }
};

const handleBlockClick = () => {
  const target = event.target;
  if (target.classList.contains("selected")) {
    target.classList.add("hidden");
    input.max = Number(input.max) + Number(target.style.width.slice(0, -2));
    console.log(input.max);
  }
  if (target.classList.contains("block")) {
    target.classList.add("selected");
  }
};

saveBtn.addEventListener("click", addBlock);
input.addEventListener("input", handleMaxValue);
blocksContainer.addEventListener("click", handleBlockClick);
