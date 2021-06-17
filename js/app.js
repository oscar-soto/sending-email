// Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
console.log(btnReset) 

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners () {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formularios
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    // Enviar Formulario 
    formulario.addEventListener('submit', enviarEmail);
}


// Funciones

function iniciarApp() {
    btnEnviar.disabled = true;

    // Clases de tailwind
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {
    validarInputs(e);
    validarEmail(e);
    if ( er.test( email.value) && asunto.value !== '' && mensaje.value !== '' ) { 
        // se evalua en email.value porque no estoy evaluado el evento
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
    // } else {
    //     console.log('Hay campos por validad')
    // }
}

// Validando Asunto y textarea
function validarInputs (e) {
    if (e.target.value.length > 0) {
        // Eliminando los errores. . .
        eliminarMensaje();

        // Agregando Clases
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
}

// Validando Email
function validarEmail (e) {
    if (e.target.type === 'email'){
        // const resultado = e.target.value.indexOf('@');
        if ( er.test( e.target.value ) ) {
            // Eliminando los errores. . .
            eliminarMensaje();

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }
}

// Eliminando mensaje de Error
function eliminarMensaje() {
    const error = document.querySelector('p.error');
    if(error) {
        error.remove();
    }
}

// Mostrar mensaje de error
function mostrarError (mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if( errores.length === 0 ) {
        formulario.appendChild(mensajeError)
    }

}


// Envia el email
function enviarEmail(e) {
    e.preventDefault();
    // Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Despues de 3 segundo ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        // Mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'uppercase');

        // Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // Eliminar el mensaje de exito

            resetearFormulario();
        }, 5000);
    }, 3000);
}

// funcion que resetea el formulario
function resetearFormulario() {
    formulario.reset();
    
    iniciarApp();
}