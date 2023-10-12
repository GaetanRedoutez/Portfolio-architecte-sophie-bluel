import { httpGet } from "./request.js";

//Find HTML Node
const btnAll = document.querySelector('[rel=js-btn-all]');
const btnObject = document.querySelector('[rel=js-btn-object]');
const btnapartments = document.querySelector('[rel=js-btn-apartments]');
const btnHotels = document.querySelector('[rel=js-btn-hotels]');
const gallery = document.querySelector('[rel=js-gallery]');

// Didn't execute this if we're on the login page
if (window.location.pathname !== '/login.html'){
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

export async function manageHomeGallery() {
  
  //Retrieve data
  const works = await httpGet(urlWorks);
  
  //Create all the figure
  Array.from (works, work=>{

    //Set the image parameter
    const image = document.createElement('img');
          image.src = work.imageUrl;
          image.alt = work.title;

    //Set the caption parameter
    const caption = document.createElement('figcaption');
          caption.innerHTML = work.title;

    //Set the category and link image and caption to the figure
    const figure = document.createElement('figure');
          figure.dataset.category = work.category.id;
          figure.append(image);
          figure.append(caption);
    
    //Link the figure to the gallery
    gallery.append(figure);
    
  })
}
