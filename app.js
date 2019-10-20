'use strict';
function Product(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    Product.all.push(this);
  }
Product.roundCtr = 0;
Product.roundLimit = 25;
Product.all = [];
Product.container = document.getElementById('product-container');
Product.leftImage = document.getElementById('left-image');
Product.centerImage = document.getElementById('center-image');
Product.rightImage = document.getElementById('right-image');

Product.leftTitle = document.getElementById('left-title');
Product.centerTitle = document.getElementById('center-title');
Product.rightTitle = document.getElementById('right-title');
Product.leftObject = null;
Product.centerObject = null;
Product.rightObject = null;
new Product('bag', 'image/bag.jpg');
new Product('banana', 'image/banana.jpg');
new Product('bathroom', 'image/bathroom.jpg');
new Product('boots', 'image/boots.jpg');
new Product('breakfast', 'image/breakfast.jpg');
new Product('bubblegum', 'image/bubblegum.jpg');
new Product('chair', 'image/chair.jpg');
new Product('cthulhu', 'image/cthulhu.jpg');
new Product('dog-duck', 'image/dog-duck.jpg');
new Product('dragon', 'image/dragon.jpg');
new Product('pen', 'image/pen.jpg');
new Product('pet-sweep', 'image/pet-sweep.jpg');
new Product('scissors', 'image/scissors.jpg');
new Product('shark', 'image/shark.jpg');
new Product('sweep', 'image/sweep.png');
new Product('tauntaun', 'image/tauntaun.jpg');
new Product('unicorn', 'image/unicorn.jpg');
new Product('usb', 'image/usb.gif');
new Product('water-can', 'image/water-can.jpg');
new Product('win-glass', 'image/wine-glass.jpg');
function renderNewProduct() {

    // ensure that previous goats not shown on next round
    var forbidden = [Product.leftObject , Product.centerObject ,Product.rightObject ];
  
    do {
  
        Product.leftObject = getRandomProduct();
  
    } while (forbidden.includes(Product.leftObject))
  
    // add left goat to forbidden list so we don't double up
    forbidden.push(Product.leftObject);
  
    do {
  
        Product.centerObject = getRandomProduct();
  
    } while(forbidden.includes( Product.centerObject));
  
    do {
  
        Product.rightObject = getRandomProduct();
  
    } while(forbidden.includes( Product.rightObject ));
    
    
    Product.leftObject.shownCtr++;
    Product.centerObject.shownCtr++;
    Product.rightObject.shownCtr++;

  
    var leftProductImageElement = Product.leftImage;
    var centerProductImageElement = Product.centerImage;
    var rightProductImageElement = Product.rightImage;
  
    leftProductImageElement.setAttribute('src', Product.leftObject.src);
    leftProductImageElement.setAttribute('alt', Product.leftObject.title);
    centerProductImageElement.setAttribute('src', Product.centerObject.src);
    centerProductImageElement.setAttribute('alt', Product.centerObject.title);
    rightProductImageElement .setAttribute('src', Product.rightObject.src);
    rightProductImageElement .setAttribute('alt', Product.rightObject.title);
  
    Product.leftTitle.textContent = Product.leftObject.title;
    Product.centerTitle.textContent = Product.centerObject.title;
    Product.rightTitle.textContent = Product.rightObject.title;
  }


  function getRandomProduct() {
    var index = Math.floor(Math.random() * Product.all.length);
    return Product.all[index];
  }
  function randomInRange(min, max) {
    var range = max - min + 1; 
    var rand = Math.floor(Math.random() * range) + min
    return rand;
  }
  function updateTotals() {

    var body= document.getElementById('report');

    body.innerHTML = '';
    for (var i = 0; i < Product.all.length; i++) {
      var product = Product.all[i];
      var section = addElement('section', body);
      addElement('p', section, product.title+' Slicer had '+ product.clickCtr+' votes and was shown '+ product.shownCtr+' times.');
   
    }
  }
  function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if(text) {
      element.textContent = text;
    }
    return element;
  }
  function clickHandler(event) {

    var clickedId = event.target.id;
    var productClicked;
  
    if(clickedId === 'left-image') {
      productClicked = Product.leftObject;
    } else if (clickedId === 'center-image') {
      productClicked = Product.centerObject;
    }else if (clickedId === 'right-image') {
        productClicked = Product.rightObject;
      }else {
      console.log('Um, what was clicked on???', clickedId);
    }
  
    if(productClicked) {
      productClicked.clickCtr++;
      Product.roundCtr++;
  
      updateTotals();
  
      if(Product.roundCtr === Product.roundLimit) {
  
        alert('No more clicking for you!');
  
        Product.container.removeEventListener('click', clickHandler);
  
      } else {
  
        renderNewProduct();
      }
    }
  }
  Product.container.addEventListener('click', clickHandler);

  updateTotals();
  
  renderNewProduct();