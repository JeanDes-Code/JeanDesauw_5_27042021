
import { getProductById } from "./requete.js"


//Construction de la page grâce aux informations récupérées grâce à getElement()
const onLoadCallback = async () => {
    const serial = new URL(window.location.href).searchParams.get("_id");
    const productDetail = await getProductById(serial);
    let image = document.getElementById("itemImg");
    let select = document.getElementById("vernis");
    let qty = document.getElementById("quantity");
    let selectedQuantity = qty.value;
    let selectedVarnish = select.value;
    let newItem;


    // ---- DEBUT CONSTRUCTION DE LA PAGE
    image.setAttribute("src", productDetail.imageUrl);
    image.setAttribute("alt", "image du produit : " + productDetail.name);

    document
        .getElementById("itemName")
        .innerHTML = (`${productDetail.name}`);

    document
        .getElementById("itemId")
        .innerHTML = (`(Identifiant produit : ${productDetail._id})`);

    document
        .getElementById("itemDescription")
        .innerHTML = (`${productDetail.description}`);

    document
        .getElementById("itemPrice")
        .innerHTML = (`${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(productDetail.price)}`);

    for (let element in productDetail.varnish) {

        select.innerHTML += (
            `
            <option value='${productDetail.varnish[element]}'>${productDetail.varnish[element]}</option>
            `
        )
    };
    // ---- FIN CONSTRUCTION DE LA PAGE

    //Permet de modifier la prévisualisation des vernis lors du choix d'un vernis.
    const varnish = () => {
        let circle = document.getElementById("circleColor");
        let select = document.getElementById("vernis");
        selectedVarnish = select.value.replace(' ', '');
        circle.setAttribute("class", "");
        const value = selectedVarnish.charAt(0).toLowerCase() + selectedVarnish.substr(1);
        circle.classList.add(value)
    }


    //Création de l'objet qui sera enregistré en localstorage
    const itemInfo = () => {
        newItem = {
            name: productDetail.name,
            vernis: selectedVarnish,
            quantity: selectedQuantity,
            price: productDetail.price,
            total: parseInt(productDetail.price, 10) * parseInt(selectedQuantity),
            serial: productDetail._id
        }
        return (newItem);
    }

    //Fonction "Ajouter au panier", qui enregistre l'item sélectionné dans localstorage 
    const addToCart = () => {
        let storedPanier = JSON.parse(localStorage.getItem('panier'));
        const newItem = itemInfo();
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


