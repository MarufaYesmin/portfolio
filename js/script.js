document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio Website Loaded Successfully!");

  const menuToggle = document.getElementById("menuToggle");
  const navbarMenu = document.getElementById("navbarMenu");

  if (menuToggle && navbarMenu && typeof bootstrap !== "undefined") {
    const navbarCollapse = new bootstrap.Collapse(navbarMenu, { toggle: false });

    menuToggle.addEventListener("click", function () {
      navbarMenu.classList.contains("show") ? navbarCollapse.hide() : navbarCollapse.show();
    });

    navbarMenu.addEventListener("show.bs.collapse", function () {
      menuToggle.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
    });

    navbarMenu.addEventListener("hide.bs.collapse", function () {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });

    navbarMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 992) navbarCollapse.hide();
      });
    });
  }

  const navLinks = document.querySelectorAll(".custom-navbar .nav-link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) { item.classList.remove("active"); });
      link.classList.add("active");
    });
  });

  const projectContainer = document.getElementById("projectContainer");
  if (projectContainer && Array.isArray(projects)) {
    projectContainer.innerHTML = projects.map(function (project) {
      const technologyTags = project.technologies.map(function (technology) {
        return `<span>${technology}</span>`;
      }).join("");

      return `
        <div class="col-md-6 col-lg-4">
          <article class="project-card">
            <div class="project-image">
              <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-body">
              <span class="project-category">${project.category}</span>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <div class="project-tech">${technologyTags}</div>
              <div class="project-links">
                <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
                <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Source Code</a>
              </div>
            </div>
          </article>
        </div>`;
    }).join("");
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const subject = document.getElementById("contactSubject").value.trim();
      const message = document.getElementById("contactMessage").value.trim();

      const receiverEmail = "your-email@example.com";
      const mailSubject = encodeURIComponent(subject);
      const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

      window.location.href = `mailto:${receiverEmail}?subject=${mailSubject}&body=${mailBody}`;
    });
  }

  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = new Date().getFullYear();
});
