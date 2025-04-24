// Datos de productos
const products = [
    // Bebidas Alcohólicas
    {
        id: 'a1',
        name: 'Vino Otro Loco Mas Malbec',
        description: 'Vino tinto Malbec de alta calidad, elaborado con uvas seleccionadas de los mejores viñedos argentinos. Presenta notas intensas de frutos rojos maduros, especias y un sutil toque de vainilla. Su crianza en barricas de roble francés le otorga complejidad y estructura. Ideal para acompañar carnes rojas, pastas con salsas intensas y quesos maduros.',
        price: 4400,
        category: 'alcoholicas',
        image: '/img/bebidas-alcoholicas/otro_loco_mas.jpg',
        featured: true,
        stock: 15
    },
    {
        id: 'a2',
        name: 'Fernet Branca x 750ml',
        description: 'Fernet Branca es un aperitivo italiano amargo elaborado a partir de una mezcla de hierbas y especias. Con un sabor distintivo y complejo, es perfecto para cócteles clásicos como el Fernet con Cola. Su receta única incluye más de 27 hierbas diferentes, raíces y especias. Ideal para después de las comidas o como digestivo.',
        price: 12900,
        category: 'alcoholicas',
        image: 'img/bebidas-alcoholicas/Fernet-Branca-Amaro.png',
        featured: true,
        stock: 10
    },
    {
        id: 'a3',
        name: 'Vino Corderos x 750ml',
        description: 'Vino Cordero Malbec.',
        price: 4900,
        category: 'alcoholicas',
        image: 'img/bebidas-alcoholicas/Vinho-Cordero-Con-Piel-De-Lobo-750-mlok.png',
        featured: false,
        stock: 10
    },
    {
        id: 'a4',
        name: ' Absolute Vodka x 750ml',
        description: 'Vodka premium con botánicos seleccionados, ideal para cócteles sofisticados y servicio de delivery 24 horas.',
        price: 23000,
        category: 'alcoholicas',
        image: 'img/bebidas-alcoholicas/Absolut_vodka.jpeg',
        featured: false,
        stock: 15
    },
    {
        id: 'a5',
        name: 'Vodka Sky',
        description: 'Vodka de alta calidad, destilado cinco veces para mayor pureza. Disponible en nuestro servicio de delivery cerca de tu ubicación.',
        price: 7500,
        category: 'alcoholicas',
        image: '/img/bebidas-alcoholicas/vodkasky.webp',
        featured: true,
        stock: 18
    },
    {
        id: 'a6',
        name: 'Aperol Spritz',
        description: 'Aperol Spritz es un cóctel italiano refrescante elaborado con Aperol, prosecco y agua con gas. Con su característico color naranja y sabor agridulce, es perfecto para momentos de aperitivo. Ideal para servir con hielo y una rodaja de naranja.',
        price: 7900,
        category: 'alcoholicas',
        image: 'img/bebidas-alcoholicas/aperolSpritz.jpg',
        featured: false,
        stock: 30
    },
    {
        id: 'a7',
        name: 'Buhero Fernet x 750 ml',
        description: 'Botella de Fernet Buhero x 750 ml, de suave fermentación. Ideal para acompañar comidas o como aperitivo.',
        price: 8500,
        category: 'alcoholicas',
        image: 'img/bebidas-alcoholicas/BuheroNegro.jpg',
        featured: false,
        stock: 20
    

    },
    {
        id: 'a8',
        name: 'Campari',
        description: 'Campari es un aperitivo italiano compuesto por un extracto de campari, un tipo de naranja, y agua con gas. Es una bebida refrescante y sofisticada, perfecta para acompañar comidas o como aperitivo.',
        price: 8500,
        category: 'alcoholicas',
        image: 'img/bebidas-alcoholicas/Campari.jpeg',
        featured: false,
        stock: 25
        },

    {
        id: 'a9',
        name: 'Fernet Branca x 450ml',
        description: 'Fernet branca x450 ml.',
        price: 8900,
        category: 'alcoholicas',
        image: 'img/bebidas-alcoholicas/fernetBranca450.png',
        featured: false, 
    },

    {
        id: 'a10',
        name: 'Gancia x 1250 ml',
        description: 'Aperitivo Gancia x 1250 ml',
        price: 6500,
        category: 'alcoholicas',
        image: 'img/bebidas-alcoholicas/gancia_1250.jpg',
        featured: false, 
    },
    
    // Bebidas No Alcohólicas
    {
        id: 'na1',
        name: 'Agua Mineral 2L',
        description: 'Agua mineral natural sin gas, de manantial. Pedí delivery las 24 horas desde nuestra tienda online.',
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
        price: 3400,
        category: 'no-alcoholicas',
        image: 'img/bebidas-sin-alcohol/coca-2.25.jpg',
        featured: true,
        stock: 40
    },
    {
        id: 'na3',
        name: 'Jugo de Naranja Natural 1L',
        description: 'Jugo de naranja 100% natural, sin conservantes ni azúcares añadidos.',
        price: 750,
        category: 'no-alcoholicas',
        image: 'img/bebidas-sin-alcohol/tarjetaBebidas.webp',
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
        image: 'img/bebidas-sin-alcohol/coca-vidrio.webp',
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
                    <a href="productos.html?categoria=${product.category}" class="btn btn-outline-primary btn-sm">Ver Categoría</a>
                </div>
            </div>
        </div>
        `;
    });
    
    featuredContainer.innerHTML = productsHTML;
}

// Inicializar carga de productos cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    loadAllProducts();
});

// Función para cargar todos los productos
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
                    <p class="card-text">${product.description}</p>
                    <a href="https://wa.me/5493764761039?text=Hola, me interesa el producto: ${encodeURIComponent(product.name)} - Precio: $${product.price}" 
                       class="btn btn-success btn-sm w-100 mb-2">
                       <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
                    </a>
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