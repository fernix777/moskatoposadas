// Funciones para el manejo del carrito de compras

// Inicializar carrito desde localStorage o crear uno nuevo
let cart = JSON.parse(localStorage.getItem('moskato_cart')) || [];

// Actualizar contador del carrito
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('moskato_cart', JSON.stringify(cart));
    updateCartCount();
}

// Manejar evento de añadir al carrito
function handleAddToCart(event) {
    const button = event.target.closest('.add-to-cart');
    if (!button) return;
    
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const image = button.dataset.image;
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex > -1) {
        // Incrementar cantidad si ya existe
        cart[existingItemIndex].quantity += 1;
    } else {
        // Agregar nuevo item al carrito
        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
        });
    }
    
    // Guardar carrito y mostrar mensaje
    saveCart();
    showNotification(`${name} añadido al carrito`);
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'toast show';
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#28a745';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.textContent = message;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Inicializar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar contador del carrito
    updateCartCount();
    
    // Cargar productos destacados en la página principal
    if (typeof loadFeaturedProducts === 'function') {
        loadFeaturedProducts();
    }
    
    // Cargar todos los productos en la página de productos
    if (typeof loadAllProducts === 'function') {
        loadAllProducts();
    }
    
    // Inicializar eventos para los botones de añadir al carrito en la página actual
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // Inicializar página de carrito si estamos en ella
    if (window.location.pathname.includes('carrito.html')) {
        loadCartItems();
    }
    
    // Inicializar página de producto individual si estamos en ella
    if (window.location.pathname.includes('producto.html')) {
        loadProductDetails();
    }
});

// Función para cargar los items del carrito en la página de carrito
function loadCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="alert alert-info">Tu carrito está vacío</div>';
        if (cartTotalElement) cartTotalElement.textContent = '0.00';
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
        <div class="cart-item row align-items-center">
            <div class="col-md-2">
                <img src="${item.image}" alt="${item.name}" class="img-fluid">
            </div>
            <div class="col-md-4">
                <h5>${item.name}</h5>
            </div>
            <div class="col-md-2">
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="col-md-2">
                <div class="input-group">
                    <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-id="${item.id}">-</button>
                    <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                    <button class="btn btn-sm btn-outline-secondary increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="col-md-1">
                <p>$${itemTotal.toFixed(2)}</p>
            </div>
            <div class="col-md-1">
                <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    
    if (cartTotalElement) {
        cartTotalElement.textContent = total.toFixed(2);
    }
    
    // Añadir eventos a los botones de incrementar/decrementar/eliminar
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += 1;
                saveCart();
                loadCartItems(); // Recargar items
            }
        });
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const item = cart.find(item => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCart();
                loadCartItems(); // Recargar items
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            cart = cart.filter(item => item.id !== id);
            saveCart();
            loadCartItems(); // Recargar items
        });
    });
}

// Función para cargar detalles de un producto individual
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) return;
    
    // Buscar el producto en el array de productos
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('product-details').innerHTML = 
            '<div class="alert alert-danger">Producto no encontrado</div>';
        return;
    }
    
    // Mostrar detalles del producto
    const productDetailsHTML = `
    <div class="row">
        <div class="col-md-6">
            <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
        </div>
        <div class="col-md-6">
            <h2>${product.name}</h2>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <p><strong>Categoría:</strong> ${product.category === 'alcoholicas' ? 'Bebidas Alcohólicas' : 'Bebidas No Alcohólicas'}</p>
            <p><strong>Disponibilidad:</strong> ${product.stock > 0 ? `${product.stock} unidades en stock` : 'Agotado'}</p>
            
            <div class="d-flex align-items-center mt-4">
                <div class="input-group me-3" style="width: 130px;">
                    <button class="btn btn-outline-secondary" id="decrease-qty">-</button>
                    <input type="text" class="form-control text-center" id="product-quantity" value="1" readonly>
                    <button class="btn btn-outline-secondary" id="increase-qty">+</button>
                </div>
                
                <button class="btn btn-primary add-to-cart-detail" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
                    <i class="fas fa-shopping-cart"></i> Añadir al Carrito
                </button>
            </div>
        </div>
    </div>
    `;
    
    document.getElementById('product-details').innerHTML = productDetailsHTML;
    
    // Añadir eventos a los botones
    document.getElementById('increase-qty').addEventListener('click', function() {
        const qtyInput = document.getElementById('product-quantity');
        let qty = parseInt(qtyInput.value);
        if (qty < product.stock) {
            qtyInput.value = qty + 1;
        }
    });
    
    document.getElementById('decrease-qty').addEventListener('click', function() {
        const qtyInput = document.getElementById('product-quantity');
        let qty = parseInt(qtyInput.value);
        if (qty > 1) {
            qtyInput.value = qty - 1;
        }
    });
    
    document.querySelector('.add-to-cart-detail').addEventListener('click', function() {
        const qtyInput = document.getElementById('product-quantity');
        const quantity = parseInt(qtyInput.value);
        
        // Verificar si el producto ya está en el carrito
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex > -1) {
            // Incrementar cantidad si ya existe
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Agregar nuevo item al carrito
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        // Guardar carrito y mostrar mensaje
        saveCart();
        showNotification(`${product.name} añadido al carrito`);
    });
}

// Función para procesar el checkout
function processCheckout() {
    // Aquí se implementaría la lógica para procesar el pago
    // Por ahora, solo mostraremos un mensaje y vaciaremos el carrito
    
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Simulación de procesamiento de pago
    alert('¡Gracias por tu compra! Tu pedido ha sido procesado correctamente.');
    
    // Vaciar carrito
    cart = [];
    saveCart();
    
    // Redirigir a la página principal
    window.location.href = 'index.html';
}