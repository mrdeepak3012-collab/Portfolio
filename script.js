// ---------- Typing Effect ----------
const roles = [
  "Front-End Developer  ",
  "Web Developer  ",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typedText = document.getElementById("typed-text");

function typeEffect() {
  if (!typedText) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedText.textContent = currentRole.substring(0, charIndex--);
  } else {
    typedText.textContent = currentRole.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 100;

  // Full word typed
  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1500;
    isDeleting = true;
  }

  // Full word deleted
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();



// ---------- Scroll Reveal ----------
const revealElements = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right, .reveal-fade"
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();



// ---------- Scroll To Top ----------
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }

  });


  scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}



// ---------- Active Navbar Link ----------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar .nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }

  });


  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }

  });

});



// =====================================================
// CONTACT FORM -> FORMSUBMIT
// =====================================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

  contactForm.addEventListener("submit", (e) => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();


    // ---------- Validation ----------
    if (!name || !email || !subject || !message) {

      e.preventDefault();

      if (formStatus) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.style.color = "red";
      }

      return;
    }


    // ---------- Email Validation ----------
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

      e.preventDefault();

      if (formStatus) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.style.color = "red";
      }

      return;
    }


    // ---------- Success Message ----------
    if (formStatus) {
      formStatus.textContent = "Sending message...";
      formStatus.style.color = "green";
    }

    
  });

}

  /* ---------- 7. CONTACT FORM -> SEND TO EMAIL ---------- */

  const RECEIVER_EMAIL = "mrdeepak3012@gmail.com"; // Deepak's email

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameEl = document.getElementById("name");
      const emailEl = document.getElementById("email");
      const subjectEl = document.getElementById("subject");
      const messageEl = document.getElementById("message");

      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const subject = subjectEl.value.trim();
      const message = messageEl.value.trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        showStatus("⚠️ Please fill in all fields.", "text-warning");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showStatus("⚠️ Please enter a valid email address.", "text-warning");
        return;
      }

      // Build mailto link — opens user's email app with everything pre-filled,
      // addressed to Deepak's email, ready to hit Send.
      const mailSubject = encodeURIComponent(`Portfolio Contact: ${subject}`);
      const mailBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      const mailtoLink = `mailto:${RECEIVER_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

      window.location.href = mailtoLink;

      showStatus("✅ Opening your email app... Please hit Send to complete!", "text-success");

      contactForm.reset();
    });
  }

  function showStatus(msg, className) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `mt-3 mb-0 text-center ${className}`;

    setTimeout(() => {
      formStatus.textContent = "";
      formStatus.className = "mt-3 mb-0 text-center";
    }, 5000);
  }

