
const itemsPerPage = 5;

let currentPage = 1;

// Actieve filtercategorie (standaard = alles)
let activeCategory = "all";

let sortOrder = null;

// producten weergeven op de pagina
function displayProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // leeg maken voor nieuwe inhoud

  // Filter
  let filtered = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory);


  if (sortOrder === "asc") {
    filtered.sort((a, b) => a.sugar - b.sugar);
  } else if (sortOrder === "desc") {
    filtered.sort((a, b) => b.sugar - a.sugar);
  }

  // Paginering
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const itemsToShow = filtered.slice(start, end);

  // HTML genereren
  itemsToShow.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";

 
    card.id = `product-${item.id}`;

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="150" />
      <h3>${item.name}</h3>
      <p>Categorie: ${item.category}</p>
      <p>Suikergehalte: ${item.sugar}g</p>
    `;
    container.appendChild(card);
  });

  updatePagination(filtered.length);
}

// sorteerfunctie 
function sortItems(order) {
  sortOrder = order;
  displayProducts();
}

// filter
document.getElementById("categoryFilter").addEventListener("change", e => {
  activeCategory = e.target.value;
  currentPage = 1; 
  displayProducts();
});

// paginering bijwerken
function updatePagination(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active" : "";
    btn.addEventListener("click", () => {
      currentPage = i;
      displayProducts();
    });
    pagination.appendChild(btn);
  }
}


window.addEventListener("DOMContentLoaded", () => {
  displayProducts();
});
