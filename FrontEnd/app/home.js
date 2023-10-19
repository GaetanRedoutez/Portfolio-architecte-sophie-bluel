import { httpGet } from "./request.js";

//Find HTML Node
const btnAll        = document.querySelector('[rel=js-btn-all]');
const btnObject     = document.querySelector('[rel=js-btn-object]');
const btnapartments = document.querySelector('[rel=js-btn-apartments]');
const btnHotels     = document.querySelector('[rel=js-btn-hotels]');
const gallery       = document.querySelector('[rel=js-gallery]');

// Didn't execute this if we're on the login page
if (!window.location.pathname.includes('/login.html')){
  //Detect filter button event
  btnAll.addEventListener('click', applyFilter);
  btnObject.addEventListener('click', applyFilter);
  btnapartments.addEventListener('click', applyFilter);
  btnHotels.addEventListener('click',applyFilter);
}

//Set url to get works data
const urlWorks = 'http://localhost:5678/api/works';

async function applyFilter(e) {
  const btn = e.target;
  //Save the selected category by the filter bar
  const category = btn.dataset.filter;
  //Select all figure in the project gallery
  const works = document.querySelectorAll ('[rel=js-gallery] figure')

  //In the table works, 
  Array.from(works, work =>{
    //reset the display to initial state
    work.style.display ='initial';
    //if work category didn't correspond to the selected category, set display to none
    if (category != "all" && work.dataset.category != category){
      work.style.display = 'none';
    }
  })
}

/**
 * Create a work for home gallery
 * 
 * @param {work} data Represent a work object
 * @returns {void}
 */
export function addOneHomeWork(data){
  //Set the image parameter
  const image = document.createElement('img');
        image.src = data.imageUrl;
        image.alt = data.title;

  //Set the caption parameter
  const caption = document.createElement('figcaption');
        caption.innerHTML = data.title;

  //Set the category and link image and caption to the figure
  const figure = document.createElement('figure');
        figure.setAttribute('rel',`js-work-${data.id}`);
        figure.dataset.id = data.id;
        figure.dataset.category = data.categoryId;
        figure.append(image);
        figure.append(caption);

  //Link the figure to the gallery
  gallery.append(figure);
}

export async function manageHomeGallery() {
  //Retrieve data
  const works = await httpGet(urlWorks);
  
  //Create all the figure
  Array.from (works, work=>{
    addOneHomeWork(work);
  })
}
