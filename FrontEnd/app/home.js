//code pour la page d'accueil
export async function homeFunction() {
  //Récupération des données WORKS via l'API -------------------------------------
  const projects = await fetch("http://localhost:5678/api/works").then(
    (projects) => projects.json()
  );
  //Récupération du liens des boutons de la barre de filtre -------------------------------------
  const btnAll = document.getElementById("btn-all");
  const btnObject = document.getElementById("btn-object");
  const btnAppartements = document.getElementById("btn-appartements");
  const btnHotels = document.getElementById("btn-hotels");

  //Fonction pour générer le HTML de la gallerie -------------------------------------
  function genereGallery(selectedCategory) {
    //Déclaration des variables de la fonction 
    const gallerySection = document.querySelector(".gallery");
    let projectFilter = projects;

    //On filtre les projets par catégories 
    if (selectedCategory !== "") {
      projectFilter = projects.filter(
        (data) => data.category.name === selectedCategory
      );
    } else {
      projectFilter = projects;
    }

    //On vide la gallerie avant de mettre que les projets qui nous intéresse
    gallerySection.innerHTML = "";

    //Génération de la gallerie avec les projets filtrer
    for (let i = 0; i < projectFilter.length; i++) {
      gallerySection.innerHTML += `<figure>
      <img src=${projectFilter[i].imageUrl} alt=${projectFilter[i].title} />
      <figcaption>${projectFilter[i].title}</figcaption>
    </figure>`;
    }
  }

  //Première génération de la gallerie au complet
  genereGallery("");

  //Génération de la gallerie en fonction du filtre souhaité au click sur le bouton
  btnAll.addEventListener("click", () => {
    genereGallery("");
  });

  btnObject.addEventListener("click", () => {
    genereGallery("Objets");
  });

  btnAppartements.addEventListener("click", () => {
    genereGallery("Appartements");
  });

  btnHotels.addEventListener("click", () => {
    genereGallery("Hotels & restaurants");
  });
}
