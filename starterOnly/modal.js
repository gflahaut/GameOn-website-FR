// DOM Elements
const modalbg = document.querySelector(".bground");
const formulaire = document.querySelector("form");
let confirmationMessage = document.querySelector("#confirmationMessage");
const confirmationButton = document.querySelector("#confirmationButton");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeButton = document.querySelector(".close");

//Toggle visibility Function
function toggleVisibility(element, show) {
  const displayClass = show ? "d-block" : "d-none";
  element.classList.remove("d-none", "d-block");
  element.classList.add(displayClass);
}
//Managing the responsive navbar Function 
function editNavbar() {
  var navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";
  } else {
    navBar.className = "topnav";
  }
}
//Launch modal form Function
function launchModal() {
  toggleVisibility(modalbg, true);
  closeButton.addEventListener("click", (reset) => {
    toggleVisibility(modalbg, false);
    return reset
  });
}
//Launch modal event Function
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Form Validation Function
function checkForm() {
  const inputFirstname = document.getElementById("firstname");
  const inputLastname = document.getElementById("lastname");
  const inputEmail = document.getElementById("email");
  const inputBirthdate = document.getElementById("birthBirthdate");
  const inputQuantity = document.getElementById("quantity");
  const inputCheckbox = document.getElementById("checkbox1");
  const regExEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const regExBirthdate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  const regExQuantity = /^\d+$/;
  let validForm = true;

  const setErrorText = (element, message) => {
    document.getElementById(element).innerText = message;
  };
  const clearErrorText = (element) => {
    setErrorText(element, "");
  };
  if (inputFirstname.value.length < 2) {
    setErrorText("errorFirstname", "Vous n'avez pas précisé de Lastname !");
    validForm = false;
  } else {
    clearErrorText("errorFirstname");
  }
  if (inputLastname.value.length < 2) {
    setErrorText("errorLastname", "Vous n'avez pas précisé de Lastnames !");
    validForm = false;
  } else {
    clearErrorText("errorLastname");
  }
  if (inputEmail.value === "") {
    setErrorText("errorEmail", "Vous n'avez pas précisé d'adresse e-mail !");
    validForm = false;
  } else if (!regExEmail.test(inputEmail.value)) {
    setErrorText(
      "errorEmail",
      "Le format de l'adresse e-mail précisée est invalide !"
    );
    validForm = false;
  } else {
    clearErrorText("errorEmail");
  }

  //Today's Birthdate
   const BirthdateToday = new Birthdate();
// Calculating the Birthdate 100 years ago
const Birthdate100Years = new Birthdate(BirthdateToday);
Birthdate100Years.setFullYear(BirthdateToday.getFullYear() - 100);
// Calculating the Birthdate 18 years ago
const Birthdate18Years = new Birthdate(BirthdateToday);
Birthdate18Years.setFullYear(BirthdateToday.getFullYear() - 18);
// Retrieval of the original Birthdates
const BirthdateOriginMin = new Birthdate(Birthdate18Years);
const BirthdateOriginMax = new Birthdate(Birthdate100Years);
// Function to format a Birthdate as "yyyy-mm-dd"
function BirthdateFormater(BirthdateOrigin) {
  const year = BirthdateOrigin.getFullYear();
  const month = String(BirthdateOrigin.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0, donc ajoutez 1 et formatez avec deux chiffres
  const day = String(BirthdateOrigin.getBirthdate()).padStart(2, "0");
  return `${year}${month}${day}`;
}
// Formatting the Birthdate in "yyyy-mm-dd" format
const BirthdateMin = BirthdateFormater(BirthdateOriginMin);
const BirthdateMax = BirthdateFormater(BirthdateOriginMax);

if (inputBirthdate.value === "") {
  setErrorText(
    "errorBirthdate",
    "Vous n'avez pas précisé votre date de naissance !"
  );
  validForm = false;
} else if (
  inputBirthdate.value.replaceAll("-", "") >= BirthdateMin ||
  inputBirthdate.value.replaceAll("-", "") <= BirthdateMax
) {
  setErrorText(
    "errorBirthdate",
    "vous devez avoir plus de 18ans et moins de 100 ans pour vous inscrire !"
  );
  validForm = false;
} else if (!regExBirthdate.test(inputBirthdate.value)) {
  setErrorText(
    "errorBirthdate",
    "Le format de la Date de naissance précisée est invalide !"
  );
  validForm = false;
} else {
  clearErrorText("errorBirthdate");
}

if (inputQuantity.value === "") {
  setErrorText(
    "errorQuantity",
    "Vous n'avez pas précisé le nombre de tournois auxquels vous avez participé !"
  );
  validForm = false;
} else if (!regExQuantity.test(inputQuantity.value)) {
  setErrorText("errorQuantity", "Veuillez entrer un nombre valide !");
  validForm = false;
} else {
  clearErrorText("errorQuantity");
}
const radioButton = formulaire.elements["location"];
  let selectedButton = false;
  
  for (let i = 0; i < radioButton.length; i += 1) {
    if (radioButton[i].checked) {
      selectedButton = true;
      break;
    }
  }
  
  if (!selectedButton) {
    setErrorText("errorLocation", "Aucun tournoi n'est sélectionné !");
    validForm = false;
  } else {
    clearErrorText("errorLocation");
  }
  
  if (!inputCheckbox.checked) {
    setErrorText(
      "errorCheckbox",
      "Vous n'avez pas coché les Conditions d'utilisation !"
    );
    validForm = false;
  } else {
    clearErrorText("errorCheckbox");
  }
  
  const inputs = formulaire.querySelectorAll(
    "input[type=text], input[type=email], input[type=number], input[type=radio], input[type=checkbox], input[type=date]"
  );
  
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("input-invalide");
    } else {
      input.classList.remove("input-invalide");
    }
  });
  
  return validForm;
}

// Form submission
formulaire.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkForm()) {
    confirmationMessage.appendChild(confirmationButton);
    confirmationMessage.classList.remove("d-none");
    toggleVisibility(formulaire, false);
    setTimeout(() => formulaire.submit(), 36000);
  } else {
    alert("Le formulaire présente de nombreuses erreurs !");
  }
});   