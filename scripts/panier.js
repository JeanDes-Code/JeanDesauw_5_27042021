import { submitOrder } from "./requete.js"
let totalPrice = 0;
let storedPanier = JSON.parse(localStorage.getItem('panier'));

/*Cette fonction construit le panier en récupérant les informations présente sur le local storage */
const buildPanier = () => {
    /*Si le panier est vide on affiche un message*/
    let totalNumber = 0;
    let panierTotal = document.getElementById("panierTotal");
    let vernis;
    if (storedPanier === null || storedPanier === []) {
        panierTotal.innerHTML = (
            `
            <strong class="emptyCart"> Votre panier est actuellement vide. </strong>
            `
        )
    } else {
        //on affiche le panier 

        for (let i in storedPanier) {
            vernis = storedPanier[i].vernis.replace(/([a-z])([A-Z])/g, '$1 $2'); // <--Permet d'ajouter un espace aux noms de vernis lorsqu'ils sont affichés dans le panier
            let formatedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(storedPanier[i].price)
            document.getElementById("panierItem").innerHTML += (
                `
                <div class="panierRow R-${i}">
                    <p class="item column names name-${i}">${storedPanier[i].name}</p>
                    <p class="item column varnish-${i}">${vernis}</p>
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

//Fonction permettant de vider le panier
const resetCart = () => {
    localStorage.clear("panier");
    window.location.reload();
}

/* Cette fonction permet d'afficher le formulaire de commande mais seulement si le panier n'est pas vide */
const formToggle = () => {
    if (storedPanier === null || storedPanier === []) {
        alert("⚠️ Votre panier est vide ! ⚠️");
    } else {
        document.getElementById('getBack').classList.remove("hidden");
        document.getElementById('formBox').classList.remove("hidden");
        document.getElementById('panier').classList.add("hidden");
    }
}

/* Cette fonction permet un retour en arrière lorsque l'utilisateur a ouvert le formulaire par erreur */
const formDisable = () => {
    document.getElementById('panier').classList.remove("hidden");
    document.getElementById('formBox').classList.add("hidden");
    document.getElementById('getBack').classList.add("hidden");
}

//Permet de vérifier la conformité des saisies utilisateur dans le formulaire de commande
const checkForm = () => {
    let erreur;

    if (!isNaN(document.getElementById('address').value)) {
        erreur = "Veuillez vérifiez votre addresse."
        document.getElementById('error').innerHTML = erreur;
        return false;
    }
    return true
}

//Permet d'envoyer la commande au serveur et d'ouvrir la page de confirmation de commande
const submitForm = async () => {
    const isValid = checkForm();

    if (isValid) {
        const itemList = [];
        for (let i in storedPanier) {
            itemList.push(storedPanier[i].serial);
        }
        const data = {
            contact: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value
            },
            products: itemList
        }
        const order = await submitOrder(data)
        localStorage.setItem("order", JSON.stringify(order))
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
        window.location.pathname = '../pages/order.html';
        localStorage.removeItem("panier");
    }
    else {
        alert("Il semble y avoir un problème dans vos informations, veuillez les vérifiez de nouveau.")
    }
}

//Listeners
document.getElementById('resetCart').addEventListener('click', resetCart);
document.getElementById('placeOrder').addEventListener('click', formToggle);
document.getElementById('getBack').addEventListener('click', formDisable);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitForm();
});

//Call functions
window.addEventListener('DOMContentLoaded', buildPanier);
