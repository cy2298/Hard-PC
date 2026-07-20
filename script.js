const allProducts=[
     {
        name: "RTX 3060", category:"Graphics Cards",price:21750,
        image:"images/rtx 3060.png"
     },
     {
        name: "Ryzen 5", category:"Processors",price:6500,
        image:"images/ryzen 5.png"
     },
     {
        name: "Corsair Ram", category:"RAM",price:25830,
        image:"images/cossair.png"
     },
     {
        name: "ASUS ROG Motherboard", category:"Motherboards",price:18295,
        image:"images/rog.png"
     },
     {
        name: "Samsung 2TB SSD", category:"SSD",price:3970,
        image:"images/sam.png"
     },
     {
        name: "Logitech Gaming Mouse", category:"Gaming Mouse",price:4595,
        image:"images/logi.png"
     },
     {
        name: "Redragon Mechanical Gaming Keyboard", category:"Mechanical Keyboard",price:1395,
        image:"images/red.png"
     },
     {
        name: "Logitech Wireless Gaming Headset", category:"HeadSets",price:5995,
        image:"images/logit.png"
     }
];

let selectedCategory = "All";

let cart = [];

const sectionTitle = document.querySelector(".section-title");

const productGrid = document.getElementById("productGrid");

const cartBox = document.querySelector(".cart-box");

const cartButton = document.getElementById("cart");

const searchBar = document.getElementById("search");

const categories = document.querySelectorAll(".category");

function displayProducts(){

    const searchText = searchBar.value.toLowerCase();

    productGrid.innerHTML="";

    const filteredProducts = allProducts.filter(function(product){

        const categoryMatch = selectedCategory === "All" ||

        product.category === selectedCategory;

        const searchMatch = product.name.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;

    });

    createProductCards(filteredProducts);

}

function createProductCards(productList){

    productGrid.innerHTML="";

    productList.forEach(function(product){

        const index = allProducts.indexOf(product);

        productGrid.innerHTML += `

        <div class="card" onclick="showProductDetails(${index})">

            <img src="${product.image}" alt="${product.name}">

            <div class="info">

                <h3>${product.name}</h3>

                <p>₱${product.price.toLocaleString()}</p>

                <button class="buy" onclick="event.stopPropagation(); addTocart(${index})">

                Add to Cart

                </button>

            </div>

        </div>

        `;

    });

}

function displayProductsByCategories(categoryList){

    const searchText = searchBar.value.toLowerCase();

    const filteredProducts = allProducts.filter(function(product){

        return categoryList.includes(product.category) &&

        product.name.toLowerCase().includes(searchText);

    });

    createProductCards(filteredProducts);

}

searchBar.addEventListener("input", function(){

    if(selectedCategory === "Components"){

        displayProductsByCategories([

            "Graphics Cards",

            "Processors",

            "RAM",

            "Motherboards",

            "SSD"

        ]);

    }

    else if(selectedCategory === "Peripherals"){

        displayProductsByCategories([

            "Gaming Mouse",

            "Mechanical Keyboard",

            "HeadSets"

        ]);

    }

    else if(selectedCategory === "Gaming"){

        displayProductsByCategories([

            "Gaming Mouse",

            "Mechanical Keyboard",

            "HeadSets",

            "Graphics Cards"

        ]);

    }

    else if(selectedCategory === "Deals"){

        const searchText = searchBar.value.toLowerCase();

        const filteredProducts = allProducts.filter(function(product){

            return product.price <= 6500 &&

            product.name.toLowerCase().includes(searchText);

        });

        createProductCards(filteredProducts);

    }

    else{

        displayProducts();

    }

});

categories.forEach(function(category){

    category.addEventListener("click",function(){

        selectedCategory = this.dataset.category;

        sectionTitle.textContent = selectedCategory;

        displayProducts();

        window.scrollTo({

            top: document.querySelector(".section-title").offsetTop - 100,

            behavior:"smooth"

        });

    });

});

