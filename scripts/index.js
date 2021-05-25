import { getProducts } from "./requete.js"

/*La fonction showProduct récupère la variable products depuis la fonction getProducts
et génère du HTML pour créer i vignettes produit dans la div #store */
const showProduct = async () => {
    let store = document.getElementById('store');
    let products = await getProducts();
    for (let i in products) {
        let prix = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(products[i].price)
        store.innerHTML += (
            `
            <a class="productItem ${i}" 
            href="pages/produit.html?_id=${products[i]._id}">
                
                <img class="productImg" src=${products[i].imageUrl} alt="image du meuble ${products[i].name}"/>
                <h2 class="productName descriptionStyle">${products[i].name}</h2>
                <div class="productInfo ">
                    <p class="productId">(Référence : ${products[i]._id})</p>
                    <p class="productDescription descriptionStyle">${products[i].description}</p>
                    <p class="productPrice descriptionStyle">${prix}</p>
                </div>
                
            </a>
            `
        )

    }
}
showProduct();

