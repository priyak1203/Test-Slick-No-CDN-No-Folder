console.log("Script Loaded!!!");

// Selecting the Grid  Elements by Id
var clothingGrid = document.getElementById('clothing-grid');
var accessoryGrid = document.getElementById('accessory-grid');

// Function to Create Home Page Product Cards
// Structure of the card : 
{/* <div class="product-card"> 
	<a class="product-link" href="#"> //  
			<img class=" product-image" src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg" alt="card-thumbnail"> 
			<div class="product-meta"> // 
				<h4 class="product-name ">Men Navy Blue Solid Sweatshirt</h4> // 
				<h5 class="product-brand">United Colors of Benetton</h5>
                <p class="product-price">Rs 2599</p>
			</div>
	</a>
</div> */}

function createHomePageProductCard(obj) {
    var productCard = document.createElement('div');              // Main Div - Product-Card
    productCard.classList.add("product-card");

    var productLink = document.createElement('a');                // Making the card Clickable
    productLink.classList.add("product-link");
    productLink.href="/details.html?p="+obj.id;
    // productCard.appendChild(productLink);

    var productImage = document.createElement('img');             // Product - Image
    productImage.classList.add("product-image");
    productImage.src = obj.preview;
    productImage.alt = "#"; // Add somethng later
    productLink.appendChild(productImage);

    var productMeta = document.createElement('div');              // Product Details Container
    productMeta.classList.add("product-meta");

    var productName = document.createElement('h4');              // Product Name or Title
    productName.classList.add("product-name");
    var productNameText = document.createTextNode(obj.name);     
    productName.appendChild(productNameText); 
    
    var productBrand = document.createElement('h5');             // Product Brand Name 
    productBrand.classList.add("product-brand");
    var productBrandText = document.createTextNode(obj.brand);
    productBrand.appendChild(productBrandText);

    var productPrice = document.createElement('p');               // Product Price 
    productPrice.classList.add("product-price");
    var productPriceText = document.createTextNode("Rs " + obj.price);
    productPrice.appendChild(productPriceText);

    productMeta.appendChild(productName);  
    productMeta.appendChild(productBrand);
    productMeta.appendChild(productPrice);
    
    productLink.appendChild(productMeta);
    
    productCard.appendChild(productLink);
    // console.log(productCard);
    
    return productCard;
   
}


// Fetching the data from Backend for creating product grid
var http = new XMLHttpRequest();
http.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
http.onreadystatechange = function() {
    if(this.readyState === 4) {
        // console.log(JSON.parse( this.responseText));
        var productList = JSON.parse(this.responseText);
        //console.log(productList);
        var productItem;
        for(var i=0; i<productList.length; i++) {
            productItem =  createHomePageProductCard(productList[i]);
            if (productList[i].isAccessory === true) {
                accessoryGrid.appendChild(productItem); 
            } else {
                clothingGrid.appendChild(productItem);
            }   
        }
    }
}
http.send();

