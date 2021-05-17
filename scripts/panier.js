let storedPanier = JSON.parse(localStorage.getItem('panier'));
let panierTotal = document.getElementById("panierTotal");
let totalPrice = 0;
let data;


/*Cette fonction construit le panier en récupérant les informations présente sur le local storage */
const buildPanier = () => {
    /*Si le panier est vide on affiche un message*/
    let totalNumber = 0;
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
            document.getElementById("panierItem").innerHTML += (
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
    let itemList = [];

    //création d'un tableau contenant les inputs
    let inputs = [
        document.getElementById('firstName').value,
        document.getElementById('lastName').value,
        document.getElementById('address').value,
        document.getElementById('city').value,
    ];

    let error = document.getElementById('error');
    //Validation des saisies utilisateurs 
    for (let i = 0; i < inputs.length; i++) {
        // on vérifie que les inputs ne contiennent pas uniquement des nombres
        if (!isNaN(inputs[i])) {
            erreur = "Veuillez vérifiez votre addresse."
        }
    };
    // Si une erreur est détectée, affichage de l'erreur
    if (erreur) {
        error.innerHTML = erreur;
        return false;
    } // Si aucune erreur n'est détectée on crée l'objet "data" qui sera envoyé au serveur (POST) 
    else {
        for (let i in storedPanier) {
            itemList.push(storedPanier[i].serial);
        }
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
            localStorage.setItem("order", JSON.stringify(order))
            localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
            window.location.pathname = '../pages/order.html';
        })
        .catch(() => console.log("Problème de communications avec le serveur"));
}

const submitForm = (form) => {
    checkForm();

    if (data) {
        submitOrder();
        localStorage.clear("panier");
    }
    else {
        alert("Nous avons rencontré un problème de connection avec le serveur. Veuillez réessayez plus tard.")
    }

}

//Listeners
document.getElementById('placeOrder').addEventListener('click', formToggle);
document.getElementById('getBack').addEventListener('click', formDisable);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitForm();
});

//Call functions
buildPanier();
