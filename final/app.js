document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".grocery-form");
  const groceryInput = document.getElementById("grocery");
  const priceInput = document.getElementById("price");
  const categoryInput = document.getElementById("category");
  const groceryContainer = document.querySelector(".grocery-list");
  const totalPriceElement = document.getElementById("total-price");
  const paymentMessage = document.getElementById("payment-message");

  let groceryList = [];
  let totalPrice = 0;

  // Function to update the total price
  function updateTotalPrice() {
    totalPrice = groceryList.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Function to add item
  function addItem(name, price, category) {
    const item = { id: Date.now(), name, price: parseFloat(price), category };
    groceryList.push(item);
    renderList();
    updateTotalPrice();
  }

  // Function to render the grocery list
  function renderList() {
    groceryContainer.innerHTML = "";
    groceryList.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("grocery-item");
      itemElement.innerHTML = `
        <span>${item.name} - ${item.category}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button class="delete-btn">Delete</button>
      `;

      // Delete button functionality
      itemElement.querySelector(".delete-btn").addEventListener("click", () => {
        groceryList = groceryList.filter((i) => i.id !== item.id);
        renderList();
        updateTotalPrice();
      });

      groceryContainer.appendChild(itemElement);
    });
  }

  // Form submission event listener
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = groceryInput.value.trim();
    const price = priceInput.value;
    const category = categoryInput.value;

    if (name && price && category) {
      addItem(name, price, category);
      groceryInput.value = "";
      priceInput.value = "";
    }
  });

  // Clear All button functionality
  document.querySelector(".clear-btn").addEventListener("click", () => {
    groceryList = [];
    renderList();
    updateTotalPrice();
    paymentMessage.textContent = "";
  });

  // Sort by Price button functionality
  document.querySelector(".sort-btn").addEventListener("click", () => {
    groceryList.sort((a, b) => a.price - b.price);
    renderList();
  });

  // Pay Now button functionality
  document.querySelector(".pay-btn").addEventListener("click", () => {
    if (totalPrice > 0) {
      paymentMessage.textContent = "Payment Successful!";
      paymentMessage.classList.remove("error");
      paymentMessage.classList.add("success");
    } else {
      paymentMessage.textContent = "No items to pay for!";
      paymentMessage.classList.remove("success");
      paymentMessage.classList.add("error");
    }
  });
});
