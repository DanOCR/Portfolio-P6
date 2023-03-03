
const deleteGallery = document.querySelector("#gallery");

const catId = new URLSearchParams(window.location.search).get("catId");
const allImageContainer = document.querySelector(".list");

// Récupération des projets

fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    let projects = data;
    let container = document.getElementById("gallery");

    function populateGallery(data) {
    
      data.forEach((element) => {
        if (catId !== null) {
          if (element.categoryId === catId) {
            let card = document.createElement("figure");
            let image = document.createElement("img");
            let figcaption = document.createElement("figcaption");

            image.setAttribute("src", element.imageUrl);
            image.setAttribute("crossorigin", "");
            figcaption.innerHTML = element.title;

            card.appendChild(image);
            card.appendChild(figcaption);

            container.appendChild(card);
          }
        } else {
          let card = document.createElement("figure");
          let image = document.createElement("img");
          let figcaption = document.createElement("figcaption");

          image.setAttribute("src", element.imageUrl);
          image.setAttribute("crossorigin", "");
          figcaption.innerHTML = element.title;

          card.appendChild(image);
          card.appendChild(figcaption);

          container.appendChild(card);
        }
      });
    }

    populateGallery(projects);
  });


const login = document.getElementById("login");

login.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "login.html";
})

// Création modale

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", toggleModal);
});

function toggleModal() {
  modalContainer.classList.toggle("active");
}

// Ajout de la deuxième modale

const modalContainer2 = document.querySelector(".modal-container2");
const modalTriggers2 = document.querySelectorAll(".modal-trigger2");
const ajouter = document.querySelector("#add");

ajouter.addEventListener("click", async function (event) {
  event.preventDefault();

  modalContainer2.classList.toggle("active");
})

const bouton = document.querySelector("#close-modal2");
const modale = document.querySelector(".modal-container2");
const overlay = document.querySelector(".modal-trigger2");
const fleche = document.querySelector(".fa-arrow-left");

bouton.addEventListener("click", async function (event) {
  event.preventDefault();
  modale.classList.remove("active");
})
overlay.addEventListener("click", async function (event) {
  event.preventDefault();
  modale.classList.remove("active");
})
fleche.addEventListener("click", async function (event) {
  event.preventDefault();
  modale.classList.remove("active");
})

document.querySelector("#modificate").addEventListener("click", function() {
  toggleModal();
});

// Ajouts des projets dans la modale

fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element, index) => {
        allImageContainer.innerHTML += `
            <div  data-id="${element.id}" class="image-container">
                <img id="image${index + 1}" crossorigin="" src="${
          element.imageUrl
        }">
                <button class="button-delete"> <i class="fa-regular fa-trash-can"></i> </button>
            </div>
            `;
        
      });
      deleteImage();

    });
  
// Fonction enfermant l'ajout des projets dans la modale

function remove() {
    fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element, index) => {
        allImageContainer.innerHTML += `
            <div  data-id="${element.id}" class="image-container">
                <img id="image${index + 1}" crossorigin="" src="${
          element.imageUrl
        }">
                <button class="button-delete"> <i class="fa-regular fa-trash-can"></i> </button>
            </div>
            `;
        
      });
      deleteImage();

    });
}

// Fonction enfermant l'ajout des projets dans la galerie

function add() {
const catId = new URLSearchParams(window.location.search).get("catId");

fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    let projects = data;
    let container = document.getElementById("gallery");

    function populateGallery(data) {
    
      data.forEach((element) => {
        if (catId !== null) {
          if (element.categoryId === catId) {
            let card = document.createElement("figure");
            let image = document.createElement("img");
            let figcaption = document.createElement("figcaption");

            image.setAttribute("src", element.imageUrl);
            image.setAttribute("crossorigin", "");
            figcaption.innerHTML = element.title;

            card.appendChild(image);
            card.appendChild(figcaption);

            container.appendChild(card);
          }
        } else {
          let card = document.createElement("figure");
          let image = document.createElement("img");
          let figcaption = document.createElement("figcaption");

          image.setAttribute("src", element.imageUrl);
          image.setAttribute("crossorigin", "");
          figcaption.innerHTML = element.title;

          card.appendChild(image);
          card.appendChild(figcaption);

          container.appendChild(card);
        }
      });
    }

    populateGallery(projects);
  });
}

// Suppression d'un projet

function deleteImage() {
      const allButtonDelete = document.querySelectorAll(".button-delete");
    if (allButtonDelete) {
      allButtonDelete.forEach((button) => {
        button.addEventListener("click", async function (e) {
          e.preventDefault();
          const elementParent = button.closest(".image-container");
          const idDeleted = elementParent.dataset.id;
          const token = localStorage.getItem("token");

        await fetch(`http://localhost:5678/api/works/${idDeleted}`, {
            method: "DELETE",
            headers : {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
  })
            .then((res) => res)
            .then((response) => {
              document.querySelector("#gallery").innerHTML = "";
              document.querySelector("#list").innerHTML = "";
              add();
              remove();
            });
        });
      });
    }
   }


// Ajout d'un projet

const file = document.getElementById("file");
const title = document.getElementById("title");
const category = document.getElementById("category");
const submit = document.getElementById("validate");
const gallery = document.getElementById("gallery");
const closeSecondModal = document.getElementById("modal-container2");
const closeModal = document.getElementById("modal-container");

submit.addEventListener("click", async function (event) {
  event.preventDefault();
  form(file, title, category);
  closeSecondModal.classList.remove("active");
  closeModal.classList.remove("active");
})


function form(file, title, category) {
  
  const formData = new FormData();
  formData.append("image", file.files[0]);
  formData.append("title", title.value);
  formData.append("category", category[0].value);
  const token = localStorage.getItem("token");

  fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers : {'Authorization': `Bearer ${token}`},
            body: formData,
})
            .then((res) => res)
            .then((response) => {
              document.querySelector("#gallery").innerHTML = "";
              document.querySelector("#list").innerHTML = "";
              add();
              remove();
            });
}

// Formulaire d'ajout d'un projet

const image_input = document.querySelector("#file");
const ajoutContainer = document.querySelector(".add");
const icone = document.querySelector(".fa-image");
const button = document.querySelector("#fake-button")
const paragraphe = document.querySelector(".add p");
var image = "";

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    image = reader.result;

    icone.style.display = "none";
    image_input.style.display = "none";
    button.style.display = "none";
    paragraphe.style.display = "none";

    ajoutContainer.style.backgroundImage = `url(${image})`;
    ajoutContainer.style.backgroundRepeat = "no-repeat";
    ajoutContainer.style.backgroundSize = "150px";
    ajoutContainer.style.backgroundPositionX = "135px";


  })
  reader.readAsDataURL(this.files[0]);
} )

// Modifications en cas de log

const filtres = document.querySelector(".projects div");
const modifier = document.querySelector("#modificate-projects");
const parent = document.querySelector("#projects");
const blackblock = document.querySelector("#blackblock");
const log = document.querySelector("#login");
const logout = document.querySelector("#logout");

var token = localStorage.getItem("token");

if(token) {
  filtres.style.display = "none";
  blackblock.style.display = "flex";
  modifier.style.display = "flex";
  log.style.display = "none";
  logout.style.display = "flex";

  parent.setAttribute("style","flex-direction: row");

  logout.addEventListener("click", function() {
  })
}
else {
  filtres.style.display = "flex";
  blackblock.style.display = "none";
  modifier.style.display = "none";
  log.style.display = "flex";
  logout.style.display = "none";
  parent.setAttribute("style", "flex-direction: column");
}