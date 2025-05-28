
  const products = [
    {
      id: 1,
      name: "T-Shirt",
      price: 200,
      image: "images/high-angle-man-with-headphones.jpg"
    },
    {
      id: 2,
      name: "Sneakers",
      price: 400,
      image: "images/f8c6b24a-1685-4e04-a8b8-3fd2ee3a469c.jpg"
      
    },
    {
      id: 3,
      name: "Jeans",
      price: 250,
      image: "https://images.unsplash.com/photo-1583001500969-8b6f82c9ff31?auto=format&fit=crop&w=400&q=80"
    }
  ];
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    saveCart();
    updateCartUI();
  }
  
  function updateCartUI() {
    const cartButton = document.getElementById("view-cart");
    cartButton.textContent = `Cart (${cart.length})`;
  
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ZMK{item.price.toFixed(2)}`;
      cartItems.appendChild(li);
      total += item.price;
    });
  
    document.getElementById("cart-total").textContent = `Total: ZMK{total.toFixed(2)}`;
  }
  
  function displayProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>jeans{ZMK200}
        <p>sneakers{ZMK400}
        <p>Tshirts{ZMK100}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCartUI();
  
    const cartModal = document.getElementById("cart-modal");
    const checkoutForm = document.getElementById("checkout-form");
  
    document.getElementById("view-cart").addEventListener("click", () => {
      cartModal.classList.remove("hidden");
    });
  
    document.getElementById("close-cart").addEventListener("click", () => {
      cartModal.classList.add("hidden");
    });
  
    document.getElementById("checkout-button").addEventListener("click", () => {
      cartModal.classList.add("hidden");
      checkoutForm.classList.remove("hidden");
    });
  
    document.getElementById("close-checkout").addEventListener("click", () => {
      checkoutForm.classList.add("hidden");
    });
  
    document.getElementById("form").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your purchase!");
      cart = [];
      saveCart();
      updateCartUI();
      checkoutForm.classList.add("hidden");
    });
  }); 
  