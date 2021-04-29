let store = document.getElementById('store');

/*La fonction getProducts récupère les différents produits sur le serveur
et renvoie les produits dans la variable products */
const getProducts = async function(){
    let response = await fetch ("http://localhost:3000/api/furniture")
    let products = await response.json();
    return products;
}

/*La fonction showProduct récupère la variable products depuis la fonction getProducts
et génère du HTML pour créer i vignettes produit dans la div #store */ 
const showProduct =async ()=> {
    let products = await getProducts();
    for(let i in products){
        store.innerHTML +=(
                `
            <a class="productItem p-${i}">
                <img class="productImg" src=${products[i].imageUrl} />
                <h2 class="productName descriptionStyle">${products[i].name}</h2>
                <div class="productInfo ">
                    <p class="productId">(Référence : ${products[i]._id})</p>
                    <p class="productDescription descriptionStyle">${products[i].description}</p>
                    <p class="productPrice descriptionStyle">${products[i].price} €</p>
                </div>
            </a>
                `
        )
    }
}

showProduct();





