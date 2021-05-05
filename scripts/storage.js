/* Local Storage : l'élément est enregistré localement sur la machine de l'utilisateur
il faudra l'effacer manuellement */
localStorage.setItem("");//enregistrer un élément dans localstorage
localStorage.getItem("");//récupérer un élément dans localstorage
localStorage.clear();//supprimer tous les élément (ou seulement celui spécifié entre parenthèses)


/*Session Storage : l'élément est enregistré pour la session de l'utilisateur 
et sera effacé si l'utilisateur ferme son navigateur*/
sessionStorage.setItem();//enregistrer un élément dans sessionstorage
sessionStorage.getItem();//récupérer un élément dans sessionstorage