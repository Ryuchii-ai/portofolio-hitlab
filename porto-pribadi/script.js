// Dark Mode Toggle
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "Toggle Dark Mode";
document.querySelector("header").appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Form Handling
const form = document.querySelector("#contact form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const nama = document.querySelector("#nama").value;
  const pesanKonfirmasi = document.createElement("p");
  pesanKonfirmasi.textContent = `Halo ${nama}, pesan Anda berhasil terkirim!`;
  
  form.appendChild(pesanKonfirmasi);
});

// Smooth Scroll
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});