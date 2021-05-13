let order = JSON.parse(localStorage.getItem("order"));
let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
let formatedTotalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice);
console.log(order);


//Construction du récapitulatif de la commande 
const buildRecap = () => {
    let contact = order.contact;
    let products = order.products;
    let orderId = order.orderId;
    let recap = document.getElementById('recap');
    let address = contact.address;
    let city = contact.city;
    let email = contact.email;
    let firstName = contact.firstName;
    let lastName = contact.lastName;

    recap.innerHTML = (
        `
        <div class = "orderId">
            <h2>Identifiant de la commande : </h2>
            <p>${orderId}</p>
        </div>
        <div class = "border"></div>
        <div class = "userInfo">
            <h2>Destinataire</h2>
            <div class="recapStyle">
                <p>${firstName} ${lastName}</p>
                <p>Email : ${email}</p>
            </div>
            <h2>Adresse :</h2>
            <div class="recapStyle">
                <p>${address}</p>
                <p>${city}</p>
            </div>
        </div>
        <div class="border"></div>
        <div class="totalStyle">
            <h2>TOTAL :</h2>
            <strong class="priceTotalStyle"> ${formatedTotalPrice} </strong>
        </div>
        `
    )
}

buildRecap();