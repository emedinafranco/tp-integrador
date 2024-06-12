//SCRIPTS JUEGO 1 //
const gameContainer = document.getElementById('game1');
const imagenes = [{
        url: "../images/img-transito/img-contramano.png",
        opciones: ["Contra Mano", "Fin de Camino Sinuoso", "Prohibido Adelantar", "No Estacionar"],
        respuesta: 0
    },
    {
        url: "../images/img-transito/img-estacionamientoexclusivo.png",
        opciones: ["Prohibido Estacionar", "Zona de Carga y Descarga", "Estacionamiento Reservado para Discapacitados", "Estacionamiento Exclusivo"],
        respuesta: 3
    },
    {
        url: "../images/img-transito/img-finautopista.png",
        opciones: ["Fin de Velocidad Máxima Permitida", "Fin de Zona Escolar", "Fin de Autopista", "Fin de Camino Sin Salida"],
        respuesta: 2
    },
    {
        url: "../images/img-transito/img-giroobligatorioizquierda.png",
        opciones: [" Prohibido Girar a la Izquierda", "Fin de Giro Obligatorio a la Izquierda", "Giro Obligatorio a la Izquierda", "Giro Obligatorio a la Derecha"],
        respuesta: 2
    },
    {
        url: "../images/img-transito/img-noavanzar.png",
        opciones: ["No Girar a la Izquierda", "No Avanzar", "Ceda el Paso", "contra mano"],
        respuesta: 1
    },
    {
        url: "../images/img-transito/img-noavanzarnidetenerse.png",
        opciones: ["Prohibido Girar en U", "Prohibido el Paso de Peatones", "Estacionamiento Permitido", "No Estacionar ni Detenerse"],
        respuesta: 3
    },
];

let imagenActualIndex = 0;
let puntos = 0;

function cargarSiguienteImagen() {
    const imagenActual = imagenes[imagenActualIndex];
    document.getElementById("imagen").src = imagenActual.url;
    document.getElementById("label1").textContent = imagenActual.opciones[0];
    document.getElementById("label2").textContent = imagenActual.opciones[1];
    document.getElementById("label3").textContent = imagenActual.opciones[2];
    document.getElementById("label4").textContent = imagenActual.opciones[3];
}

function verificarRespuesta(seleccionada) {
    const imagenActual = imagenes[imagenActualIndex];
    if (seleccionada === imagenActual.respuesta) {
        puntos++;
        Swal.fire({
            icon: 'success',
            title: '¡Correcto!',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: '¡Incorrecto!',
            text: 'La respuesta correcta era: ' + imagenActual.opciones[imagenActual.respuesta],
            confirmButtonText: 'Aceptar'
        });
    }
    imagenActualIndex++;
    if (imagenActualIndex < imagenes.length) {
        cargarSiguienteImagen();
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Fin del juego',
            text: 'obtuviste ' + puntos + 'respuestas correctas',
            confirmButtonText: 'Repetir Juego'
        }).then((result) => {
            if (result.isConfirmed) {
                reiniciarJuego();
            }
        });
    }
}

function reiniciarJuego() {
    imagenActualIndex = 0;
    puntos = 0;
    cargarSiguienteImagen();
}

cargarSiguienteImagen();