// start button
document.querySelector('.start-screen span').onclick = () => {
    let user = prompt('Please Enter Your Name.');
    if (user === '' || user === ' ') {
        document.querySelector('.player-name span').textContent = "Unknown";
    } else {
        document.querySelector('.player-name span').textContent = user;
    }
    document.querySelector('.start-screen').remove();
}

// get all block
let blocksConatiner = document.querySelector('.game-container');
let blocks = Array.from(blocksConatiner.children);
// console.log(blocks)
// create range from blocks to change block order
let range = [...Array(blocks.length).keys()];
// console.log(range);

let duration = 1000;

// define shuffle function

function shuffle(range) {
    let random = 0;
    let tmp = 0;
    for (let i = 0; i < range.length; i++) {
        random = Math.floor(Math.random() * range.length);
        tmp = range[i];
        range[i] = range[random];
        range[random] = tmp;
    }
}

shuffle(range);

blocks.forEach((block, i) => {
    block.style.order = range[i];
    block.addEventListener('click', () => {
        flipBlock(block)
    })
})

function flipBlock(block) {
    block.classList.add('is-flipped');
    let flippedBlocks = blocks.filter(block => block.classList.contains('is-flipped'));
    if (flippedBlocks.length === 2) {
        stopClick();
        matchingBlocks(flippedBlocks[0], flippedBlocks[1]);
    }

}

function stopClick() {
    blocksConatiner.classList.add('stop-click');
    setTimeout(() => {
        blocksConatiner.classList.remove('stop-click');
    }, duration)

}
function matchingBlocks(firstBLock, secondBlock) {
    if (firstBLock.dataset.technology === secondBlock.dataset.technology) {
        firstBLock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBLock.classList.add('is-matched');
        secondBlock.classList.add('is-matched');
    } else {
        let tries = document.querySelector('.tries span');
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            firstBLock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);

    }
}
