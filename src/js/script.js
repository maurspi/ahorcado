const palabrAdivinar = ingresarPalabra();
let arrCoincidencias = [];
let arrUsadas = [];
let errados = 0;
let vidas = 5;
let aciertos = 0;

const letra = document.querySelector('input');  
letra.oninput = function(){  //oninput cada vez que el ususario escriba en el input
    soloLetras(letra.value.toUpperCase(), palabrAdivinar); //convierto las letras a mayuscula tmb
};

function ingresarPalabra(){
    const palabra = prompt("Ingresa una palabra para adivinar!");
    const uppercase = palabra.toUpperCase();
    if(!/^[a-zA-Z]+$/.test(uppercase)) {
        alert("Palabra no permitida.");
        window.location.reload();
    } else {
        const arrPalabra = uppercase.split("");
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

function soloLetras(cadena, palabrAdivinar,arrCoincidencias){
    const pattern = new RegExp('[a-zA-Z]'); //RegExp se utiliza para hacer coincidir texto con un patrón
    console.log(pattern.test(cadena)); //aber si coincide con el patron
    if(!pattern.test(cadena)){
        document.querySelector('input').value = ""; //vuelve a nada el valor del input
        document.getElementById("status").innerHTML = "Solo puedes ingresar letras!!!";
        return false;
    }else{
        document.getElementById("tablero").innerHTML = `
        <table border="1">
            <tr>
                ${buscarCoincidencia(cadena,palabrAdivinar,arrCoincidencias)}    
            </tr>    
        </table>
    `;

        document.getElementById("ahorcado").innerHTML = `
            <img src="img/${errados}.png">
        `;


        return true;
    }
};

function buscarCoincidencia(letra, arrPalabra){
    let tablero = "";
    let coincidencias = 0;

    arrPalabra.forEach(caracter => {
        document.getElementById("usadas").innerHTML = `
            <h3> ${arrUsadas} </h3>
            `;

        if(caracter == letra){
            tablero = tablero + "<td style='background-color: #C5D8A4'>"+ caracter +" </td>"; //imprime la tabla con la letra que si
            coincidencias++; 
            aciertos++;
            arrCoincidencias.push(caracter);
        } else if (arrCoincidencias.includes(caracter)){
            tablero = tablero + "<td style='background-color: #C5D8A4'>"+ caracter +" </td>"; //letra que ya está

            // document.getElementById("usadas").innerHTML = `
            // <h3> ${arrUsadas} </h3>
            // `;

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
    if(vidas<0){
        document.getElementById("palabras").innerHTML = `
        <h3> Perdiste :( </h3>
        <h4>La palabra era ${palabrAdivinar}</h4>
        `;
    }
    else if(aciertos == palabrAdivinar.length){
        document.getElementById("palabras").innerHTML = `
        <h3> GANASTE :D </h3>
        <h4>La palabra era ${palabrAdivinar}</h4>
        `;
    }
}