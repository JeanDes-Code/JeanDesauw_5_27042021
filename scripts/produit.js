/*La fonction onLoadCallback les informations du produit choisi par l'utilisateur 
énère du HTML pour créer i vignettes produit dans la div #store */
const onLoadCallback = function(event){
    
    let titre = new URL(window.location.href).searchParams.get("name");
    let prix = new URL(window.location.href).searchParams.get("price");
    let serial = new URL(window.location.href).searchParams.get("_id");
    let description = new URL(window.location.href).searchParams.get("description");
    let image=new URL(window.location.href).searchParams.get("imageUrl");
    let vernis=new URL(window.location.href).searchParams.get("vernis");
    
    let product = document.getElementById('productSheet') 
    product.innerHTML=(
        `<article class="itemCard" >
                <img class="itemImg" src=${image} />
                <div class="columnDescription itemStyle">
                    <h1 class = "itemName"> ${titre} </h1>
                    <p class="itemId">(<strong>Référence :</strong> ${serial})</p>
                    <p class="itemDescription ">${description}</p>
                    <div class="itemVarnish itemImportantInformation">
                        <p>Vernis disponibles :</p>
                        <select class="vernis" required> 
                            <option>A</option>
                            <option>B</option>
                        </select>
                    </div>
                    <div class="itemOrder">
                        <p class="itemPrice itemImportantInformation ">${prix} €</p>
                        <div class="orderInfo">
                            <input type="number" class="itemQuantity itemImportantInformation" name="quantity" required min="0" max="10" value ="0">
                            <button class="itemAdd itemImportantInformation">Ajouter au panier</button>
                        </div>
                    </div>
                </div>

        </article>`)
};

window.addEventListener('DOMContentLoaded', onLoadCallback);

