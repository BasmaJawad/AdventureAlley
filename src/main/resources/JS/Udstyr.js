const paintballCard = document.getElementById('paintball');
const lasertagCard = document.getElementById('lasertag');
const gokartBilerCard = document.getElementById('gokart-biler');
const gokartDragterHjelmeCard = document.getElementById('gokart-dragter-hjelme');

const popup1 = document.getElementById('popup1');
const popup2 = document.getElementById('popup2');
const closeButton = document.getElementById('close-button');
const closeButton2 = document.getElementById('close-button2');


paintballCard.onclick = () => {
    popup1.style.display = 'block';

};

lasertagCard.onclick = () => {
    popup2.style.display = 'block';
};

gokartBilerCard.onclick = () => {
    // show another popup div here
};

gokartDragterHjelmeCard.onclick = () => {
    // show another popup div here
};

// close buttons
closeButton.onclick = () => {
    popup1.style.display = 'none';
};

closeButton2.onclick = () => {
    popup2.style.display = 'none';
};

