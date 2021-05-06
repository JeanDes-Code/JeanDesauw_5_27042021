let storedPanier = JSON.parse(localStorage.getItem('panier'));
let panierItem = document.getElementById("panierItem");
let panierTotal = document.getElementById("panierTotal");
console.log(storedPanier);
console.log("Le tableau est de type " + typeof storedPanier);


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
    )
}