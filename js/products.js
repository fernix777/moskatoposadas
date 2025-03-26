// Datos de productos
const products = [
    // Bebidas Alcohólicas
    {
        id: 'a1',
        name: 'Vino Malbec Premium',
        description: 'Vino tinto Malbec de alta calidad, con notas de frutos rojos y un final persistente.',
        price: 2500,
        category: 'alcoholicas',
        image: 'img/products/vino-malbec.jpg',
        featured: true,
        stock: 24
    },
    {
        id: 'a2',
        name: 'Cerveza Artesanal IPA',
        description: 'Cerveza artesanal estilo IPA con intenso sabor a lúpulo y notas cítricas.',
        price: 850,
        category: 'alcoholicas',
        image: 'img/products/cerveza-ipa.jpg',
        featured: true,
        stock: 48
    },
    {
        id: 'a3',
        name: 'Whisky Escocés 12 años',
        description: 'Whisky escocés añejado por 12 años en barricas de roble, con sabor suave y ahumado.',
        price: 8500,
        category: 'alcoholicas',
        image: 'img/products/whisky.jpg',
        featured: false,
        stock: 10
    },
    {
        id: 'a4',
        name: 'Gin Premium',
        description: 'Gin premium con botánicos seleccionados, ideal para cócteles sofisticados.',
        price: 4200,
        category: 'alcoholicas',
        image: 'img/products/gin.jpg',
        featured: false,
        stock: 15
    },
    {
        id: 'a5',
        name: 'Vodka Importado',
        description: 'Vodka de alta calidad, destilado cinco veces para mayor pureza.',
        price: 3800,
        category: 'alcoholicas',
        image: 'img/products/vodka.jpg',
        featured: true,
        stock: 18
    },
    {
        id: 'a6',
        name: 'Fernet',
        description: 'El clásico aperitivo italiano, perfecto para combinar.',
        price: 2200,
        category: 'alcoholicas',
        image: 'img/products/fernet.jpg',
        featured: false,
        stock: 30
    },
    
    // Bebidas No Alcohólicas
    {
        id: 'na1',
        name: 'Agua Mineral 2L',
        description: 'Agua mineral natural sin gas, de manantial.',
        price: 350,
        category: 'no-alcoholicas',
        image: 'img/products/agua.jpg',
        featured: false,
        stock: 50
    },
    {
        id: 'na2',
        name: 'Gaseosa Cola 2.25L',
        description: 'Refresco sabor cola, ideal para acompañar comidas.',
        price: 650,
        category: 'no-alcoholicas',
        image: 'img/products/gaseosa-cola.jpg',
        featured: true,
        stock: 40
    },
    {
        id: 'na3',
        name: 'Jugo de Naranja Natural 1L',
        description: 'Jugo de naranja 100% natural, sin conservantes ni azúcares añadidos.',
        price: 750,
        category: 'no-alcoholicas',
        image: 'img/products/jugo-naranja.jpg',
        featured: true,
        stock: 25
    },
    {
        id: 'na4',
        name: 'Energizante 473ml',
        description: 'Bebida energizante con taurina y cafeína.',
        price: 550,
        category: 'no-alcoholicas',
        image: 'img/products/energizante.jpg',
        featured: false,
        stock: 35
    },
    {
        id: 'na5',
        name: 'Agua Saborizada 1.5L',
        description: 'Agua saborizada sin gas, baja en calorías.',
        price: 450,
        category: 'no-alcoholicas',
        image: 'img/products/agua-saborizada.jpg',
        featured: false,
        stock: 30
    },
    {
        id: 'na6',
        name: 'Gaseosa Lima Limón 2.25L',
        description: 'Refresco con sabor a lima limón, refrescante y burbujeante.',
        price: 650,
        category: 'no-alcoholicas',
        image: 'img/products/gaseosa-lima.jpg',
        featured: true,
        stock: 38
    }
];

// Función para cargar productos destacados en la página principal
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    const featuredProducts = products.filter(product => product.featured);
    
    let productsHTML = '';
    
    featuredProducts.forEach(product => {
        productsHTML += `
        <div class="col-md-4 mb-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <a href="producto.html?id=${product.id}" class="btn btn-outline-primary btn-sm">Ver Detalles</a>
                    <button class="btn btn-primary btn-sm add-to-cart" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.price}" 
                        data-image="${product.image}">
                        <i class="fas fa-shopping-cart"></i> Añadir
                    </button>
                </div>
            </div>
        </div>
        `;
    });
    
    featuredContainer.innerHTML = productsHTML;
    
    // Inicializar eventos para los botones de añadir al carrito
    const addToCartButtons = featuredContainer.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Usar la función del main.js
            if (typeof handleAddToCart === 'function') {
                handleAddToCart(event);
            }
        });
    });
}

// Función para cargar todos los productos en la página de productos
function loadAllProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    // Obtener categoría de la URL si existe
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('categoria');
    
    // Filtrar productos por categoría si se especifica
    let filteredProducts = products;
    if (categoryParam) {
        filteredProducts = products.filter(product => product.category === categoryParam);
        
        // Actualizar título de la página según la categoría
        const categoryTitle = document.getElementById('category-title');
        if (categoryTitle) {
            categoryTitle.textContent = categoryParam === 'alcoholicas' ? 'Bebidas Alcohólicas' : 'Bebidas No Alcohólicas';
        }
    }
    
    let productsHTML = '';
    
    filteredProducts.forEach(product => {
        productsHTML += `
        <div class="col-md-4 mb-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="small text-muted">${product.description.substring(0, 60)}...</p>
                    <a href="producto.html?id=${product.id}" class="btn btn-outline-primary btn-sm">Ver Detalles</a>
                    <button class="btn btn-primary btn-sm add-to-cart" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.price}" 
                        data-image="${product.image}">
                        <i class="fas fa-shopping-cart"></i> Añadir
                    </button>
                </div>
            </div>
        </div>
        `;
    });
    
    productsContainer.innerHTML = productsHTML;
    
    // Inicializar eventos para los botones de añadir al carrito
    const addToCartButtons = productsContainer.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Usar la función del main.js
            if (typeof handleAddToCart === 'function') {
                handleAddToCart(event);
            }
        });
    });
}