document.querySelectorAll("nav a")[0].addEventListener("click",function(event){

    event.preventDefault();

    selectedCategory = "All";

    sectionTitle.textContent = "Featured Products";

    displayProducts();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

document.querySelectorAll("nav a")[1].addEventListener("click",function(event){

    event.preventDefault();

    selectedCategory = "Components";

    sectionTitle.textContent = "Components";

    displayProductsByCategories([

        "Graphics Cards",

        "Processors",

        "RAM",

        "Motherboards",

        "SSD"

    ]);

});

document.querySelectorAll("nav a")[2].addEventListener("click",function(event){

    event.preventDefault();

    selectedCategory = "Peripherals";

    sectionTitle.textContent = "Peripherals";

    displayProductsByCategories([

        "Gaming Mouse",

        "Mechanical Keyboard",

        "HeadSets"

    ]);

});

document.querySelectorAll("nav a")[3].addEventListener("click",function(event){

    event.preventDefault();

    selectedCategory = "Gaming";

    sectionTitle.textContent = "Gaming";

    displayProductsByCategories([

        "Gaming Mouse",

        "Mechanical Keyboard",

        "HeadSets",

        "Graphics Cards"

    ]);

});

document.querySelectorAll("nav a")[4].addEventListener("click",function(event){

    event.preventDefault();

    selectedCategory = "Deals";

    sectionTitle.textContent = "Deals";

    const filteredProducts = allProducts.filter(function(product){

        return product.price <= 6500;

    });

    createProductCards(filteredProducts);

});

document.querySelector(".hero button").addEventListener("click",function(){

    selectedCategory = "All";

    sectionTitle.textContent = "Featured Products";

    displayProducts();

    document.getElementById("productGrid").scrollIntoView({

        behavior:"smooth"

    });

});

function addTocart(index){

    cart.push(allProducts[index]);

    updateCart();

}

function updateCart(){

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML="";

    let total = 0;

    cart.forEach(function(item,index){

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            ${item.name}

            <p>₱${item.price.toLocaleString()}</p>

            <button onclick="removeItem(${index})">

            Remove

            </button>

        </div>

        `;

    });

    if(cart.length === 0){

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }

    cartItems.innerHTML += `

        <hr>

        <h3>Total: ₱${total.toLocaleString()}</h3>

    `;

    document.getElementById("cartCount").textContent=cart.length;

}

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

cartButton.addEventListener("click",function(){

    if(cartBox.style.display === "block"){

        cartBox.style.display = "none";

    }

    else{

        cartBox.style.display = "block";

    }

});

cartButton.addEventListener("mouseenter",function(){

    cartBox.style.display = "block";

});

cartButton.addEventListener("mouseleave",function(){

    setTimeout(function(){

        if(!cartBox.matches(":hover")){

            cartBox.style.display = "none";

        }

    },100);

});

cartBox.addEventListener("mouseenter",function(){

    cartBox.style.display = "block";

});

cartBox.addEventListener("mouseleave",function(){

    setTimeout(function(){

        if(!cartButton.matches(":hover")){

            cartBox.style.display = "none";

        }

    },100);

});

const productModal = document.getElementById("productModal");

const productDetails = document.getElementById("productDetails");

const closeModal = document.querySelector(".close");

function showProductDetails(index){

    const product = allProducts[index];

    productDetails.innerHTML = `

        <img src="${product.image}" alt="${product.name}">

        <h2>${product.name}</h2>

        <p>Category: ${product.category}</p>

        <h3>₱${product.price.toLocaleString()}</h3>

        <p>This product is available for your PC setup and gaming needs.</p>

        <br>

        <button class="buy" onclick="addTocart(${index})">

        Add to Cart

        </button>

    `;

    productModal.style.display = "flex";

}

closeModal.addEventListener("click",function(){

    productModal.style.display = "none";

});

window.addEventListener("click",function(event){

    if(event.target === productModal){

        productModal.style.display = "none";

    }

});

document.getElementById("contactForm").addEventListener("submit",function(event){

    event.preventDefault();

    document.getElementById("contactMessageResult").textContent =

    "Thank you for contacting HardPC! Your message has been received.";

    this.reset();

});

displayProducts();

updateCart();