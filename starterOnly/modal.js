/**
 * DOM Elements
 */
const modalbg = document.querySelector(".bground"); // Sélectionne l'élément du fond modal
const formulaire = document.querySelector("form"); // Sélectionne le formulaire
const confirmationMessage = document.querySelector(".msg-confirmation"); // Sélectionne le message de confirmation
const confirmationButton = document.querySelector(".btn-confirmation"); // Sélectionne le bouton de confirmation
const modalBtn = document.querySelectorAll(".modal-btn"); // Sélectionne les boutons d'ouverture du modal
const closeButton = document.querySelector(".close"); // Sélectionne le bouton de fermeture du modal

/**
 * Fonction pour basculer la visibilité d'un élément
 * @param {HTMLElement} element - L'élément HTML à afficher ou cacher
 * @param {boolean} show - Indique si l'élément doit être affiché (true) ou caché (false)
 */
function toggleVisibility(element, show) {
  const displayClass = show ? "d-block" : "d-none";
  element.classList.remove("d-none", "d-block");
  element.classList.add(displayClass);
}

/**
 * Fonction pour gérer la navigation responsive
 */
function editNavbar() {
  var navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";
  } else {
    navBar.className = "topnav";
  }
}

/**
 * Fonction pour ouvrir le modal
 */
function launchModal() {
  toggleVisibility(modalbg, true);

  closeButton.addEventListener("click", (reset) => {
    toggleVisibility(modalbg, false);
    return reset;
  });
}

/**
 * Fonction pour lier l'ouverture du modal aux boutons correspondants
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * Fonction de validation du formulaire
 */
function checkForm() {
  // Sélection des éléments du formulaire
  const inputFirstname = document.getElementById("firstname");
  const inputLastname = document.getElementById("lastname");
  const inputEmail = document.getElementById("email");
  const inputBirthdate = document.getElementById("birthdate");
  const inputQuantity = document.getElementById("quantity");
  const inputCheckbox = document.getElementById("checkbox1");
  const regExEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const regExBirthdate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  const regExQuantity = /^\d+$/;
  let validForm = true;

  // Fonction pour définir un message d'erreur pour un élément
  const setErrorText = (element, message) => {
    document.getElementById(element).innerText = message;
  };

  // Fonction pour effacer le message d'erreur d'un élément
  const clearErrorText = (element) => {
    setErrorText(element, "");
  };

  if (inputFirstname.value.length < 2) {
    setErrorText("errorFirstname", "Vous n'avez pas précisé de prénoms !");
    validForm = false;
  } else {
    clearErrorText("errorFirstname");
  }

  // Si le formulaire est valide, renvoie true, sinon renvoie false
  return validForm;
}

/**
 * Gestion de la soumission du formulaire
 */
formulaire.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkForm()) {
    // Si le formulaire est valide, traite les données
    const elements = formulaire.elements;
    const formData = {};
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.type !== 'submit') {
        formData[element.name] = element.value;
      }
    }
    console.log(formData);
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem('formData', formDataJSON);
    confirmationMessage.appendChild(confirmationButton);
    confirmationMessage.classList.remove("d-none");
    toggleVisibility(formulaire, false);
    setTimeout(() => formulaire.submit(), 36000);
  } else {
    // Si le formulaire n'est pas valide, affiche une alerte
    alert("Le formulaire présente de nombreuses erreurs et ne peut pas être transmis !");
  }
});
