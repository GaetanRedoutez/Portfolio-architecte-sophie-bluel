import { addOneHomeWork } from './home.js';
import { httpDelete, httpGet, httpPost } from './request.js';

//Find HTML Node
const openModal      = document.querySelector('[rel=js-open-modal]');
const closeModal     = document.querySelector('[rel=js-close-modal]');
const backModal      = document.querySelector('[rel=js-back-modal]');

const divModal       = document.querySelector('[rel=js-modal]');
const modalTitle     = document.querySelector('[rel=js-modal-title]');
const modalGallery   = document.querySelector('[rel=js-modal-gallery]');

const modalForm      = document.querySelector('[rel=js-modal-content] form');
const fileForm       = document.querySelector('[rel=js-input-file]');
const categoriesForm = document.querySelector('[rel=js-input-category]');

const beforePreview  = document.querySelector('[rel=js-before-preview]');
const preview        = document.querySelector('[rel=js-preview]');

const modalAdd       = document.querySelector('[rel=js-btn-add-project]');
const modalDivAdd    = document.querySelector('[rel=js-add-project]');
const modalValid     = document.querySelector('[rel=js-btn-valid-project]');
const modalDivValid  = document.querySelector('[rel=js-valid-project]');

// Retrieve log data in the session storage
const UserToken = window.sessionStorage.getItem('userToken');

// Set url to send API request
const urlWorks      = 'http://localhost:5678/api/works';
const urlCategories = 'http://localhost:5678/api/categories';

/**
 * Create a work in a modal
 * 
 * @param {object} data Represent a work object
 * @returns {void}
 */
function addOneModalWork(data){
  //Set the image parameter
  const image = document.createElement('img');
        image.src = data.imageUrl;
        image.alt = data.title;

  //Set the trash icon from Font Awesome
  const trash = document.createElement('i')
        trash.className = "fa-solid fa-trash-can"
        trash.dataset.id = data.id;
    
  //Set the category and link image and caption to the figure
  const figure = document.createElement('figure');
        figure.setAttribute('rel',`js-work-${data.id}`);
        figure.append(image);
        figure.append(trash);

  modalGallery.append(figure);

  trash.addEventListener('click', e => {
    const id = e.target.getAttribute('data-id');
    deleteWorks(id,UserToken);
  })
}

/**
 * Create the modal content (gallery + category list)
 * 
 * @returns {void}
 */
export async function createModal (){  
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

/**
 * Display the modal gallery and hide the form
 * 
 * @returns {void}
 */
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

/**
 * Display the modal form and hide the gallery
 * 
 * @returns {void}
 */
async function showModalAdd (){
  // Reset the form
  modalForm.reset();

  //Modify title to the second part
  modalTitle.innerHTML = "Ajout photo"

  // Hide and show the right and wrong button
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

/**
 * Close modal by setting the display to none
 * 
 * @returns {void}
 */
function closeModalFunction(){
  divModal.style.display = "none";
}

/**
 * Control form and manage disabled attribute of the valid button
 * 
 * @returns {void}
 */
function controlForm(){
  const required = modalForm.querySelectorAll('[required]')
  const requiredInput = Array.from (required).every(input=>input.value.trim() !== "");

  if (!requiredInput){
    modalValid.setAttribute('disabled','disabled');
  } else {
    modalValid.removeAttribute('disabled');
  }
}

/**
 * Control max size of th file and display the preview
 * 
 * @returns {void}
 */
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

/**
 * Configure and send a request to add a new work.
 * Also add a figure in both gallery
 * 
 * @returns {void}
 */
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

/**
 * Configure and send a request to delete a work.
 * Also remove the figure in both gallery
 * 
 * @param {number} id Represent a work ID
 * @returns {void}
 */
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

// Control location to execute this part of code
if (!window.location.pathname.includes('/login.html'))
{
  // Show modal gallery
  openModal.addEventListener('click',  showModalGallery);
  backModal.addEventListener('click',showModalGallery);

  // Close modal
  closeModal.addEventListener('click', closeModalFunction);
  document.addEventListener('click', e => {
    if (e.target.getAttribute('rel') === 'js-modal')
    {
      closeModalFunction();
    }
  })

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
