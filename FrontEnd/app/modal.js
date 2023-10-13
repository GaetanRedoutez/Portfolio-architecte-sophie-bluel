import { httpGet, httpPost } from './request.js';

//Find HTML Node
const openModal = document.querySelector('[rel=js-open-modal]');
const closeModal = document.querySelector('[rel=js-close-modal]');
const backModal = document.querySelector('[rel=js-back-modal]');

const divModal = document.querySelector('[rel=js-modal]');
const modalContent = document.querySelector('[rel=js-modal-content]');
const modalTitle = document.querySelector('[rel=js-modal-title]');
const modalGallery = document.querySelector('[rel=js-modal-gallery]');

const modalForm = document.querySelector('[rel=js-modal-content] form');
const fileForm = document.querySelector('[rel=js-input-file]');
const nameForm = document.querySelector('[rel=js-input-name]');
const categoriesForm = document.querySelector('[rel=js-input-category]');

const modalAdd = document.querySelector('[rel=js-btn-add-project]');
const modalValid = document.querySelector('[rel=js-btn-valid-project]');
const modalDivAdd = document.querySelector('[rel=js-add-project]');
const modalDivValid = document.querySelector('[rel=js-valid-project]');

// Retrieve log data in the session storage
const userId = window.sessionStorage.getItem('userId');
const UserToken = window.sessionStorage.getItem('userToken');

// Set url to get data
const urlWorks = 'http://localhost:5678/api/works';
const urlCategories = 'http://localhost:5678/api/categories';

// Prepare data to add a new work
let addImg = "";
let addName = "";
let addCat = "";

//Create gallery by using a request to get all works
async function createModalGallery (){

  //Display the modal 
  divModal.style.display = "initial";

  // Modify display of elements
  modalDivAdd.style.display='flex'
  modalDivValid.style.display ='none'
  modalForm.style.display ='none'
  backModal.style.display ='none'

  //Modify title to the first modal
  modalTitle.innerHTML = "Galerie photo"

  // Clear the modal gallery
  modalGallery.style.display = "grid";
  modalGallery.innerHTML = "";
  
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

    modalGallery.append(figure);
  } )
}

// Create the second page of the modal and a list of category by using a request to get all category
async function createAddModal (){
  //Modify title to the second part
  modalTitle.innerHTML = "Ajout photo"

  //Clear the list of category
  categoriesForm.innerHTML = "";

  // Hide and show the rightand wrong button
  modalDivAdd.style.display='none';
  modalGallery.style.display='none';
  backModal.style.display ='initial'
  modalDivValid.style.display ='flex';
  modalForm.style.display ='flex';

  const chooseOption = document.createElement('option');
        chooseOption.innerHTML = "Choisir une catégorie";

  categoriesForm.append(chooseOption);

  //Retrieve categories data
  const categories = await httpGet(urlCategories);

  //Create a list of category
  Array.from (categories, category =>{
    const option = document.createElement('option');
          option.innerHTML = category.name;
          option.dataset.category = category.id;
    
    categoriesForm.append(option)
  } )
  
}

// Manage the modal closing
function manageCloseModal(){
  divModal.style.display = "none";
  modalContent.innerHTML = "";
}

// Control if the form have all of is input complete
function controlRequiredForm(){
  const required = modalForm.querySelectorAll('[required]')
  const requiredInput = Array.from (required).every(input=>input.value.trim() !== "");
  if (!requiredInput){
    modalValid.setAttribute('disabled','disabled');
  } else {
    modalValid.removeAttribute('disabled');
  }
  console.log(requiredInput);
}

function configAddRequest(img,name,cat,token){
  // Setup the body for a request to the login API
  const bodyRequest = JSON.stringify({
    image: img, //string
    title: name, //string
    category: cat //integer
  });

  // Setup the request options for a login request
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer '${token}'`,
    },
    body: bodyRequest,
  };
}

if (window.location.pathname !== '/login.html'){
  // Retrieve url of the new work
  fileForm.addEventListener('input',(e)=>{
    addImg = e.target.value;
    console.log(addImg);
  })
  
  // Retrieve name of the new work
  nameForm.addEventListener('input',(e)=>{
    addName = e.target.value;
    console.log(addName);
  })

  // Retrieve cat of the new work
  categoriesForm.addEventListener('change',(e)=>{
    addCat = categoriesForm.options[categoriesForm.selectedIndex].getAttribute('data-category');
    console.log(addCat);
  })
}

async function addRequest (){
  const addOption = configAddRequest(addImg,addName,addCat,UserToken);
  console.log(addOption);
  const addResponse = await httpPost(urlWorks,addOption);
  console.log(addResponse);
}

export async function manageModal() {
  // Didn't execute this if we're on the login page
  if (window.location.pathname !== '/login.html'){

    openModal.addEventListener('click',  createModalGallery);
    
    closeModal.addEventListener('click', manageCloseModal);

    modalAdd.addEventListener('click',createAddModal);

    backModal.addEventListener('click',createModalGallery);

    modalForm.addEventListener('input',controlRequiredForm);

    modalValid.addEventListener('click', async(e)=>{
      e.preventDefault();

      const addOption = configAddRequest(addImg,addName,addCat,UserToken);
      console.log(addOption);
      const addResponse = await httpPost(urlWorks,addOption);
      console.log(addResponse);
    })
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
*/