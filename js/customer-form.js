// Formulario de datos del cliente
function showCustomerForm() {
    const formHtml = `
        <div class="customer-form-modal">
            <div class="modal-content p-4">
                <h3>Datos del Cliente</h3>
                <form id="customer-data-form" class="mt-3">
                    <div class="mb-3">
                        <label for="customer-name" class="form-label">Nombre completo</label>
                        <input type="text" class="form-control" id="customer-name" required>
                    </div>
                    <div class="mb-3">
                        <label for="customer-email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="customer-email" required>
                    </div>
                    <div class="mb-3">
                        <label for="customer-phone" class="form-label">Teléfono</label>
                        <input type="tel" class="form-control" id="customer-phone" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Continuar con el pago</button>
                </form>
            </div>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = formHtml;
    document.body.appendChild(modalContainer);

    return new Promise((resolve, reject) => {
        document.getElementById('customer-data-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const customerData = {
                name: document.getElementById('customer-name').value,
                email: document.getElementById('customer-email').value,
                phone: document.getElementById('customer-phone').value
            };
            modalContainer.remove();
            resolve(customerData);
        });
    });
}

// Estilos para el modal
const styles = document.createElement('style');
styles.textContent = `
    .customer-form-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .customer-form-modal .modal-content {
        background: white;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
    }
`;

document.head.appendChild(styles);

export { showCustomerForm };