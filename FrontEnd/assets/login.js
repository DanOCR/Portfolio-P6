// constante pour le bouton "se connecter"
const login = document.querySelector("#button");
 
// fonction pour se connecter
   login.addEventListener("click", async function (event) {
     event.preventDefault(); // empêche le comportement par défaut
 
// on crée l'objet userInput qui vient récupérer l'email et le mdp
     const userInput = {
       email: document.getElementById("e-mail").value,
       password: document.getElementById("password").value,
     };
 
// on envoie les données dans l'api grâce à fetch
     let response = await fetch("http://localhost:5678/api/users/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(userInput),

      });
 
// variables pour récupérer le token de l'api
     let result = await response.json();
     let token = result.token;
 
// si la connection est réussie, on enregistre le token dans le ls

    if (response.status == "200") {
       window.localStorage.setItem("token", token);
       window.location.href = "index.html";

// erreur 401, mot de passe incorrect
     } else if (response.status == "401") {
       console.log("error 401");
       return alert("l'identifiant et/ou le mot de passe ne correspondent pas");
// erreur 404, email incorrect 
     } else if (response.status == "404") {
       console.log("error 404");
       return alert("l'identifiant et/ou le mot de passe ne correspondent pas");
     }

   });

const bouton = document.querySelector("#close-modal2");
const modal = document.querySelector(".modalContainer2");

bouton.addEventListener("click", function() {
  modal.classList.remove(".active");
})