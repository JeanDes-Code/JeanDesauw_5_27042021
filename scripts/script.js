let store = document.getElementById('store');

//travail sur l'affichage dynamique depuis le serveur//


const getProducts = async function(){
    let response = await fetch ("http://localhost:3000/api/furniture")
    let products = await response.json();
    /*for (let i in products){
        console.log(products[i].imageUrl)
        console.log(products[i].name)
        console.log(products[i]._id);
        console.log(products[i].price);
        console.log(products[i].description);
        for(let j in products[i].varnish){
            console.log(products[i].varnish[j]);
        }
    }*/
    return products;
}

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





