import { httpGet } from "./request.js";

//Find HTML Node
const openModal = document.querySelector("[rel=js-open-modal]");
const closeModal = document.querySelector("[rel=js-close-modal]");
const divModal = document.querySelector("[rel=js-modal]");
const modalContent = document.querySelector("[rel=js-modal-content]");
const modalAdd = document.querySelector("[rel=js-btn-add-project]");

//Declare new variable 
let actualModalPage = 0;

//Set url to get works data
const urlWorks = 'http://localhost:5678/api/works';

async function createModalGallery (){

  //Display the modal 
  divModal.style.display = "initial";

  //Add title to the first modal
  const title = document.createElement('div');
        title.className = "modal-title";
        title.innerHTML = "Galerie photo"
  

  // Add a div to stock all the project in figure
  const gallery = document.createElement('div');
        gallery.className = "modal-gallery"

  // Retrieve works data
  const works = await httpGet(urlWorks);

  // Create all the figure for modal gallery
  Array.from (works,work => {
    //Set the image parameter
    const image = document.createElement('img');
          image.src = work.imageUrl;
          image.alt = work.title;

    //Set the trash icon from fontawesome
    const trash = document.createElement('i')
          trash.className = "fa-solid fa-trash-can"
          
    //Set the category and link image and caption to the figure
    const figure = document.createElement('figure');
          figure.dataset.category = work.category.id;
          figure.append(image);
          figure.append(trash);

    gallery.append(figure);
  } )

  modalContent.appendChild (title)
  modalContent.appendChild (gallery)
}

function createAddModal (){
  //Clear and replace the modal
  modalContent.innerHTML = "";

  //Add title to the second modal
  const title = document.createElement('div');
        title.className = "modal-title";
        title.innerHTML = "Ajout photo"
}

function manageCloseModal(){
  divModal.style.display = "none";
  modalContent.innerHTML = "";
  actualModalPage = 0;
}

export function manageModal() {
  // Didn't execute this if we're on the login page
  if (window.location.pathname !== '/login.html'){

    openModal.addEventListener('click',  createModalGallery);
    
    closeModal.addEventListener('click', manageCloseModal);
    divModal.addEventListener('click', manageCloseModal);


    modalAdd.addEventListener('click', createAddModal);
    
  }
}

/*
const projectsDelete = modalGallery.querySelectorAll(".delete-project");
projectsDelete.forEach((projectDelete) => {
  projectDelete.addEventListener("click", (e) => {
    let deleteId = e.target.getAttribute("data-id");
    deleteProjects(token, deleteId);
      
  });
});




async function deleteProjects(token, id) {
  console.log("token = " + token);
  console.log("id a delete = " + id);
  const apiUrlLogin = `http://localhost:5678/api/works/${id}`;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  if (confirm("Confirmer surppression : ")) {
    const response = await fetch(apiUrlLogin, requestOptions);
  }}

async function addProject (){
  console.log("token = " + token);
  console.log("id a delete = " + id);
  const apiUrlLogin = `http://localhost:5678/api/works`;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  if (confirm("Confirmer surppression : ")) {
    const response = await fetch(apiUrlLogin, requestOptions);
  }
}
*/


/*
<div class="modal-add">
  <div class="btn-back-modal"><i class="fa-solid fa-left-long"></i></div>
  <div class="modal-title">Ajout photo</div>
  <div>
    <form>
      <input type="file" name="projet" accept="image/png, image/jpeg" />
      <label for="title">Titre</label>
      <input type="text" name="title">
      <label for="category">Catégorie</label>
      <input type="select" name="category">
      </input>
      <div class="add-project">
        <button class="btn-valid-project">Ajouter une photo</button>
      </div>
    </form>
  </div>
  <div class="modal-add-photo"></div>
  <div class="modal-add-title"></div>
  <div class="modal-add-category"></div>

</div>
*/