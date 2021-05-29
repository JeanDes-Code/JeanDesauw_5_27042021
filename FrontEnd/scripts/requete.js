const baseUrl = "http://localhost:3000/api/furniture/"

/*La fonction getProducts récupère les différents produits sur le serveur
et renvoie les produits dans la variable products */
export const getProducts = async function () {
    let response = await fetch(baseUrl)
    let products = await response.json();
    return products;
}

// Récupération des information du produit en fonction de son ID contenu dans l'url de la page
export const getProductById = async function (serial) {
    let response = await fetch(baseUrl + serial)
    return await response.json();;
}

// Envoie de l'objet data au serveur : informations de commande. Retour d'une promesse.
export const submitOrder = async function (data) {
    return fetch(baseUrl + "order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch(() => alert("Problème de communications avec le serveur"));
}