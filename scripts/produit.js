
import { getElement } from "./requete.js"

/*
Cette fonction prend 3 paramètres.
#1 on récupère l'élement du DOM portant le paramètre id
#2 Si concat est à true, on selectionne sa value et on y ajoute le paramètre value.
#3 Puis on modifie la value de l'élément selectionné = variable value concaténée.

Utile pour calculer le prix total du panier.

const setEltAlt = (id, value, concat) => {
    const elt = document.getElementById(id)

    if (concat) {
        value += elt.attr.value
    }

    elt.attr.value = value
}
*/

//Construction de la page grâce aux informations récupérées grâce à getElement()
const onLoadCallback = async () => {

    const productDetail = await getElement();

    let titre = productDetail.name;
    let prix = productDetail.price;
    let serial = productDetail._id;
    let image = document.getElementById("itemImg");
    let vernis = productDetail.varnish;
    let select = document.getElementById("vernis");


    // ---- DEBUT CONSTRUCTION DE LA PAGE
    image.setAttribute("src", productDetail.imageUrl);
    image.setAttribute("alt", "image du produit : " + titre);

    document
        .getElementById("itemName")
        .innerHTML = (`${titre}`);

    document
        .getElementById("itemId")
        .innerHTML = (`(Identifiant produit : ${serial})`);

    document
        .getElementById("itemDescription")
        .innerHTML = (`${productDetail.description}`);

    document
        .getElementById("itemPrice")
        .innerHTML = (`${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)}`);

    for (let element in vernis) {

        select.innerHTML += (
            `
            <option value='${vernis[element]}'>${vernis[element]}</option>
            `
        )
    };
    // ---- FIN CONSTRUCTION DE LA PAGE

    let newItem;
    let qty = document.getElementById("quantity");
    let circle = document.getElementById("circleColor");
    let selectedQuantity = qty.value;
    let selectedVarnish = select.value;

    //Permet de modifier la prévisualisation des vernis lors du choix d'un vernis.
    const varnish = () => {
        selectedVarnish = select.value.replace(' ', '');
        circle.setAttribute("class", "");
        circle.classList.add("value")
        const value = selectedVarnish.charAt(0).toLowerCase() + selectedVarnish.substr(1);
        circle.classList.add(value)
    }


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
        //Si aucun "panier" n'est enregistré en localStorage, on le crée.
        if (storedPanier === null || storedPanier === []) {
            let panier = [];
            panier.push(newItem);
            localStorage.setItem("panier", JSON.stringify(panier));
        }
        else
            //Si l'élément a ajouté existe déjà (même ID et même choix de vernis) on ajoute la quantité souhaité à l'élément existant
            if (storedPanier.find(element => element.serial == newItem.serial && element.vernis == newItem.vernis)) {
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

    //Permet de modifier la prévisualisation des vernis lors du choix d'un vernis.
    varnish();
    select.addEventListener("change", varnish);

    // Vérification en continue de la valeur de quantité
    qty.addEventListener("change", function (e) {
        return selectedQuantity = qty.value;
    });

    //permet d'ajouter l'élément sélectionné au panier lors du clic sur le bouton "ajouter au panier"
    document
        .getElementById('submit')
        .addEventListener('click', addToCart);

};

window.addEventListener('DOMContentLoaded', onLoadCallback);


