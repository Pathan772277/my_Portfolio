'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// form submission handler
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const originalButtonText = formBtn.innerHTML;
    formBtn.setAttribute("disabled", "");
    formBtn.innerHTML = '<ion-icon name="hourglass"></ion-icon><span>Sending...</span>';
    
    // Simulate sending and show success message
    setTimeout(() => {
      formBtn.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon><span>Message Sent!</span>';
      formBtn.style.backgroundColor = "#2ecc71";
      form.reset();
      
      setTimeout(() => {
        formBtn.innerHTML = originalButtonText;
        formBtn.style.backgroundColor = "";
        formBtn.setAttribute("disabled", "");
      }, 2000);
    }, 1000);
    
    // Send email to pathan772277@gmail.com (open email client)
    const fullname = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    const mailtoLink = `mailto:pathan772277@gmail.com?subject=Portfolio Contact from ${fullname}&body=From: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    // Open email client in background (optional)
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 500);
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

console.log("Found " + navigationLinks.length + " nav links");
console.log("Found " + pages.length + " pages");

// add event to all nav link
navigationLinks.forEach((link, index) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    
    const pageTarget = this.textContent.toLowerCase().trim();
    console.log("Clicked link, target page: " + pageTarget);
    
    // Deactivate all
    navigationLinks.forEach(l => l.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));
    
    // Activate clicked link
    this.classList.add("active");
    console.log("Activated link: " + pageTarget);
    
    // Activate corresponding page
    pages.forEach(p => {
      if (p.getAttribute("data-page") === pageTarget) {
        p.classList.add("active");
        console.log("Activated page: " + pageTarget);
      }
    });
    
    window.scrollTo(0, 0);
  });
});



// rotating role text under name
const roleElement = document.querySelector("[data-role-text]");
const roles = ["I'm interested in frontend development", "Freelancer (Graphic Design)"];

if (roleElement) {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      roleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = 100;

    if (isDeleting) {
      typeSpeed = 50;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}