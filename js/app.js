document.addEventListener("DOMContentLoaded", () => {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  // Seleccionar los campos
  const formulario = document.querySelector("#formulario");

  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");

  const btnSubmit = document.querySelector("#formulario button[type='submit']");
  const btnReset = document.querySelector("#formulario button[type='reset']");

  const spinner = document.querySelector("#spinner");

  // Asignar eventos
  inputEmail.addEventListener("blur", validar);
  inputAsunto.addEventListener("blur", validar);
  inputMensaje.addEventListener("blur", validar);

  formulario.addEventListener("submit", enviarFormulario);

  btnReset.addEventListener("click", (e) => {
    e.preventDefault();

    const confirmacion = confirm("¿Quieres reiniciar el formulario?");

    if (confirmacion) {
      resetFormulario();
    }
  });

  // ===================================================

  // Funciones

  // =====================

  // Validacion
  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(`El ${e.target.id} es obligatorio`, e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta(`El ${e.target.id} no es correcto`, e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // Asignar valores al objeto general
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el objeto general
    comprobarEmail();
  }

  // =====================

  // Mostrar alerta
  function mostrarAlerta(mensaje, referencia) {
    // Limpiar alerta
    limpiarAlerta(referencia);

    // Generar HTML de la alerta
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    // Inyectar error en el formulario HTML
    referencia.appendChild(error);
  }

  // =======================

  // Limpiar las alertas
  function limpiarAlerta(referencia) {
    // Comprobar si existe una alerta y removerla
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  // ============================

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);

    return resultado;
  }

  // ============================

  // Comprobar todo el objeto
  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove("opacity-50");
      btnSubmit.disabled = false;
    }
  }

  // ==============================

  // Enviar formulario y lanzar spinner

  function enviarFormulario(e) {
    e.preventDefault();

    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.add("hidden");

      resetFormulario();

      // Mostrar alerta
      
      const alertaExito = document.createElement('P')
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase')

      alertaExito.textContent = 'Mensaje enviado correctamente'

      formulario.appendChild(alertaExito)

      setTimeout(() => {
        alertaExito.remove()
      }, 5000);
    }, 3000);
  }

  // ==================================

  // Reiniciar formulario y btnSubmit

  function resetFormulario() {
    // Reiniciar el objeto general
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
