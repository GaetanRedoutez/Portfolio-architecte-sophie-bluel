const btnModal = document.querySelector(".btn-modal");
const btnClose = document.querySelector(".btn-close-modal");
const divModal = document.getElementById("modal");
const divModalContent = document.getElementById(".modal-content");

export function Modal() {
  btnModal.addEventListener("click", (e) => {
    e.preventDefault();
    divModal.style.display = "block";
  });
  
  btnClose.addEventListener('click',(e)=>{
    e.preventDefault();
    divModal.style.display = "none";
  })
}