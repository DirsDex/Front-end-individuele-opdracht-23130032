document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("nav ul");

  console.log(hamburger, navMenu); 

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
});



