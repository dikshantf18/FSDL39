document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const cartLink = document.getElementById('cart-link');
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentModal = document.getElementById('payment-modal');
    const paymentForm = document.getElementById('payment-form');
    const categoryFilter = document.getElementById('category');
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const cartCount = document.getElementById('cart-count');

    let products = [];
    let cart = [];

    // Fetch products from the API
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
        });

    function displayProducts(productsToShow) {
        productsContainer.innerHTML = '';
        productsToShow.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
    }

    function createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;

        return productDiv;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCartCount();
            alert(`${product.title} added to cart!`);
        }
    }

    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function displayCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>${item.title} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(itemDiv);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    function removeFromCart(productId) {
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCartCount();
            displayCart();
        }
    }

    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        displayCart();
        cartModal.style.display = 'block';
    });

    checkoutBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
        paymentModal.style.display = 'block';
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Payment successful! Thank you for your purchase.');
        paymentModal.style.display = 'none';
        cart = [];
        updateCartCount();
    });

    // Close modals when clicking on the close button or outside the modal
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            cartModal.style.display = 'none';
            paymentModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal || e.target === paymentModal) {
            cartModal.style.display = 'none';
            paymentModal.style.display = 'none';
        }
    });

    // Event delegation for dynamically added buttons
    productsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id, 10);
            addToCart(productId);
        }
    });

    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(e.target.dataset.id, 10);
            removeFromCart(productId);
        }
    });

    // Filter functionality
    priceRange.addEventListener('input', () => {
        priceDisplay.textContent = `$${priceRange.value}`;
    });

    applyFiltersBtn.addEventListener('click', () => {
        const selectedCategory = categoryFilter.value;
        const maxPrice = Number.parseInt(priceRange.value, 10);

        const filteredProducts = products.filter(product => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            const priceMatch = product.price <= maxPrice;
            return categoryMatch && priceMatch;
        });

        displayProducts(filteredProducts);
    });
});
