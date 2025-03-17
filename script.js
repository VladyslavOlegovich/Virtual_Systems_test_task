// Header Section - open/close burger menu
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".nav-menu");

  burger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll(".nav-menu ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
});

// FAQ Section - open/close question el
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.maxHeight = "0";
        }
      });

      item.classList.toggle("active");

      if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = "0";
      }
    });
  });
});

// form
document.addEventListener("DOMContentLoaded", function () {
  const openFormBtn = document.getElementById("openFormBtn");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  let isSubmitted = false;

  if (
    !modal ||
    !openFormBtn ||
    !closeBtn ||
    !form ||
    !nameInput ||
    !emailInput ||
    !messageInput
  ) {
    console.error("One or more elements not found in the DOM");
    return;
  }

  const validateField = (
    input,
    regex,
    minLength,
    errorElement,
    errorMessage
  ) => {
    let isValid = true;

    if (input.value.trim() === "") {
      errorElement.textContent = "This field cannot be empty.";
      errorElement.classList.add("visible");
      input.classList.add("invalid");
      input.classList.remove("valid");
      return false;
    }

    if (input === nameInput) {
      if (!regex.test(input.value) || input.value.length < minLength) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("visible");
        input.classList.add("invalid");
        input.classList.remove("valid");
        isValid = false;
      } else {
        errorElement.textContent = "";
        errorElement.classList.remove("visible");
        input.classList.remove("invalid");
        input.classList.add("valid");
      }
    } else if (input === emailInput) {
      if (!regex.test(input.value)) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("visible");
        input.classList.add("invalid");
        input.classList.remove("valid");
        isValid = false;
      } else {
        errorElement.textContent = "";
        errorElement.classList.remove("visible");
        input.classList.remove("invalid");
        input.classList.add("valid");
      }
    } else if (input === messageInput) {
      if (input.value.length < minLength) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("visible");
        input.classList.add("invalid");
        input.classList.remove("valid");
        isValid = false;
      } else {
        errorElement.textContent = "";
        errorElement.classList.remove("visible");
        input.classList.remove("invalid");
        input.classList.add("valid");
      }
    }

    return isValid;
  };

  const validateForm = () => {
    let isValid = true;

    // Validation for Name (letters only, min 2 characters, including Ukrainian)
    const nameRegex = /^[A-Za-zА-Яа-я\s'’]+$/;
    if (
      !validateField(
        nameInput,
        nameRegex,
        2,
        nameError,
        "Name must contain only letters and be at least 2 characters long."
      )
    ) {
      isValid = false;
    }

    // Validation for Email (valid format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !validateField(
        emailInput,
        emailRegex,
        0,
        emailError,
        "Please enter a valid email address."
      )
    ) {
      isValid = false;
    }

    // Validation for Message (min 10 characters)
    if (
      !validateField(
        messageInput,
        null,
        10,
        messageError,
        "Message must be at least 10 characters long."
      )
    ) {
      isValid = false;
    }

    return isValid;
  };

  // Open modal
  openFormBtn.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  // Close modal
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    form.reset();
    nameInput.classList.remove("invalid", "valid");
    emailInput.classList.remove("invalid", "valid");
    messageInput.classList.remove("invalid", "valid");
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    nameError.classList.remove("visible");
    emailError.classList.remove("visible");
    messageError.classList.remove("visible");
    isSubmitted = false;
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      form.reset();
      nameInput.classList.remove("invalid", "valid");
      emailInput.classList.remove("invalid", "valid");
      messageInput.classList.remove("invalid", "valid");
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      nameError.classList.remove("visible");
      emailError.classList.remove("visible");
      messageError.classList.remove("visible");
      isSubmitted = false;
    }
  });

  // Form validation on submit
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    isSubmitted = true;

    const isValid = validateForm();

    if (isValid) {
      alert("Form submitted successfully!");
      form.reset();
      modal.style.display = "none";
      nameInput.classList.remove("invalid", "valid");
      emailInput.classList.remove("invalid", "valid");
      messageInput.classList.remove("invalid", "valid");
      isSubmitted = false;
    }
  });

  // Validation on blur (after first submit)
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("blur", function () {
      if (isSubmitted) {
        if (input === nameInput) {
          const nameRegex = /^[A-Za-zА-Яа-я\s'’]+$/;
          validateField(
            nameInput,
            nameRegex,
            2,
            nameError,
            "Name must contain only letters and be at least 2 characters long."
          );
        } else if (input === emailInput) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          validateField(
            emailInput,
            emailRegex,
            0,
            emailError,
            "Please enter a valid email address."
          );
        } else if (input === messageInput) {
          validateField(
            messageInput,
            null,
            10,
            messageError,
            "Message must be at least 10 characters long."
          );
        }
      }
    });
  });
});
