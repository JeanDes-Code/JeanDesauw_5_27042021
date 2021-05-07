let storedPanier = JSON.parse(localStorage.getItem('panier'));
let panierItem = document.getElementById("panierItem");
let panierTotal = document.getElementById("panierTotal");
let totalPrice = 0;
let totalNumber = 0;

/*Cette fonction construit le panier en récupérant les informations présente sur le local storage */
const buildPanier = () => {
    /*Si le panier est vide on affiche un message*/
    if (storedPanier === null || storedPanier === []) {
        panierTotal.innerHTML = (
            `
            <strong class="emptyCart"> Votre panier est actuellement vide. </strong>
            `
        )
    } else {
        //on affiche le panier 
        for (let i in storedPanier) {
            let formatedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(storedPanier[i].price)
            panierItem.innerHTML += (
                `
                <div class="panierRow R-${i}">
                    <p class="item column names name-${i}">${storedPanier[i].name}</p>
                    <p class="item column varnish-${i}">${storedPanier[i].vernis}</p>
                    <p class="item column itemQuantity quantity-${i}">${storedPanier[i].quantity}</p>
                    <p class="item column price-${i}">${formatedPrice} </p>
                </div>
                `
            );
            /*On calcule le prix total et le nombre total d'articles */
            totalPrice += parseInt(storedPanier[i].total, 10);
            totalNumber += parseInt(storedPanier[i].quantity, 10);
        }
        //on affiche le prix total et le nombre total d'article
        let formatedTotalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice);
        panierTotal.innerHTML = (
            `
            <strong class="column names total">Total :</strong>
            <strong class="column"> </strong>
            <strong class="column itemQuantity total "> ${totalNumber} </strong>
            <strong class="column total">${formatedTotalPrice}</strong>
            `
        )
    }

}

buildPanier();


let placeOrder = document.getElementById('placeOrder');
let getBack = document.getElementById('getBack');
let form = document.getElementById('form');
let panier = document.getElementById('panier');

/* Cette fonction permet d'afficher le formulaire de commande mais seulement si le panier n'est pas vide */
const formToggle = () => {
    if (storedPanier === null || storedPanier === []) {
        alert("⚠️ Votre panier est vide ! ⚠️");
    } else {
        getBack.classList.remove("hidden");
        form.classList.remove("hidden");
        panier.classList.add("hidden");
    }
}

placeOrder.addEventListener('click', formToggle);

/* Cette fonction permet un retour en arrière lorsque l'utilisateur a ouvert le formulaire par erreur */
const formDisable = () => {
    panier.classList.remove("hidden");
    form.classList.add("hidden");
    getBack.classList.add("hidden");
}


getBack.addEventListener('click', formDisable);

// Création des objets qui seront envoyés au serveur via l'API


let submitBtn = document.getElementById('submitBtn');
let itemList = [];
for (let i in storedPanier){
    itemList.push(storedPanier[i].serial);
}

const submitOrder= async function (){
    let data = {
        contact : {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value
            },
        products : itemList
    }
    console.log(data);
    let response  = await fetch("http://localhost:3000/api/furniture/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((order) => {
        console.log(order);
        localStorage.clear("panier");
        localStorage.setItem("order", JSON.stringify(order))
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
        window.location.pathname= '../pages/order.html';
    })
    .catch(() => console.log("Problème de communications avec le serveur"));
}



//Fonction permettant de vider le panier
const resetCart = () => {
    localStorage.clear("panier");
    window.location.reload();
}
