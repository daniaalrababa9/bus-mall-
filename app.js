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


    var forbidden = [Product.leftObject, Product.centerObject, Product.rightObject];

    do {

        Product.leftObject = getRandomProduct();

    } while (forbidden.includes(Product.leftObject))

    forbidden.push(Product.leftObject);

    do {

        Product.centerObject = getRandomProduct();

    } while (forbidden.includes(Product.centerObject));
    forbidden.push(Product.centerObject);

    do {

        Product.rightObject = getRandomProduct();

    } while (forbidden.includes(Product.rightObject));


    Product.leftObject.shownCtr++;
    Product.centerObject.shownCtr++;
    Product.rightObject.shownCtr++;





    $('#left-image').attr('src', Product.leftObject.src);
    $('#left-image').attr('alt', Product.leftObject.title);
    $('#center-image').attr('src', Product.centerObject.src);
    $('#center-image').attr('alt', Product.centerObject.title);
    $('#right-image').attr('src', Product.rightObject.src);
    $('#right-image').attr('alt', Product.rightObject.title);

    $('#left-title').text(Product.leftObject.title);
    $('#center-title').text(Product.centerObject.title);
    $('#right-title').text(Product.rightObject.title);
}


function getRandomProduct() {
    var index = Math.floor(Math.random() * Product.all.length);
    return Product.all[index];
}

function updateTotals() {

    $('#report').html('');

    for (var i = 0; i < Product.all.length; i++) {
        var product = Product.all[i];
        let content = `${product.title} had ${product.clickCtr} votes and was shown ${product.shownCtr} times`;
        $('#report').append(`<li class='${product.title}'> ${content}</li>`)
    }
}


$('#product-container').click(function(event) {
    var clickedId = event.target.id;
    var productClicked;
    updateclicked()

    if (clickedId === 'left-image') {
        productClicked = Product.leftObject;
    } else if (clickedId === 'center-image') {
        productClicked = Product.centerObject;
    } else if (clickedId === 'right-image') {
        productClicked = Product.rightObject;
    } else {
        console.log(' what was clicked on???', clickedId);
    }

    if (productClicked) {
        productClicked.clickCtr++;
        Product.roundCtr++;
        updateTotals()
        if (Product.roundCtr === Product.roundLimit) {
            alert('Thanks. welcome to my webpage');
            renderChart();
            renderChart2();
            updateclicked();
            updateTotals();
            $('#product-container').off('click')
        } else {
            renderNewProduct();

        }
    }
})



/////////////////////////////////////////////////////////////////////////////////////////////////

function getProductTitles() {

    var productTitles = [];

    for (var i = 0; i < Product.all.length; i++) {
        var productInstance = Product.all[i];
        productTitles.push(productInstance.title + ' clicked');

    }
    return productTitles;
}

function getClickedScore() {

    var ClickedScore = [];

    for (var i = 0; i < 20; i++) {
        var ClickedInstance = Product.all[i];
        ClickedScore.push(ClickedInstance.clickCtr);

    }
    return ClickedScore;
}

function renderChart() {

    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {

        type: 'line',

        data: {
            labels: getProductTitles(),

            datasets: [{
                label: 'Products',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: getClickedScore(),
            }]
        },
        options: {}
    })
}


function getProductTitles2() {

    var productTitles = [];

    for (var i = 0; i < Product.all.length; i++) {
        var productInstance = Product.all[i];
        productTitles.push(productInstance.title + ' shown');

    }
    return productTitles;
}

function getShownNumber() {

    var shownScore = [];

    for (var i = 0; i < Product.all.length; i++) {
        var shownInstance = Product.all[i];
        shownScore.push(shownInstance.shownCtr);

    }
    return shownScore;
}

function renderChart2() {

    var ctx = document.getElementById('theotherone').getContext('2d');

    var chart = new Chart(ctx, {

        type: 'line',

        data: {
            labels: getProductTitles2(),

            datasets: [{
                label: 'Products',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: getShownNumber(),
            }]
        },
        options: {}
    })
}




/////////////////////////////////////////////////////////////////////////////////////////////////

function updateclicked() {
    var dataString = JSON.stringify(Product.all);
    localStorage.setItem('reports', dataString);
}

function getClicked() {
    var data = localStorage.getItem('reports');
    var dataOriginal = JSON.parse(data);
    if (dataOriginal) {
        for (var i = 0; i < dataOriginal.length; i++) {
            var rawObject = dataOriginal[i];
            var currentProduct = Product.all[i];
            currentProduct.clickCtr = rawObject.clickCtr;
            currentProduct.shownCtr = rawObject.shownCtr;



        }
        console.log('rawobject', dataOriginal[0].clickCtr);
        console.log('product', Product.all[0].clickCtr);

        renderNewProduct();
    }
}

renderNewProduct();

getClicked();