
/*
**Construction en cours 


let store = document.getElementById('store');
let products;


const fetchProducts = async() => {
    products = await fetch('http://localhost:3000/api/furniture')
    .then(res => res.json());
}


const showProducts = async() => {
    await fetchProducts();

    store.innerHTML =(
        products
            .filter(product => product.name)
            .map(product => (
                `
                    <a class="productItem">
                        <img class="productImg" src="${product.imageUrl}" />
                        <h2 class="productName">${product.name}</h2>
                        <div class="productInfo">
                            <p class="productId">Reference : ${product._id}</p>
                            <p class="productDescription">${product.description}</p>
                            <p class="productPrice">${product.price} EUR</p>
                        </div>
                        <select class="varnishSelect">
                            <optgroup label="Vernis">
                                <option>${product.varnish}</option>
                            </optgroup>
                        </select>
                    </a>
                `
            ))
            .join('')
    );
};

**
*/



let store = document.getElementById('store');
let numberOfProducts = 5;

for (let i=0; i<numberOfProducts; i++) {
    store.innerHTML +=
    `
    <a class="productItem">
        <img class="productImg" src="../images/oak_1.jpg" />
        <h2 class="productName descriptionStyle">TITRE</h2>
        <div class="productInfo descriptionStyle">
            <p class="productId">(Reference : 645322324445)</p>
            <p class="productDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="productPrice">7500 EUR</p>
        </div>
    </a>
    `;
    
};
