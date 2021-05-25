//Construction du récapitulatif de la commande 
const buildRecap = () => {
    let order = JSON.parse(localStorage.getItem("order"));
    let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
    let formatedTotalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice);
    let contact = order.contact;

    document.getElementById('orderId').innerHTML = `${order.orderId}`
    document.getElementById('contactNames').innerHTML = `${contact.firstName} ${contact.lastName}`
    document.getElementById('contactEmail').innerHTML = `${contact.email}`
    document.getElementById('contactAddress').innerHTML =
        `
    <p>${contact.address}</p>
    <p>${contact.city}</p>
        `
    document.getElementById('totalPrice').innerHTML = ` ${formatedTotalPrice} `
}

window.addEventListener('DOMContentLoaded', buildRecap);