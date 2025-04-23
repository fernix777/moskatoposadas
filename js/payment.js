// Configuración de Mercado Pago
const mercadopago = {
    PUBLIC_KEY: 'TEST-31b9b3cd-1c2d-4c3e-9f4a-5b6c7d8e9f0a',  // Clave pública de prueba actualizada
    PREFERENCE_URL: 'https://api.mercadopago.com/checkout/preferences',
    sandbox: true // Habilitar modo sandbox para pruebas
};

// Estado de la orden
const OrderStatus = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed'
};

// Función para inicializar el checkout de Mercado Pago
async function initMercadoPagoCheckout(cart) {
    try {
        // Validaciones detalladas del carrito
        if (!cart) {
            throw new Error('El carrito no existe');
        }
        if (!Array.isArray(cart)) {
            throw new Error('Formato de carrito inválido');
        }
        if (cart.length === 0) {
            throw new Error('El carrito está vacío');
        }
        
        // Validar items del carrito
        cart.forEach((item, index) => {
            if (!item.name || !item.price || !item.quantity) {
                throw new Error(`Item ${index + 1} del carrito es inválido`);
            }
            if (item.price <= 0 || item.quantity <= 0) {
                throw new Error(`Precio o cantidad inválida en item ${index + 1}`);
            }
        });

        // Crear items para la preferencia
        const items = cart.map(item => ({
            title: item.name,
            unit_price: parseFloat(item.price),
            quantity: item.quantity,
            currency_id: 'ARS'
        }));

        // Calcular total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Mostrar modal de procesamiento
        showProcessingModal();

        // Crear preferencia de pago
        const preference = {
            items,
            back_urls: {
                success: window.location.origin + '/success.html',
                failure: window.location.origin + '/failure.html',
                pending: window.location.origin + '/pending.html'
            },
            auto_return: 'approved',
            binary_mode: true,
            statement_descriptor: 'MOSKATO',
            external_reference: generateOrderId(),
            notification_url: window.location.origin + '/api/notifications',
            expires: true,
            expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
        };

        // Crear preferencia en Mercado Pago
        const response = await fetch(mercadopago.PREFERENCE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mercadopago.PUBLIC_KEY}`,
                'X-Idempotency-Key': generateOrderId() // Prevenir duplicados
            },
            body: JSON.stringify(preference)
        });

        if (!response.ok) {
            throw new Error('Error al crear la preferencia de pago');
        }

        const preferenceData = await response.json();

        // Iniciar checkout
        const mp = new MercadoPago(mercadopago.PUBLIC_KEY, {
            locale: 'es-AR'
        });
        const checkout = mp.checkout({
            preference: {
                id: preferenceData.id
            },
            render: {
                container: '#payment-container',
                label: 'Pagar con Mercado Pago',
                type: 'wallet'
            },
            theme: {
                elementsColor: '#2d3277',
                headerColor: '#2d3277'
            }
        });

        return checkout;

    } catch (error) {
        console.error('Error al inicializar el checkout:', error);
        showErrorMessage('No se pudo iniciar el proceso de pago');
        throw error;
    }
}

// Función para procesar pago en efectivo
function processCashPayment(orderData) {
    return new Promise((resolve, reject) => {
        try {
            // Validaciones detalladas
            if (!orderData) {
                throw new Error('No se proporcionaron datos de la orden');
            }
            if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
                throw new Error('El carrito está vacío o los datos de los items son inválidos');
            }
            if (!orderData.total || orderData.total <= 0) {
                throw new Error('El monto total de la orden es inválido');
            }
            if (!orderData.customer || !orderData.customer.email || !orderData.customer.name) {
                throw new Error('Los datos del cliente son requeridos (nombre y email)');
            }
            
            // Generar código de orden
            const orderId = generateOrderId();
            
            // Crear orden en estado pendiente
            const order = {
                id: orderId,
                status: OrderStatus.PENDING,
                payment_method: 'cash',
                total: orderData.total,
                items: orderData.items,
                customer: orderData.customer,
                created_at: new Date().toISOString()
            };

            // Guardar orden
            saveOrder(order);

            // Enviar confirmación por email
            sendOrderConfirmation(order);

            resolve(order);
        } catch (error) {
            reject(error);
        }
    });
}

// Función para procesar transferencia bancaria
function processBankTransfer(orderData) {
    return new Promise((resolve, reject) => {
        try {
            // Validaciones detalladas de datos
            if (!orderData) {
                throw new Error('No se proporcionaron datos de la orden');
            }
            if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
                throw new Error('El carrito está vacío o los datos de los items son inválidos');
            }
            if (!orderData.total || orderData.total <= 0) {
                throw new Error('El monto total de la orden es inválido');
            }
            if (!orderData.customer || typeof orderData.customer !== 'object') {
                throw new Error('Los datos del cliente son inválidos');
            }

            // Generar código de orden
            const orderId = generateOrderId();
            
            // Crear orden en estado pendiente
            const order = {
                id: orderId,
                status: OrderStatus.PENDING,
                payment_method: 'bank_transfer',
                total: orderData.total,
                items: orderData.items,
                customer: orderData.customer,
                bank_info: {
                    bank_name: 'Personal Pay',
                    account_number: '4-471-0941349947-2',
                    cbu: '0000076500000015778565',
                    alias: 'fbettiol1.ppay'
                },
                created_at: new Date().toISOString(),
                validation_status: 'validated'
            };

            // Guardar orden
            try {
                saveOrder(order);
            } catch (saveError) {
                console.error('Error al guardar la orden:', saveError);
                throw new Error('No se pudo guardar la orden de pago');
            }

            // Enviar instrucciones por email
            try {
                sendBankTransferInstructions(order);
            } catch (emailError) {
                console.error('Error al enviar instrucciones:', emailError);
                // No interrumpimos el proceso si falla el envío de email
            }

            resolve(order);
        } catch (error) {
            console.error('Error en procesamiento de transferencia:', error);
            reject(new Error('No se pudo procesar la transferencia: ' + error.message));
        }
    });
}

// Funciones auxiliares
function generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function showProcessingModal() {
    const modal = document.createElement('div');
    modal.className = 'processing-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Procesando pago...</span>
            </div>
            <p>Procesando su pago, por favor espere...</p>
        </div>
    `;
    document.body.appendChild(modal);
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.role = 'alert';
    errorDiv.textContent = message;
    document.getElementById('payment-container').appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

function saveOrder(order) {
    try {
        if (!order || !order.id) {
            throw new Error('Datos de orden inválidos');
        }
        localStorage.setItem(`order_${order.id}`, JSON.stringify(order));
        console.log('Orden guardada exitosamente:', order.id);
    } catch (error) {
        console.error('Error al guardar la orden:', error);
        throw new Error('No se pudo guardar la información de la orden');
    }
}

function sendOrderConfirmation(order) {
    // Implementar lógica de envío de confirmación
}

function sendBankTransferInstructions(order) {
    // Implementar lógica de envío de instrucciones
}

// Exportar funciones
export {
    initMercadoPagoCheckout,
    processCashPayment,
    processBankTransfer,
    OrderStatus
};