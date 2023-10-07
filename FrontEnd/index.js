//Récupération des données WORKS via l'API via fonction async complète
/*
 async function getAPIWorks() {
   const reponse = await fetch("http://localhost:5678/api/works");
   const dataAPIWorks = await reponse.json();
 console.log(dataAPIWorks);
 }
 getAPIWorks();
*/

//Récupération des données WORKS via l'API
const projects = await fetch("http://localhost:5678/api/works").then(
  (projects) => projects.json()
);

//Récupération des données CATEGORIES via l'API
const category = await fetch("http://localhost:5678/api/categories").then(
  (category) => category.json()
);

//Déclaration des variables
const gallerySection = document.querySelector(".gallery");
const btnAll = document.getElementById("btn-all");
const btnObject = document.getElementById("btn-object");
const btnAppartements = document.getElementById("btn-appartements");
const btnHotels = document.getElementById("btn-hotels");

let selectedCategory = "";

//Fonction pour générer le HTML de la gallerie
function genereGallery(projectFilter) {
  for (let i = 0; i < projectFilter.length; i++) {
    gallerySection.innerHTML += `<figure>
      <img src=${projectFilter[i].imageUrl} alt=${projectFilter[i].title} />
      <figcaption>${projectFilter[i].title}</figcaption>
    </figure>`;
  }
}

//Première génération de la gallerie au complet
genereGallery(projects);

//Génération de la gallerie en fonction du filtre souhaité au click sur le bouton
btnAll.addEventListener("click", () => {
  selectedCategory = "";
  gallerySection.innerHTML = "";
  genereGallery(projects);
});

btnObject.addEventListener("click", () => {
  selectedCategory = "Objets";
  const galleryFiltered = projects.filter(
    (data) => data.category.name === selectedCategory
  );
  gallerySection.innerHTML = "";
  genereGallery(galleryFiltered);
});

btnAppartements.addEventListener("click", () => {
  selectedCategory = "Appartements";
  const galleryFiltered = projects.filter(
    (data) => data.category.name === selectedCategory
  );
  gallerySection.innerHTML = "";
  genereGallery(galleryFiltered);
});

btnHotels.addEventListener("click", () => {
  selectedCategory = "Hotels & restaurants";
  const galleryFiltered = projects.filter(
    (data) => data.category.name === selectedCategory
  );
  gallerySection.innerHTML = "";
  genereGallery(galleryFiltered);
});
