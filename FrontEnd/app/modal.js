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

//Create gallery by using a request to get all works
async function createModal (){
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
          trash.dataset.id = work.id;
          
    //Set the category and link image and caption to the figure
    const figure = document.createElement('figure');
          figure.append(image);
          figure.append(trash);

    modalGallery.append(figure);
  } )

  //Clear the list of category
  categoriesForm.innerHTML = "";

  const chooseOption = document.createElement('option');
  chooseOption.innerHTML = "";

  categoriesForm.append(chooseOption);

  //Retrieve categories data
  const categories = await httpGet(urlCategories);

  //Create a list of category
  Array.from (categories, category =>{
  const option = document.createElement('option');
      option.innerHTML = category.name;
      option.value = category.id;

  categoriesForm.append(option)
  } )
}

// Create the second page of the modal and a list of category by using a request to get all category
async function showModalAdd (){
  //Modify title to the second part
  modalTitle.innerHTML = "Ajout photo"

  // Hide and show the rightand wrong button
  modalDivAdd.style.display='none';
  modalGallery.style.display='none';
  backModal.style.display ='initial'
  modalDivValid.style.display ='flex';
  modalForm.style.display ='flex';
}

// Manage the modal closing
function manageCloseModal(){
  divModal.style.display = "none";
  modalGallery.innerHTML = "";
}

function showModalGallery() {
  //Display the modal 
  divModal.style.display = "initial";
  
  //Modify title to the second part
  modalTitle.innerHTML = "Gallerie photo"

  // Hide and show the rightand wrong button
  modalDivAdd.style.display='flex';
  modalGallery.style.display='grid';
  backModal.style.display ='none'
  modalDivValid.style.display ='none';
  modalForm.style.display ='none';
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

// Configure headers and body for an add request
function configAddRequest(token){
  // Setup the body for a request API
  const formData = new FormData(modalForm);

  // Convert the category value in integer
  formData.set('category',parseInt(categoriesForm.value));

  // Setup the request options for add request
  if (confirm("Confirmer ajout du projet " + formData.get('title'))) {
    return {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
  } else {
    return false;
  }
}

async function addRequest (){
  const addOption = configAddRequest(UserToken);
  console.log(addOption);
  const addResponse = await httpPost(urlWorks,addOption);
  console.log(addResponse);
}

async function deleteWorks (id,token){
  const urlDelete = `${urlWorks}/${id}`
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  };

  if (confirm("Confirmer surppression du projet " + id)) {
    return response = await httpPost(urlDelete,options);
  } else {
    return false;
  }
}

if (!window.location.pathname.includes('/login.html')){
  openModal.addEventListener('click',  showModalGallery);
  
  closeModal.addEventListener('click', manageCloseModal);

  modalAdd.addEventListener('click',showModalAdd);

  backModal.addEventListener('click',showModalGallery);

  modalForm.addEventListener('input',controlRequiredForm);

  modalValid.addEventListener('click', async(e)=>{
    e.preventDefault();
    addRequest ();
  })
}


export function manageModal() {
  createModal().then(() => {
    const trashs = document.querySelectorAll('[rel=js-modal-gallery] figure i');
    trashs.forEach ((trash) => {   
      trash.addEventListener('click',(e)=>{
        const id = e.target.getAttribute('data-id');
        deleteWorks(id,UserToken); 
    });
    })
  })
  
}