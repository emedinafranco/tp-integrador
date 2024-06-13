document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const imagenAuto = new Image();
  imagenAuto.src = '../images/juego-antoniow/car.png';
  const imagenCasa = new Image();
  imagenCasa.src = '../images/juego-antoniow/chouse.png';

  const auto = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      width: 50,
      height: 30,
      velocidad: 0,
      velocidadMaxima: 15,
      aceleracion: 0.7,
      friccion: 0.1,
      direccion: 0
  };

  const obstaculosIniciales = [
      { x: 220, y: 220, width: 50, height: 50 },
      { x: 620, y: 220, width: 50, height: 50 },
      { x: 220, y: 420, width: 50, height: 50 },
      { x: 620, y: 420, width: 50, height: 50 },
      { x: 420, y: 420, width: 50, height: 50 }
  ];

  let obstaculos = [...obstaculosIniciales];
  let juegoTerminado = false;

  function dibujarAuto() {
      ctx.save();
      ctx.translate(auto.x, auto.y);
      ctx.rotate(auto.direccion * Math.PI / 180);
      ctx.drawImage(imagenAuto, -auto.width / 2, -auto.height / 2, auto.width, auto.height);
      ctx.restore();
  }

  function dibujarObstaculos() {
      obstaculos.forEach(obstaculo => {
          ctx.drawImage(imagenCasa, obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);
      });
  }

  function dibujarFondo() {
      const tamanoCuadricula = 100;
      ctx.fillStyle = '#7ec850';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#404040';
      ctx.fillRect(tamanoCuadricula, 0, tamanoCuadricula, canvas.height);
      ctx.fillRect(3 * tamanoCuadricula, 0, tamanoCuadricula, canvas.height);
      ctx.fillRect(5 * tamanoCuadricula, 0, tamanoCuadricula, canvas.height);
      ctx.fillRect(0, tamanoCuadricula, canvas.width, tamanoCuadricula);
      ctx.fillRect(0, 3 * tamanoCuadricula, canvas.width, tamanoCuadricula);
      ctx.fillRect(0, 5 * tamanoCuadricula, canvas.width, tamanoCuadricula);

      ctx.strokeStyle = '#404040';
      ctx.lineWidth = 2;

      for (let x = 0; x <= canvas.width; x += tamanoCuadricula) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
      }

      for (let y = 0; y <= canvas.height; y += tamanoCuadricula) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
      }
  }

  function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function actualizarPosicion() {
      auto.x += auto.velocidad * Math.cos(auto.direccion * Math.PI / 180);
      auto.y += auto.velocidad * Math.sin(auto.direccion * Math.PI / 180);

      if (auto.x < 0) auto.x = 0;
      if (auto.x > canvas.width) auto.x = canvas.width;
      if (auto.y < 0) auto.y = 0;
      if (auto.y > canvas.height) auto.y = canvas.height;
  }

  function manejarControles(evento) {
      if (juegoTerminado && evento.key === "r") {
          reiniciarJuego();
          return;
      }

      if (!juegoTerminado) {
          switch (evento.key) {
              case "ArrowUp":
                  if (auto.velocidad < auto.velocidadMaxima) auto.velocidad += auto.aceleracion;
                  break;
              case "ArrowDown":
                  if (auto.velocidad > -auto.velocidadMaxima) auto.velocidad -= auto.aceleracion;
                  break;
              case "ArrowLeft":
                  auto.direccion -= 5;
                  break;
              case "ArrowRight":
                  auto.direccion += 5;
                  break;
          }
      }
  }

  function aplicarFriccion() {
      if (auto.velocidad > 0) {
          auto.velocidad -= auto.friccion;
          if (auto.velocidad < 0) auto.velocidad = 0;
      } else if (auto.velocidad < 0) {
          auto.velocidad += auto.friccion;
          if (auto.velocidad > 0) auto.velocidad = 0;
      }
  }

  function detectarColisiones() {
      for (let obstaculo of obstaculos) {
          if (
              auto.x + auto.width / 2 > obstaculo.x &&
              auto.x - auto.width / 2 < obstaculo.x + obstaculo.width &&
              auto.y + auto.height / 2 > obstaculo.y &&
              auto.y - auto.height / 2 < obstaculo.y + obstaculo.height
          ) {
              return true;
          }
      }
      return false;
  }

  function mostrarGameOver() {
      ctx.fillStyle = "black";
      ctx.font = "40px Arial";
      ctx.fillText("¡Perdiste!", canvas.width / 2 - 100, canvas.height / 2);
      ctx.font = "20px Arial";
      ctx.fillText("Presiona 'R' para reiniciar", canvas.width / 2 - 110, canvas.height / 2 + 40);
  }

  function reiniciarJuego() {
      auto.x = canvas.width / 2;
      auto.y = canvas.height / 2;
      auto.velocidad = 0;
      auto.direccion = 0;
      obstaculos = [...obstaculosIniciales];
      juegoTerminado = false;
      bucleJuego();
  }

  function bucleJuego() {
      limpiarCanvas();
      dibujarFondo();
      if (detectarColisiones()) {
          juegoTerminado = true;
          mostrarGameOver();
      } else {
          actualizarPosicion();
          aplicarFriccion();
          dibujarObstaculos();
          dibujarAuto();
          if (!juegoTerminado) {
              requestAnimationFrame(bucleJuego);
          }
      }
  }

  document.addEventListener("keydown", manejarControles);
  bucleJuego();
});
