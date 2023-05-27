//* Array que guardara las cartas
let baraja = [];

//* Array de letras normales
let letras = ['C', 'D', 'H', 'S'];

//* Array de letras especiales
let letrasEs = ['A', 'J', 'K', 'Q'];

//* Contadores de puntaje
let puntajeJ=0, puntajeC=0, turnoJ=0, turnoC = false;

//* Referencias a btns
reiniciar = document.querySelector('#reiniciar');
pedir = document.querySelector('#pedir');
detener = document.querySelector('#detener');
detener.disabled = true;

//* Referencias a puntaje y turno
let boxPuntajeJ = document.querySelector('#puntajeJ');
let boxPuntajeC = document.querySelector('#puntajeC');
let boxTurnoJ = document.querySelector('#turnoJ');

//* Referencias a cajas
let boxJugador = document.querySelector('#cajaJugador');
let boxComputadora = document.querySelector('#cajaComputadora');

//* Construir baraja
const generarBaraja = () => {
    //! Vaceamos array de abraja, puntajes y turno; lo insertamos
    baraja = [];

    turnoC = false;

    boxPuntajeJ.innerText = puntajeJ=0;
    boxPuntajeC.innerText = puntajeC=0;
    boxTurnoJ.innerText = turnoJ=0;

    //! Parte 1 de la baraja
    for(let i=2; i<=10; i++){
        for(let mensajero of letras){
            baraja.push(i + mensajero);
        }
    }
    //! Parte 2, completa
    for(let mensajero1 of letrasEs){
        for(let mensajero2 of letras){
            baraja.push(mensajero1 + mensajero2);
        }
    }
}

//* Barajear cartas
const barajear = () => {
    //! Generamos baraja
    generarBaraja();
    //! Barajeamos cartas y retornamos
    baraja = _.shuffle(baraja);
}

barajear();

const obtenerValor = () => {
    //! Obtenemos carta
    detener.disabled = false;
    let carta = baraja.pop();

    //! Obtenemos valor de carta
    let valor = carta.slice(0, -1);
    (!isNaN(valor)) ? valor = parseInt(valor) : 
    (['J', 'K', 'Q'].includes(valor)) ? valor = 10 : valor = 11;

    if (turnoC) {
        //! Acumulamos y mostrar puntaje y turno
        puntajeC += valor;
        boxPuntajeC.innerText = puntajeC;
    }else{
        //! Acumulamos y mostrar puntaje y turno
        puntajeJ += valor;
        boxPuntajeJ.innerText = puntajeJ;
        boxTurnoJ.innerText = (++turnoJ);
    }
    genCarta(carta);
}

const genCarta = (carta) => {
    //! Creamos elemento html -img-
    let img = document.createElement('img');
    //! Le asignamos la ruta dinamicamente en base a la carta obtenida
    img.src = `./assets/${carta}.png`;
    //! Le agregamos la clase css correspondiente
    img.classList.add('cajaImagen');
    //! Insertamos dentro del elemento referencia -boxJugador-, el elemento imagen con la ruta y clase dada
    (turnoC==true) ? boxComputadora.append(img) : boxJugador.append(img);
}

const revisar = () => {
    //! GANADOR
    if(puntajeJ==21){
        (puntajeC==21) ? alert('Empate') : 
        (puntajeC<21 || puntajeC>21) ? alert('Ganaste!!') : null; 
        bloquear(true);
    }else if(puntajeJ<21 && puntajeC!=0){
        (puntajeC==21) ? alert('Gana la IA') :
        (puntajeC>21) ? alert('Ganaste!!!') : 
        (puntajeC<21) ? alert('Empate') : null;
    }else if(puntajeJ>21){
        setTimeout(function() {
            alert('Gano la IA');
          }, 100);
        generarTurnoPC();
    }
}

//* Pedir carta
pedir.addEventListener('click', () => {
    obtenerValor();
    revisar();
});

//* Reiniciar
reiniciar.addEventListener('click', () => {
    generarBaraja();
    barajear();
    boxJugador.innerText = null;
    boxComputadora.innerText = null;
    bloquear(false);
});

detener.addEventListener('click', () => {
    generarTurnoPC();
    revisar();
});

const generarTurnoPC = () => {
    turnoC = true;
    do{
        obtenerValor();
        if(puntajeJ>21){break;}
    }while(puntajeC<=puntajeJ);
    bloquear(true);
}

const bloquear = (val, val2 = true) => {
    pedir.disabled = val;
    detener.disabled = val2;
}