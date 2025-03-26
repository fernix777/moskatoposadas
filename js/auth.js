// Funciones para la autenticación de usuarios

// Simular una base de datos de usuarios (en producción, esto estaría en un backend)
let users = JSON.parse(localStorage.getItem('moskato_users')) || [];

// Función para validar el formato del email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar la contraseña
function isValidPassword(password) {
    return password.length >= 6;
}

// Función para validar el número de teléfono
function isValidPhone(phone) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
}

// Función para registrar un nuevo usuario
function registerUser(name, email, phone, password) {
    // Validar datos
    if (!name || !email || !phone || !password) {
        throw new Error('Todos los campos son obligatorios');
    }

    if (!isValidEmail(email)) {
        throw new Error('El formato del email no es válido');
    }

    if (!isValidPassword(password)) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (!isValidPhone(phone)) {
        throw new Error('El formato del teléfono no es válido');
    }

    // Verificar si el email ya está registrado
    if (users.some(user => user.email === email)) {
        throw new Error('Este email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password // En producción, la contraseña debería estar hasheada
    };

    // Agregar usuario y guardar en localStorage
    users.push(newUser);
    localStorage.setItem('moskato_users', JSON.stringify(users));

    return newUser;
}

// Función para iniciar sesión
function loginUser(email, password) {
    // Validar datos
    if (!email || !password) {
        throw new Error('Email y contraseña son obligatorios');
    }

    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Email o contraseña incorrectos');
    }

    // Guardar sesión
    const session = {
        userId: user.id,
        name: user.name,
        email: user.email
    };
    localStorage.setItem('moskato_session', JSON.stringify(session));

    return session;
}

// Función para cerrar sesión
function logoutUser() {
    localStorage.removeItem('moskato_session');
}

// Función para verificar si hay una sesión activa
function getActiveSession() {
    return JSON.parse(localStorage.getItem('moskato_session'));
}

// Función para mostrar mensajes de error o éxito
function showMessage(message, isError = false) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${isError ? 'danger' : 'success'} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insertar el mensaje antes del formulario
    const formContainer = document.querySelector('.card-body');
    if (formContainer) {
        formContainer.insertBefore(alertDiv, formContainer.firstChild);
    }

    // Remover el mensaje después de 5 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}