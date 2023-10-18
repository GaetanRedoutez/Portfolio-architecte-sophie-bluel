import { addOneHomeWork } from './home.js';
import { httpDelete, httpGet, httpPost } from './request.js';

//Find HTML Node
const openModal = document.querySelector('[rel=js-open-modal]');
const closeModal = document.querySelector('[rel=js-close-modal]');
const backModal = document.querySelector('[rel=js-back-modal]');

const divModal = document.querySelector('[rel=js-modal]');
const modalTitle = document.querySelector('[rel=js-modal-title]');
const modalGallery = document.querySelector('[rel=js-modal-gallery]');

const modalForm = document.querySelector('[rel=js-modal-content] form');
const fileForm = document.querySelector('[rel=js-input-file]');
const beforePreview = document.querySelector('[rel=js-before-preview]');
const preview = document.querySelector('[rel=js-preview]');
const categoriesForm = document.querySelector('[rel=js-input-category]');

const modalAdd = document.querySelector('[rel=js-btn-add-project]');
const modalValid = document.querySelector('[rel=js-btn-valid-project]');
const modalDivAdd = document.querySelector('[rel=js-add-project]');
const modalDivValid = document.querySelector('[rel=js-valid-project]');

// Retrieve log data in the session storage
const UserToken = window.sessionStorage.getItem('userToken');

// Set url to get data
const urlWorks = 'http://localhost:5678/api/works';
const urlCategories = 'http://localhost:5678/api/categories';


function addOneModalWork(data){
  //Set the image parameter
  const image = document.createElement('img');
  image.src = data.imageUrl;
  image.alt = data.title;

  //Set the trash icon from fontawesome
  const trash = document.createElement('i')
    trash.className = "fa-solid fa-trash-can"
    trash.dataset.id = data.id;
    
  //Set the category and link image and caption to the figure
  const figure = document.createElement('figure');
    figure.setAttribute('rel',`js-work-${data.id}`);
    figure.append(image);
    figure.append(trash);

  modalGallery.append(figure);
}

//Create gallery by using a request to get all works
async function createModal (){  
  // Retrieve works data
  const works = await httpGet(urlWorks);

  // Create all the figure for modal gallery
  Array.from (works,work => {
    addOneModalWork(work);
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

// Create the second page of the modal and a list of category by using a request to get all category
async function showModalAdd (){
  // Reset the form
  modalForm.reset();

  //Modify title to the second part
  modalTitle.innerHTML = "Ajout photo"

  // Hide and show the rightand wrong button
  modalDivAdd.style.display='none';
  modalGallery.style.display='none';
  backModal.style.display ='initial'
  modalDivValid.style.display ='flex';
  modalForm.style.display ='flex';

  // Reset form when go on page
  modalForm.reset();
  preview.src = "";
  
  beforePreview.style.display = 'flex';
  preview.style.display = 'none';
}

// Manage the modal closing
function closeModalFunction(){
  divModal.style.display = "none";
}

// Control if the form have all of is input complete
function controlForm(){
  const required = modalForm.querySelectorAll('[required]')
  const requiredInput = Array.from (required).every(input=>input.value.trim() !== "");
  if (!requiredInput){
    modalValid.setAttribute('disabled','disabled');
  } else {
    modalValid.removeAttribute('disabled');
  }
  console.log(requiredInput);
}

function fileControlAndPreview(){  
  // Set the maximum file size
  const maxSize = 1024 * 1024 * 4;

  // Alert is file size is too big
  if (fileForm.files[0].size > maxSize){
    alert('La taille du fichier dépasse la limite autorisé');
  } else {
    preview.src = URL.createObjectURL(fileForm.files[0]);
    beforePreview.style.display = 'none';
    preview.style.display = 'block';
  };
}

// Request to add a new work
async function addRequest (){
  // Setup the body for a request API
  const formData = new FormData(modalForm);

  // Convert the category value in integer
  formData.set('category',parseInt(categoriesForm.value));

  // Setup the request options for add request
  const option = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UserToken}`,
    },
    body: formData,
  };

  // If valid the new project then launch the request, else go out of the function
  if (confirm("Confirmer ajout du projet " + formData.get('title'))) {
    const response = await httpPost(urlWorks,option);
    console.log(response);
    addOneModalWork(response);
    addOneHomeWork(response);
    showModalGallery();
  }  
}

// Request to delete a work
async function deleteWorks (id){
  const urlDelete = `${urlWorks}/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${UserToken}`,
    }
  };

  if (confirm("Confirmer surppression du projet " + id)) {
    // Delete work in API
    const response = await httpDelete(urlDelete,options);
    
    // If request ok remove figure in home and modal
    if (response.status === 204){
      const figuresToRemove = document.querySelectorAll(`[rel=js-work-${id}]`);
      figuresToRemove.forEach((figure)=>{
        figure.remove();
      });
    }
  }
}

if (!window.location.pathname.includes('/login.html')){
  // Show modal gallery
  openModal.addEventListener('click',  showModalGallery);
  backModal.addEventListener('click',showModalGallery);

  // Close modal
  closeModal.addEventListener('click', closeModalFunction);

  // Show modal add work
  modalAdd.addEventListener('click',showModalAdd);

  // Control form
  modalForm.addEventListener('input',controlForm);

  // Valid form and add new work
  modalValid.addEventListener('click', (e)=>{
    e.preventDefault();
    addRequest ();
  })

  // Control and preview new work image
  fileForm.addEventListener('change',fileControlAndPreview)
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
