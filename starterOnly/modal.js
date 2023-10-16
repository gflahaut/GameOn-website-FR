// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeButton = document.querySelector(".close");

// Function to toggle visibility
function toggleVisibility(element, show) {
  const displayClass = show ? "d-block" : "d-none";
  element.classList.remove("d-none", "d-block");
  element.classList.add(displayClass);
}
//Function to manage the responsive navbar
function editNavbar() {
  var navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";
  } else {
    navBar.className = "topnav";
  }
}

// Function to launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  toggleVisibility(modalbg, true);
  closeButton.addEventListener("click", (reset) => {
    toggleVisibility(modalbg, false);
    return reset
  });
}


