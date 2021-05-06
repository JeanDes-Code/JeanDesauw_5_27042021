let storedPanier = JSON.parse(localStorage.getItem('panier'));
let panierItem = document.getElementById("panierItem");
let panierTotal = document.getElementById("panierTotal");
let totalPrice=0;
let totalNumber=0;
console.log(storedPanier);
console.log("Le tableau est de type " + typeof storedPanier);

const buildPanier =() =>{
    for (let i in storedPanier){
        panierItem.innerHTML += (
            `
            <div class="panierRow R-${i}">
                <strong class="column names name-${i}">${storedPanier[i].name}</strong>
                <strong class="column varnish-${i}">${storedPanier[i].vernis}</strong>
                <strong class="column itemQuantity quantity-${i}">${storedPanier[i].quantity}</strong>
                <strong class="column price-${i}">${storedPanier[i].total} € </strong>
            </div>
            `
        );

        totalPrice += parseInt(storedPanier[i].total,10);
        totalNumber += parseInt(storedPanier[i].quantity,10);
    }
    panierTotal.innerHTML = (
        `
        <h2 class="column names itemImportantInformation">Total :</h2>
        <strong class="column"> </strong>
        <strong class="column itemQuantity "> ${totalNumber} </strong>
        <strong class="column">${totalPrice} € </strong>
        `
    )
}

buildPanier();
console.log(totalPrice+" "+totalNumber);