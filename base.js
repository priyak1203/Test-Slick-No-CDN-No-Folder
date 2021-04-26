console.log("Script Loaded!!!");
console.log("Base Script Loaded!!")


var burgerIcon = document.getElementById('burger');
// console.log(burgerIcon);

var menuLinks = document.getElementById("menu-links");
// console.log(menuLinks);
var sideSearch = document.getElementById("search-wrapper")

burgerIcon.onclick = function() {
    burgerIcon.classList.toggle('toggle');
    menuLinks.classList.toggle('side-active');
    sideSearch.classList.toggle('side-active');
}



// Updating the Cart Count Value on the top-bar
var cartCount = document.getElementById('cart-count');          // Selecting the Cart Count Element 

var productList = window.localStorage.getItem('product-list');
productList = (productList === null || productList === '') ? [] : JSON.parse(productList);

var totalCount = 0;
for(var i=0; i<productList.length; i++) {
    totalCount = totalCount + productList[i].count;
}
cartCount.innerHTML = totalCount;
