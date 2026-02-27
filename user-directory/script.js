async function fetchUsers() {
  const container = document.getElementById("user-container");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();

    users.slice(0, 6).forEach(user => {
      const card = document.createElement("div");
      card.className = "card";

      // Ambil inisial dari nama
      const initials = user.name.split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

      card.innerHTML = `
        <div class="initials">${initials}</div>
        <h2>${user.name}</h2>
        <p>Email: ${user.email}</p>
        <p>Perusahaan: ${user.company.name}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = "<p>Maaf, data gagal dimuat</p>";
    console.error(error);
  }
}

fetchUsers();