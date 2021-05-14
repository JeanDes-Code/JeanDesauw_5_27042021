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
let formBox = document.getElementById('formBox');
let panier = document.getElementById('panier');

/* Cette fonction permet d'afficher le formulaire de commande mais seulement si le panier n'est pas vide */
const formToggle = () => {
    if (storedPanier === null || storedPanier === []) {
        alert("⚠️ Votre panier est vide ! ⚠️");
    } else {
        getBack.classList.remove("hidden");
        formBox.classList.remove("hidden");
        panier.classList.add("hidden");
    }
}

placeOrder.addEventListener('click', formToggle);

/* Cette fonction permet un retour en arrière lorsque l'utilisateur a ouvert le formulaire par erreur */
const formDisable = () => {
    panier.classList.remove("hidden");
    formBox.classList.add("hidden");
    getBack.classList.add("hidden");
}


getBack.addEventListener('click', formDisable);

// Création des objets qui seront envoyés au serveur via l'API

let form = document.getElementById('form');
let submitBtn = document.getElementById('submitBtn');
let itemList = [];
let data;
for (let i in storedPanier) {
    itemList.push(storedPanier[i].serial);
}

//Permet d'envoyer la commande au serveur et d'ouvrir la page de confirmation de commande
const submitOrder = async function () {
    let response = await fetch("http://localhost:3000/api/furniture/order", {
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
            window.location.pathname = '../pages/order.html';
        })
        .catch(() => console.log("Problème de communications avec le serveur"));
}


//Permet de vérifier la conformité des saisies utilisateur dans le formulaire de commande
const checkForm = () => {
    let checkWording = /[§!@#$%^&().?*":{}|<>]/g;
    let checkWordingStrict = /[0-9]/;
    let erreur;
    //création d'un tableau contenant les inputs
    //dans lesquelles les caractères spéciaux ne sont pas acceptés
    let inputs = [
        document.getElementById('firstName').value,
        document.getElementById('lastName').value,
        document.getElementById('address').value,
        document.getElementById('city').value,
    ];
    //création d'un tableau contenant toutes les inputs 
    //dans lesquelles les chiffres et les caractères spéciaux ne sont pas acceptés
    let strictInputs = [
        document.getElementById('firstName'),
        document.getElementById('lastName'),
        document.getElementById('city')
    ];
    let error = document.getElementById('error');
    //Validation des saisies utilisateurs 
    //#1 il n'y a pas de caractères spéciaux
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].match(checkWording)) {
            erreur = "Veuillez vérifiez vos informations : vous ne pouvez utiliser que des lettres, des chiffres et des tirets !"
        };
        //#1bis les inputs ne contiennent pas uniquement des nombres
        if (!isNaN(inputs[i])) {
            erreur = "Veuillez vérifiez vos informations : il semble que certaines ne sont que des nombres."
        }
    };
    //#2 il n'y a pas de chiffre
    for (let i = 0; i < strictInputs.length; i++) {
        if (strictInputs[i].value.match(checkWordingStrict)) {
            erreur = "Veuillez vérifiez votre Nom, Prénom et Ville : vous ne pouvez utiliser que des lettres et des tirets !"
        }
    };
    // Si une erreur est détectée, affichage de l'erreur
    if (erreur) {
        error.innerHTML = erreur;
        return false;
    } // Si aucune erreur n'est détectée on crée l'objet "data" qui sera envoyé au serveur (POST) 
    else {
        return data = {
            contact: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value
            },
            products: itemList
        }
    }
}
//Lors du clic sur le bouton "passer la commande" du formulaire: 
// #1 on vérifie que les saisies utilisateurs sont conformes
// #2 si elle le sont, on envoie data (post)
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkForm();
    if (data) {
        submitOrder();
    }
})

//Fonction permettant de vider le panier
const resetCart = () => {
    localStorage.clear("panier");
    window.location.reload();
}
