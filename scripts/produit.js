/*La fonction onLoadCallback les informations du produit choisi par l'utilisateur 
énère du HTML pour créer i vignettes produit dans la div #store */
const onLoadCallback = function(event){
    
    let titre = new URL(window.location.href).searchParams.get("name");
    let prix = new URL(window.location.href).searchParams.get("price");
    let serial = new URL(window.location.href).searchParams.get("_id");
    let description = new URL(window.location.href).searchParams.get("description");
    let image=new URL(window.location.href).searchParams.get("imageUrl");   
    let product = document.getElementById('productSheet'); 

    product.innerHTML=(
        `<article class="itemCard" >
        
                <img class="itemImg" src=${image} alt="image du meuble ${titre}"/>
                <div class="columnDescription itemStyle">
                    <h1 class = "itemName"> ${titre} </h1>
                    <p class="itemId">(<strong>Référence :</strong> ${serial})</p>
                    <p class="itemDescription ">${description}</p>
                    <div class="itemVarnish itemImportantInformation">
                        <p>Vernis disponibles :</p>
                        <select id="vernis" class="vernis" required> 
                        </select>
                        <div id='circleColor'></div>
                    </div>
                    <div class="itemOrder">
                        <p class="itemPrice itemImportantInformation ">${prix} €</p>
                        <div class="orderInfo">
                            <input type="number" class="itemQuantity itemImportantInformation" name="quantity" required min="0" max="10" value ="0">
                            <button class="itemAdd itemImportantInformation">Ajouter au panier</button>
                        </div>
                    </div>
                </div>

        </article>`);

    let vernis=new URL(window.location.href).searchParams.get("vernis");
    let vernisArray = vernis.split(",");
    let select = document.getElementById("vernis");

    for(let element in vernisArray){
        
        select.innerHTML +=(
            `
            <option value='${vernisArray[element]}'>${vernisArray[element]}</option>
            `
        )     
    };

};



window.addEventListener('DOMContentLoaded', onLoadCallback);
