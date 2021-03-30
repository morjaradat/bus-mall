'use strict';
const names = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
const imageSection = document.getElementById('image-section');
const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const middleImage = document.getElementById('middle-image');
const buttomSection = document.getElementById('buttom-section');
let vote = [];
let view = [];
let indexArray=[];
let leftIndex;
let middleIndex;
let rightIndex;
let buttom = document.createElement('button');
buttom.setAttribute('id', 'result-button');
buttomSection.appendChild(buttom);
buttom.textContent = ('view result');
document.getElementById('result-button').style.visibility = 'hidden';


function Busmall(name) {
  this.name = name;
  this.path = `./assets/${name}`;
  this.vote = 0;
  this.view = 0;
  Busmall.all.push(this);
  // settingItem();
}
Busmall.all = [];

function settingItem(){
  let data =JSON.stringify(Busmall.all);
  localStorage.setItem('product',data);
  // sessionStorage.setItem('product',data);
}

function gettingItem(){
  let stringObj=localStorage.getItem('product');
  let normalObj=JSON.parse(stringObj);
  if (normalObj !== null){
    Busmall.all =normalObj;
  }
  // render();
}

for (let i = 0; i < names.length; i++) {
  new Busmall(names[i]);
}
// console.log(Busmall);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render() {

  leftIndex = randomNumber(0, Busmall.all.length - 1);
  middleIndex = randomNumber(0, Busmall.all.length - 1);
  rightIndex = randomNumber(0, Busmall.all.length - 1);

  if (leftIndex===middleIndex||leftIndex===rightIndex||middleIndex===rightIndex){
    render();
    // console.log('no',leftIndex,middleIndex,rightIndex);
  }else if (indexArray.includes(rightIndex)||indexArray.includes(middleIndex)||indexArray.includes(leftIndex)){
    render();
    // console.log('check',rightIndex);
  }else
  {
    indexArray=[];
    indexArray.push(leftIndex);
    indexArray.push(middleIndex);
    indexArray.push(rightIndex);
    // console.log(leftArray,middleArray,rightArray);
    // console.log(leftIndex,middleIndex,rightIndex);

    leftImage.src = Busmall.all[leftIndex].path;
    leftImage.alt = Busmall.all[leftIndex].name;
    leftImage.title = Busmall.all[leftIndex].name;

    middleImage.src = Busmall.all[middleIndex].path;
    middleImage.alt = Busmall.all[middleIndex].name;
    middleImage.title = Busmall.all[middleIndex].name;

    rightImage.src = Busmall.all[rightIndex].path;
    rightImage.alt = Busmall.all[rightIndex].name;
    rightImage.title = Busmall.all[rightIndex].name;

  }
}


render();

// check(leftArray,middleArray,rightArray);



// return leftIndex, rightIndex, middleIndex;
// console.log(leftIndex);
// console.log(middleIndex);
// console.log(rightIndex);


// while (leftIndex === middleIndex || leftIndex === rightIndex) {
//   leftIndex = randomNumber(0, Busmall.all.length - 1);
// }

// while (middleIndex === leftIndex || middleIndex === rightIndex) {
//   middleIndex = randomNumber(0, Busmall.all.length - 1);
// }

// while (rightIndex === leftIndex || rightIndex === middleIndex) {
//   rightIndex = randomNumber(0, Busmall.all.length - 1);
// }

// function check(x1,x2,x3){
//   if (leftIndex===x1||leftIndex===x3||leftIndex===x2){
//     while(leftIndex===leftArray||middleIndex===middleArray||leftIndex===rightArray||middleIndex===rightArray){
//       leftIndex = randomNumber(0, Busmall.all.length - 1);
//       middleIndex = randomNumber(0, Busmall.all.length - 1);
//       rightIndex = randomNumber(0, Busmall.all.length - 1);

//     }console.log('left', leftIndex);
//   }return leftIndex,middleIndex,rightIndex;
// }
// if(middleIndex===x1||middleIndex===x2||middleIndex===x3){
//   while(middleIndex===leftArray||middleIndex===middleArray||middleIndex===rightArray){
//     middleIndex = randomNumber(0, Busmall.all.length - 1);
//   }console.log('mid', middleIndex);
// }
// if(rightIndex===x1||rightIndex===x2||rightIndex===x3){
//   while(rightIndex===leftArray||rightIndex===middleArray||rightIndex===rightArray){
//     rightIndex = randomNumber(0, Busmall.all.length - 1);
//   }console.log('right', rightIndex);

// }



let numberOfRound = 25;
let numberOfClicks = 0;
imageSection.addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault();
  if (event.target.id !== 'image-section') {
    if (event.target.id === leftImage.id) {
      Busmall.all[leftIndex].vote++;
      Busmall.all[leftIndex].view++;
      Busmall.all[middleIndex].view++;
      Busmall.all[rightIndex].view++;
      numberOfClicks++;
    } else if (event.target.id === middleImage.id) {
      Busmall.all[middleIndex].vote++;
      Busmall.all[middleIndex].view++;
      Busmall.all[rightIndex].view++;
      Busmall.all[leftIndex].view++;
      numberOfClicks++;
    } else if (event.target.id === rightImage.id) {
      Busmall.all[rightIndex].vote++;
      Busmall.all[rightIndex].view++;
      Busmall.all[middleIndex].view++;
      Busmall.all[leftIndex].view++;
      numberOfClicks++;
    }
    render();
    // console.log(numberOfClicks);
  }
  if (numberOfClicks === numberOfRound) {
    document.getElementById('result-button').style.visibility = 'visible';
    imageSection.removeEventListener('click', handleClick);
  }

  // console.log(Busmall.all);
}
// console.log(Busmall.all);
const resultButton = document.getElementById('result-button');

resultButton.addEventListener('click', buttomList);

function buttomList(event) {
  event.preventDefault();
  const ulEle = document.createElement('ul');
  buttomSection.appendChild(ulEle);
  settingItem();
  for (let i = 0; i < Busmall.all.length; i++) {
    const liEle = document.createElement('li');
    ulEle.appendChild(liEle);
    liEle.textContent = (`${Busmall.all[i].name}: ${Busmall.all[i].vote} votes, and was seen ${Busmall.all[i].view} times`);
    vote.push(Busmall.all[i].vote);
    view.push(Busmall.all[i].view);
    resultButton.removeEventListener('click', buttomList);
    chartRender();
    // console.log('vote', vote);
    // console.log('view', view);
  }
}

function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: names,
      datasets: [{
        label: 'Products Votes',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: vote
      },
      {
        label: 'Products Views',
        backgroundColor: 'green',
        borderColor: 'rgb(255, 99, 132)',
        data: view
      }]
    },

    // Configuration options go here
    options: {}
  });
}
gettingItem();
