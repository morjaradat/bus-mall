'use strict';
const names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
const imageSection = document.getElementById('image-section');
const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const middleImage = document.getElementById('middle-image');
const buttomSection=document.getElementById('buttom-section');
let buttom=document.createElement('button');
buttom.setAttribute('id','result-button');
buttomSection.appendChild(buttom);
buttom.textContent=('view result');
document.getElementById('result-button').style.visibility='hidden';
let leftIndex;
let middleIndex;
let rightIndex;


function Busmall(name) {
  this.name = name;
  this.path = `./assets/${name}.jpg`;
  this.vote = 0;
  this.view = 0;
  Busmall.all.push(this);
}
Busmall.all = [];
// console.log(Busmall.all);

for (let i = 0; i < names.length; i++) {
  new Busmall(names[i]);
}
// console.log(Busmall);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function render() {
  leftIndex = randomNumber(0, Busmall.all.length - 1);
  if (leftIndex !== middleIndex && leftIndex !== rightIndex){
    leftImage.src = Busmall.all[leftIndex].path;
    leftImage.alt = Busmall.all[leftIndex].name;
    leftImage.title = Busmall.all[leftIndex].name;
  }
  else{
    leftIndex = randomNumber(0, Busmall.all.length - 1);
  }

  middleIndex = randomNumber(0, Busmall.all.length - 1);
  if (middleIndex !== leftIndex && middleIndex !== rightIndex){
    middleImage.src = Busmall.all[middleIndex].path;
    middleImage.alt = Busmall.all[middleIndex].name;
    middleImage.title = Busmall.all[middleIndex].name;
  }else{
    middleIndex = randomNumber(0, Busmall.all.length - 1);
  }


  rightIndex = randomNumber(0, Busmall.all.length - 1);
  if (rightIndex !== leftIndex && rightIndex !== middleIndex){
    rightImage.src = Busmall.all[rightIndex].path;
    rightImage.alt = Busmall.all[rightIndex].name;
    rightImage.title = Busmall.all[rightIndex].name;
  }else{
    rightIndex = randomNumber(0, Busmall.all.length - 1);
  }
  // console.log(leftIndex);
  // console.log(middleIndex);
  // console.log(rightIndex);
}
render();

let numberOfClicks=0;
imageSection.addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.id !== 'image-section') {
    if (event.target.id === leftImage.id){
      Busmall.all[leftIndex].vote++;
      Busmall.all[leftIndex].view++;
      Busmall.all[middleIndex].view++;
      Busmall.all[rightIndex].view++;
      numberOfClicks++;
    }else if(event.target.id === middleImage.id){
      Busmall.all[middleIndex].vote++;
      Busmall.all[middleIndex].view++;
      Busmall.all[rightIndex].view++;
      Busmall.all[leftIndex].view++;
      numberOfClicks++;
    }else if(event.target.id === rightImage.id){
      Busmall.all[rightIndex].vote++;
      Busmall.all[rightIndex].view++;
      Busmall.all[middleIndex].view++;
      Busmall.all[leftIndex].view++;
      numberOfClicks++;
    } console.log(numberOfClicks);
  }
  if(numberOfClicks === 25){
    document.getElementById('result-button').style.visibility='visible';
  }
  render();
  // console.log(Busmall.all);
}
// console.log(Busmall.all);
const resultButton= document.getElementById('result-button');

resultButton.addEventListener('click',buttomList);

function buttomList(){
  const ulEle=document.createElement('ul');
  buttomSection.appendChild(ulEle);

  for (let i = 0; i < Busmall.all.length; i++) {
    const liEle= document.createElement('li');
    ulEle.appendChild(liEle);
    liEle.textContent=(`${Busmall.all[i].name}: ${Busmall.all[i].vote} votes, and was seen ${Busmall.all[i].view} times`);

  }
}
//   // banana had 3 votes, and was seen 5 times.
