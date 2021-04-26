console.log("Script Loaded!!!");
console.log("Checkout Page !!!");


// Selecting the CardList Element 
var checkoutCardList = document.getElementById('card-list');


// Function to Create Checkout Product Cards 
// Structure of the Checkout Product Card is 
{/* <div class="checkout-card">
    <div>
        <img src="" alt="" class="checkout-product-img">
    </div>
    <div>
        <h4>Product Title</h4>
        <p>x3</p>
        <p>Amount: Rs <span>30000</span></p>
    </div>
</div> */}

function renderCheckoutProductCard(obj) {

    var checkoutCard = document.createElement('div');
    checkoutCard.classList.add('checkout-card');

    var firstInnerDiv = document.createElement('div');
    var productImg = document.createElement('img');
    productImg.classList.add('checkout-product-img');
    productImg.src = obj.preview;  
    firstInnerDiv.appendChild(productImg);

    var secondInnerDiv = document.createElement('div');
    var productName = document.createElement('h4');
    productName.innerHTML = obj.name;
    var productCount = document.createElement('p');
    productCount.innerHTML = "x"+ obj.count; 

    var productAmount = document.createElement('p');
    productAmount.innerText = "Amount: Rs ";
    var amountSpan = document.createElement('span');
    amountSpan.innerHTML = parseInt(obj.price) * parseInt(obj.count);
    productAmount.appendChild(amountSpan);

    secondInnerDiv.appendChild(productName);
    secondInnerDiv.appendChild(productCount);
    secondInnerDiv.appendChild(productAmount);

    checkoutCard.appendChild(firstInnerDiv);
    checkoutCard.appendChild(secondInnerDiv);

    return checkoutCard;
    // checkoutCardList.appendChild(checkoutCard);
}
// renderCheckoutProductCard();
// renderCheckoutProductCard(); 

// Fetching Data from Local Storage to Create Checkout Cards  and calculating grand total 
var productList = window.localStorage.getItem('product-list');
productList = (productList === null || productList === '') ? [] : JSON.parse(productList);
// console.log(productList)

var grandTotal = 0;
for(var i=0; i<productList.length; i++) {
    var productCard = renderCheckoutProductCard(productList[i]); 
    checkoutCardList.appendChild(productCard);

    var currentProductTotal =parseFloat(productList[i].price)* parseFloat(productList[i].count);
    grandTotal = grandTotal + currentProductTotal;
}


// Updating the Total Items count 
var itemsCount = document.getElementById('item-count');
itemsCount.innerHTML = productList.length;

// Updating the Total Amount 
var totalAmount = document.getElementById('total-amount');
totalAmount.innerHTML = grandTotal;


// Place the order on Place Order Button Click. Also send a call to the backend to place the order 
// Selecting the Place Order Button element 
var btnPlaceOrder = document.getElementById('btn-place-order'); 

btnPlaceOrder.addEventListener("click", function() {

    if(grandTotal === 0) {
        alert("Your Cart is Empty!"); 
    } else {
        btnPlaceOrder.classList.add('bigger');
        setTimeout(function() {
            btnPlaceOrder.classList.remove('bigger')
        }, 200);
    
        // alert("Place Order Clicked!!!")
    
        var orderItemList = [];
        for(var i=0; i<productList.length; i++) {
            var productObj = {
                "id" : productList[i].id,
                "brand" : productList[i].brand,
                "name" : productList[i].name,
                "price" : productList[i].price,
                "preview" : productList[i].preview,
                "isAccessory" : productList[i].isAccessory,
                "count" : productList[i].count
            };
            orderItemList.push(productObj);
        }
    
        // console.log(productList);
        // console.log(orderItemList);
    
        var dataObj = {
            amount : grandTotal,
            products : orderItemList
        }
    
        // console.log(JSON.stringify (dataObj));
    
        var http = new XMLHttpRequest();
        http.open("POST", "https://5d76bf96515d1a0014085cf9.mockapi.io/order", true);
        http.onreadystatechange = function() {
            if(this.readyState === 4) {
                window.localStorage.setItem('product-list', []);
                location.assign('./thankyou.html');
            }
        }
        http.send((dataObj));

    }
});

// http://5ee8d2c0ca595700160294ba.mockapi.io/todo
//