console.log("Script Loaded!!!");
console.log("Details Page");


var currentObj = null;
var productId = window.location.search.split('=')[1];

// Function to remove active class from the thumbnails
function removeActiveClass() {
    var thumbnailList = document.getElementsByClassName('thumbnail');
    for(var i=0; i<thumbnailList.length; i++) {
        thumbnailList[i].classList.remove('active-image');
    }
    
}


// Function to create preview-images thumbnail 
function createPreviewThumbnail(url, pos) {
    var image = document.createElement('img');
    image.src = url;
    image.classList.add('thumbnail');

    if (pos === 0) {
        image.classList.add('active-image');
    }
   
    var mainImage = document.getElementById('product-preview-image');
    image.onclick = function() {
        mainImage.src = url;
        removeActiveClass();
        image.classList.add('active-image');
    }
    return image;   
}

// Function to render product details 
function renderProductDetails(obj) {
    var previewImage = document.getElementById('product-preview-image');
    previewImage.src = obj.preview;

    var title = document.getElementById('product-title');
    title.innerHTML = obj.name;

    var brand = document.getElementById('product-brand');
    brand.innerHTML = obj.brand;

    var priceAmount = document.getElementById('price-amount');
    priceAmount.innerHTML = obj.price;

    var description = document.getElementById('product-info-details');
    description.innerHTML = obj.description;

    var productImages = document.getElementById('product-images');

    for (var pos=0; pos< obj.photos.length; pos++) {
        var thumbnail = createPreviewThumbnail(obj.photos[pos],pos);
        productImages.appendChild(thumbnail); 
    }

}

// Fetching the data for Backend for Product Details 
var http = new XMLHttpRequest();
http.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+productId, true);
http.onreadystatechange = function() {
    if(this.readyState === 4) {
        var productDetails = JSON.parse(this.responseText);
        currentObj = productDetails;
        // console.log("The Current Object is : ");
        // console.log(currentObj);
        // console.log(productDetails);
        renderProductDetails(productDetails);
    }
} 
http.send();



/* =========================== Added from here ========================   */ 
// Add the product to the local storage on Add-to-Cart Button click and 
// update the Cart count value on TopBar 

// Selecting Add-To-Cart Button 
var btnAddToCart = document.getElementById('btn-add-to-card');
// console.log(btnAddToCart);

// Selecting Cart Count Element  
var cartCount = document.getElementById('cart-count');


// Function to add Product Data to the local Storage and update its count value. 
function addProductToLocalStorage() {
    // var myDataObj = {
    //     id : currentObj.id,
    //     name : currentObj.name,
    //     price : currentObj.price,
    //     preview: currentObj.preview
    // }

    var productList = window.localStorage.getItem('product-list');
    productList = (productList === null || productList === '') ? [] : JSON.parse(productList);

    // productList.push(obj);
    // window.localStorage.setItem('product-list', JSON.stringify(productList));
    // console.log(productList);

    var foundAtPos = -1;
    for(var i=0; i<productList.length; i++) {
        // console.log(productList[i].id); 
        if(parseInt(productList[i].id) === parseInt(currentObj.id)) {
            foundAtPos = i;
        }
    }

    if (foundAtPos > -1 ){
        productList[foundAtPos].count = productList[foundAtPos].count + 1;
        console.log(productList[foundAtPos].count);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    } else {
        currentObj.count = 1; 
        productList.push(currentObj);
        // myDataObj.count = 1;
        // productList.push(myDataObj)
        console.log(productList);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    }
    
}

// Function to calculate the Total Product Count 
function getTotalCount() {
    var productList = window.localStorage.getItem('product-list');
    productList = (productList === null || productList === '') ? [] : JSON.parse(productList);


    var totalCount = 0;
    for(var i=0; i<productList.length; i++) {
        totalCount = totalCount + productList[i].count;
    }
    cartCount.innerHTML = totalCount;
}

btnAddToCart.addEventListener("click", function(){

    btnAddToCart.classList.add('bigger');
    setTimeout(function() {
        btnAddToCart.classList.remove('bigger')
    }, 200);
        
    addProductToLocalStorage();  // Store Product Data on the Local Storage
    getTotalCount();               
});


