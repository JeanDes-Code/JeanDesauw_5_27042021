const baseUrl = "http://localhost:3000/api/furniture/"

/*La fonction getProducts récupère les différents produits sur le serveur
et renvoie les produits dans la variable products */
export const getProducts = async function () {
    let response = await fetch(baseUrl)
    let products = await response.json();
    return products;
}

// Récupération des information du produit en fonction de son ID contenu dans l'url de la page
export const getElement = async function () {
    const serial = new URL(window.location.href).searchParams.get("_id");
    let productDetail;
    let response = await fetch(baseUrl + serial)
    productDetail = await response.json();
    return productDetail;
}