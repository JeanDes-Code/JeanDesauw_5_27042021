let storedPanier = JSON.parse(localStorage.getItem('panier'));
let panierItem = document.getElementById("panierItem");
let panierTotal = document.getElementById("panierTotal");
let totalPrice=0;
let totalNumber=0;

console.log(storedPanier);

const buildPanier =() =>{
    if (storedPanier === null || storedPanier === []){
        panierTotal.innerHTML = (
            `
            <strong class="emptyCart"> Votre panier est actuellement vide. </strong>
            `
        )
    }else{
        for (let i in storedPanier){
            price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(storedPanier[i].total);
            panierItem.innerHTML += (
                `
                <div class="panierRow R-${i}">
                    <p class="item column names name-${i}">${storedPanier[i].name}</p>
                    <p class="item column varnish-${i}">${storedPanier[i].vernis}</p>
                    <p class="item column itemQuantity quantity-${i}">${storedPanier[i].quantity}</p>
                    <p class="item column price-${i}">${price} </p>
                </div>
                `
            );
    
            totalPrice += parseInt(storedPanier[i].total,10);
            totalNumber += parseInt(storedPanier[i].quantity,10);
        }
        totalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice)
        panierTotal.innerHTML = (
            `
            <strong class="column names total">Total :</strong>
            <strong class="column"> </strong>
            <strong class="column itemQuantity total "> ${totalNumber} </strong>
            <strong class="column total">${totalPrice}</strong>
            `
        )
    }   
    
}

buildPanier();


//Fonction permettant de vider le panier
const resetCart = () =>{
    localStorage.clear("panier");
    window.location.reload();
}
