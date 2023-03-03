const categories = [
    {
        "id": 1,
        "name": "Objets"
    },
    {
        "id": 2,
        "name": "Appartements"
    },
    {
        "id": 3,
        "name": "Hotels & restaurants"
    }
  ]
  
 // Création des filtres


  let container = document.querySelector(".projects div");
  let tous = document.createElement("button");
  tous.innerHTML = "Tous";
  tous.setAttribute("style", "background-color: #1D6154; color: white");
  tous.setAttribute("id", 0);
  container.appendChild(tous);
  
  fetch("http://localhost:5678/api/categories")
  .then(res => res.json())
  .then((data) => {
        let categories = data;
  
  function populateCategory(data) {
    data.forEach(element => { 
    
    let button = document.createElement("button");
    button.setAttribute("crossorigin", "");
    button.setAttribute("id", element.id);
    button.innerHTML = element.name;
  
    container.appendChild(button);
  });
  }
  populateCategory(categories);
  })
  
// Fonctionnement des filtres
  
fetch("http://localhost:5678/api/works")
      .then(res => res.json())
      .then((data) => {
  
  const objets = document.getElementById("1");
  const appartements = document.getElementById("2");
  const hotels = document.getElementById("3");
      
  objets.addEventListener("click", function () {
    const projetsFiltres = data
      .filter(function (data) {
        return data.categoryId === 1;
      })
      .map(
        (element) => `<figure>
      <img crossorigin="" src=${element.imageUrl} alt=${element.title}>
      <figcaption>${element.title}</figcaption>
  </figure>`
      );
      console.log(data
        .filter(function (data) {
          return data.categoryId === 1;
        }));
      document.querySelector("#gallery").innerHTML = projetsFiltres
  });
  
  appartements.addEventListener("click", function () {
    const projetsFiltres = data
      .filter(function (data) {
        return data.categoryId === 2;
      })
      .map(
        (element) => `<figure>
      <img crossorigin="" src=${element.imageUrl} alt=${element.title}>
      <figcaption>${element.title}</figcaption>
  </figure>`
      );
      document.querySelector("#gallery").innerHTML = projetsFiltres;
      })
  
hotels.addEventListener("click", function () {
    const projetsFiltres = data
      .filter(function (data) {
        return data.categoryId === 3;
      })
      .map(
        (element) => `<figure>
      <img crossorigin="" src=${element.imageUrl} alt=${element.title}>
      <figcaption>${element.title}</figcaption>
  </figure>`
      );
      document.querySelector("#gallery").innerHTML = projetsFiltres 
      });
  
      tous.addEventListener("click", function () {
        const projetsFiltres = data
          .map(
            (element) => `<figure>
          <img crossorigin="" src=${element.imageUrl} alt=${element.title}>
          <figcaption>${element.title}</figcaption>
      </figure>`
          );
          document.querySelector("#gallery").innerHTML = projetsFiltres;
          })
  });
  