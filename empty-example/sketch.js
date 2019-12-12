var iteraciones;
var frDiv;
divisor = 1000;
var escala = 4;
var incremento_x = -2;
var incremento_y = -2;
distancia = 0.5;

function cambiarPosicion(e) {
  console.log(e.clientX);
  x = incremento_x + (e.clientX / divisor) * escala;
  y = incremento_y + (e.clientY / divisor) * escala;
  console.log(x);
  console.log(y);
  escala = distancia * 2;
  incremento_x = x - distancia;
  incremento_y = y - distancia;
  mandelbrot(
    incremento_x,
    incremento_y,
    x + distancia,
    y + distancia,
    iteraciones
  );
  distancia = distancia / 1.5;
}

function mandelbrot(x_i, y_i, x_f, y_f, iteraciones) {
  var maxiterations = iteraciones;

  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var a = map(x, 0, width, x_i, x_f);
      var b = map(y, 0, height, y_i, y_f);

      var ca = a;
      var cb = b;

      var n = 0;

      while (n < maxiterations) {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++;
      }

      var bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n == maxiterations) {
        bright = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = 55;
      pixels[pix + 2] = 55;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}
function setup() {
  iteraciones = parseInt(
    prompt("cantidad de iteraciones", "100 (rapidez), 1000 (alta definición)")
  );
  createCanvas(1000, 1000);
  pixelDensity(1);
  var el = document.getElementById("defaultCanvas0");
  el.addEventListener("click", cambiarPosicion);
  mandelbrot(-2, -2, 2, 2, iteraciones);

  frDiv = createDiv("");
}
