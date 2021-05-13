// Récupération des information du produit en fonction de son ID contenu dans l'url de la page
const getElement = async function () {
    const serial = new URL(window.location.href).searchParams.get("_id");
    let productDetail;
    let response = await fetch("http://localhost:3000/api/furniture/" + serial)
    productDetail = await response.json();
    return productDetail;
}


//Construction de la page grâce aux informations récupérées grâce à getElement()
const onLoadCallback = async () => {

    productDetail = await getElement();


    let titre = productDetail.name;
    let prix = productDetail.price;
    let serial = productDetail._id;
    let formatedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    let description = productDetail.description;
    let image = productDetail.imageUrl;
    let product = document.getElementById('productSheet');

    product.innerHTML = (
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
                        <div id='circleColor' class='empty'></div>
                    </div>
                    <div class="itemOrder">
                        <p class="itemPrice itemImportantInformation ">${formatedPrice}</p>
                        <div class="orderInfo">
                            <input type="number" id="quantity" class="itemQuantity itemImportantInformation" name="quantity" required min="1" max="10" value ="1">
                            <button class="btn " id="submit" > 🛒 Ajouter au panier </button>
                        </div>
                    </div>
                </div>

        </article>`);

    let vernis = productDetail.varnish;
    console.log(vernis);
    let select = document.getElementById("vernis");

    for (let element in vernis) {

        select.innerHTML += (
            `
            <option value='${vernis[element]}'>${vernis[element]}</option>
            `
        )
    };

    let newItem;
    let qty = document.getElementById("quantity");
    let circle = document.getElementById("circleColor");
    let selectedQuantity = qty.value;
    let selectedVarnish = select.value;

    // Vérification en continue de la valeur de quantité
    qty.addEventListener("change", function (e) {
        return selectedQuantity = qty.value;
    });


    //Permet de modifier la prévisualisation des vernis lors du choix d'un vernis.
    const varnish = () => {
        selectedVarnish = select.value;
        if (selectedVarnish === "Tan") {
            circle.classList.remove("empty", "tan", "chocolate", "black", "white", "darkOak", "lightOak", "teak", "mahogany");
            circle.classList.add("tan");
        }
        if (selectedVarnish === "Chocolate") {
            circle.classList.remove("empty", "tan", "chocolate", "black", "white", "darkOak", "lightOak", "teak", "mahogany");
            circle.classList.add("chocolate");
        }
        if (selectedVarnish === "Black") {
            circle.classList.remove("empty", "tan", "chocolate", "black", "white", "darkOak", "lightOak", "teak", "mahogany");
            circle.classList.add("black");
        }
        if (selectedVarnish === "White") {
            circle.classList.remove("empty", "tan", "chocolate", "black", "white", "darkOak", "lightOak", "teak", "mahogany");
            circle.classList.add("white");
        }
        if (selectedVarnish === "Dark Oak") {
            circle.classList.remove("empty", "tan", "chocolate", "black", "white", "darkOak", "lightOak", "teak", "mahogany");
            circle.classList.add("darkOak");
        }
        if (selectedVarnish === "Light Oak") {
            circle.classList.remove("empty", "tan", "chocolate", "black", "white", "darkOak", "lightOak", "teak", "mahogany");
            circle.classList.add("lightOak");
        }
        if (selectedVarnish === "Teak") {
            circle.classList.remove("empty", "tan", "chocolate", "black", "white", "darkOak", "lightOak", "teak", "mahogany");
            circle.classList.add("teak");
        }
        if (selectedVarnish === "Mahogany") {
            circle.classList.remove("empty", "tan", "chocolate", "black", "white", "darkOak", "lightOak", "teak", "mahogany");
            circle.classList.add("mahogany");
        }
        return selectedVarnish;
    }
    varnish();
    select.addEventListener("change", varnish);

    //Création de l'objet qui sera enregistré en localstorage
    const itemInfo = () => {
        newItem = {
            name: titre,
            vernis: selectedVarnish,
            quantity: selectedQuantity,
            price: prix,
            total: parseInt(prix, 10) * parseInt(selectedQuantity),
            serial: serial
        }
        return (newItem);
    }

    //Fonction "Ajouter au panier", qui enregistre l'item sélectionné dans localstorage 
    const addToCart = () => {
        let storedPanier = JSON.parse(localStorage.getItem('panier'));
        itemInfo();
        console.log(newItem);
        //Si aucun "panier" n'est enregistré en localStorage, on le crée.
        if (storedPanier === null || storedPanier === []) {
            let panier = [];
            panier.push(newItem);
            localStorage.setItem("panier", JSON.stringify(panier));
        }
        else
            //Si l'élément a ajouté existe déjà (même ID et même choix de vernis) on ajoute la quantité souhaité à l'élément existant
            if (storedPanier.find(element => element.serial == newItem.serial && element.vernis == newItem.vernis) != undefined) {

                let element = storedPanier.find(element => element.serial == newItem.serial && element.vernis == newItem.vernis)
                element.quantity = parseInt(newItem.quantity, 10) + parseInt(element.quantity, 10);
                element.total = parseInt(element.quantity, 10) * parseInt(element.price, 10);
                localStorage.setItem("panier", JSON.stringify(storedPanier));
                /*Si l'élément ajouté est différent de l'élément déjà enregistré, on l'ajoute à la suite */
            } else {
                storedPanier.push(newItem);
                localStorage.setItem("panier", JSON.stringify(storedPanier));
            }
        console.log(localStorage.getItem('panier'));
    }

    //permet d'ajouter l'élément sélectionné au panier lors du clic sur le bouton "ajouter au panier"
    let submit = document.getElementById('submit');
    if (submit) {
        submit.addEventListener('click', addToCart);
    }

};

window.addEventListener('DOMContentLoaded', onLoadCallback);