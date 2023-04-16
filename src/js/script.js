//El tipo de dato en las variables, se determina en tiempo de ejecución. No se declara como en java o c.
const palabrAdivinar = ingresarPalabra();
let arrCoincidencias = [];
let arrUsadas = [];
let errados = 0;
let vidas = 5;
let aciertos = 0;
const letra = document.querySelector('input');  // Trae el valor del tipo de input , que se ingresa desde el HTML

letra.oninput = function(){  //onInput se activa cada vez que desde el input se ingresa un valor.
   
    soloLetras(letra.value.toUpperCase(),palabrAdivinar); //convierto las letras a mayuscula tmb
};

function soloLetras(cadena, palabrAdivinar, arrCoincidencias) {
    const pattern = new RegExp('[a-zA-Z]'); //Patrón de búsqueda para manipular cadenas de texto.
    console.log(pattern.test(cadena)); //Test: evalúa si una cadena de texto coincide con una expresión regular.
    if (!pattern.test(cadena)) {
      document.getElementById('letraInput').value = ''; //vuelve a nada el valor del input
      document.getElementById('status').innerHTML = 'Solo puedes ingresar letras!!!';
      return false;
    } else {
      document.getElementById('tablero').innerHTML = `
      <table border="1">
          <tr>
              ${buscarCoincidencia(cadena, palabrAdivinar, arrCoincidencias)}    
          </tr>    
      </table>
  `;
  
      document.getElementById('ahorcado').innerHTML = `
          <img src="img/${errados}.png">
      `;
  /*
      //manejo de tecla enter, para que tome la siguiente letra
      document.getElementById('letraInput').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          //captura entrada
          const letra = document.getElementById('letraInput').value.toUpperCase();
          //borra entrada
          document.getElementById('letraInput').value = '';
          soloLetras(letra, palabrAdivinar, arrCoincidencias);
        }
      });
  */
      return true;
    }
  };
  


function ingresarPalabra(){
    const palabra = prompt("Ingresa una palabra para adivinar!");
    const uppercase = palabra.toUpperCase();
    if(!/^[a-zA-Z]+$/.test(uppercase)) {
        alert("Palabra no permitida.");
        window.location.reload(); // envia petición al server para recargar la pag.
    } else {
        const arrPalabra = uppercase.split(""); // split busca conincidencias
    document.getElementById("tablero").innerHTML = `
        <table border="1">
            <tr>
                ${creaTablero(arrPalabra)}    
            </tr>    
        </table>
    `;
    return arrPalabra;
    }
};


function creaTablero(arrPalabra){
    let tablero = "";
    arrPalabra.forEach(letra => {
        tablero += "<td> ? </td>";
    });
    return tablero;
};


function buscarCoincidencia(letra, arrPalabra){
    let tablero = "";
    let coincidencias = 0;

    arrPalabra.forEach(caracter => {
        document.getElementById("usadas").innerHTML = `
            <h3> ${arrUsadas} </h3>`;

        if(caracter == letra){
            tablero = tablero + "<td style='background-color: #C5D8A4'>"+ caracter +" </td>"; //imprime la tabla con la letra que si
            coincidencias++; 
            aciertos++;
            arrCoincidencias.push(caracter);
        } else if (arrCoincidencias.includes(caracter)){
            tablero = tablero + "<td style='background-color: #C5D8A4'>"+ caracter +" </td>"; //letra que ya está

        }else{
            tablero = tablero + "<td> ? </td>";
        }
        leyendaCoincidencia(coincidencias);
    });

    if(coincidencias==0){
        errados++;
        vidas--;
    }

    arrUsadas.push(letra);
    console.log(arrUsadas);
    victoria();
    
    return tablero;
    
};


function leyendaCoincidencia(coincidencias){
    if(coincidencias > 0){
        document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias!!!`;
    }else {
        document.getElementById("status").innerHTML = `No hubo coinciencias :( Quedan ${vidas} vidas.`;
    }
};

function victoria(){
    if(aciertos == palabrAdivinar.length){
        document.getElementById("palabras").innerHTML = `
            <h3> GANASTE :D </h3>
            <h4>La palabra es ${palabrAdivinar.join('')}</h4>
        `;
    } else if (vidas < 0){
        document.getElementById("palabras").innerHTML = `
            <h3> Perdiste :( </h3>
            <h4>La palabra es ${palabrAdivinar.join('')}</h4>
        `;
    }
    
}