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
                            <input type="number" id="quantity" class="itemQuantity itemImportantInformation" name="quantity" required min="1" max="10" value ="1">
                            <button class="itemAdd itemImportantInformation" id="submit" >Ajouter au panier</button>
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


//ICI on enregistre l'élément dans le panier grâce à localStorage //
    let newItem;
    let qty = document.getElementById("quantity");
    let selectedQuantity = qty.value;
    let selectedVarnish = select.value;

// Vérification en continue de la valeur de quantité et du vernis choisi par le client
    qty.addEventListener("change",function(e){
        return selectedQuantity = qty.value;
    });

    select.addEventListener("change",function(e){
        return selectedVarnish = select.value;
    });

//Création de l'objet qui sera enregistré en localstorage
    const itemInfo = () =>{

        if (qty){
            newItem = {
                name : titre,
                vernis: selectedVarnish, 
                quantity: selectedQuantity,
                price:  prix,
                total: parseInt(prix,10)*parseInt(selectedQuantity),
                serial: serial
            }
            return(newItem);
        }
        else{
            console.log("vous devez d'abord choisir une quantité et un vernis")
        }
    }

//Fonction "Ajouter au panier", qui enregistre l'item sélectionné dans localstorage 
    const addToCart= () => {
        itemInfo();
        console.log(newItem);
        localStorage.setItem("panier", JSON.stringify(newItem))
        console.log(localStorage.getItem('panier'));
    }

    let submit = document.getElementById('submit');
    if(submit){
        submit.addEventListener('click', addToCart);
    }

};


window.addEventListener('DOMContentLoaded', onLoadCallback);