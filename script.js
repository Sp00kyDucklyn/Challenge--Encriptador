
var textoInput = document.getElementById("text-input");
var mensajeValidacion = document.getElementById("validation-message");
var resultDiv = document.getElementById("result");
var botonCopiar = document.getElementById("copy-btn");
var botonCifrar = document.getElementById("encrypt-btn");
var botonDescifrar = document.getElementById("decrypt-btn");


function validarTexto() {
    var texto = textoInput.value;
    var regex = /^[a-z0-9\s]+$/;  

    if (!regex.test(texto)) {
        mensajeValidacion.innerText = "El texto no debe contener mayúsculas ni caracteres especiales.";
        mensajeValidacion.style.display = "block";
        return null;
    } else {
        mensajeValidacion.style.display = "none";
        return texto; 
    }
}

function cifrar(texto, desplazamiento) {
    let resultado = '';
    texto.split('').forEach((caracter) => {
        if (caracter >= 'a' && caracter <= 'z') {
            let base = 'a'.charCodeAt(0);
            let codigo = caracter.charCodeAt(0) - base;
            let nuevoCodigo = (codigo + desplazamiento + 26) % 26;
            resultado += String.fromCharCode(base + nuevoCodigo); 
        } else {
            resultado += caracter;
        }
    });

    return resultado;
}

function encriptar() {
    var texto = validarTexto(); 
    if (texto) {
        var desplazamiento = texto.length % 26; 
        var textoCifrado = cifrar(texto, desplazamiento);
        mostrarTexto(textoCifrado); 
    }
}

function desencriptar() {
    var texto = validarTexto(); 
    if (texto) {
        var desplazamiento = texto.length % 26; 
        var textoDescifrado = cifrar(texto, -desplazamiento); 
        mostrarTexto(textoDescifrado); 
    }
}
function mostrarTexto(texto) {
    resultDiv.innerText = texto;
    resultDiv.style.display = "block";
    botonCopiar.style.display = "inline-block";
}

function copiarTexto() {
    var texto = resultDiv.innerText;
    var tempInput = document.createElement("textarea");
    tempInput.value = texto;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert("Texto copiado al portapapeles");
}
botonCifrar.addEventListener("click", encriptar);
botonDescifrar.addEventListener("click", desencriptar);
botonCopiar.addEventListener("click", copiarTexto);

document.addEventListener("DOMContentLoaded", function() {
    var textarea = document.querySelector(".encriptado textarea");

    function updateTextareaBackground() {
        if (textarea.value.trim() === "") {
            textarea.classList.add("empty");
        } else {
            textarea.classList.remove("empty");
        }
    }

    updateTextareaBackground();
    textarea.addEventListener("input", updateTextareaBackground);
});

