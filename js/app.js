//* Array que guardara las cartas
let baraja = [];

//* Array de letras normales
let letras = ['C', 'D', 'H', 'S'];

//* Array de letras especiales
let letrasEs = ['A', 'J', 'K', 'Q'];

//* Contadores de puntaje
let puntajeJ=0, puntajeC=0;

//* Referencias a btns
reiniciar = document.querySelector('#reiniciar');
pedir = document.querySelector('#pedir');
detener = document.querySelector('#detener');

//* Referencias a puntaje y turno
let boxPuntajeJ = document.querySelector('#puntajeJ');
let boxTurnoJ = document.querySelector('#turnoJ');

//* Referencias a cajas
boxJugador = document.querySelector('#cajaJugador');
boxComputadora = document.querySelector('#cajaComputadora')

//* Construir baraja
const generarBaraja = () => {
    //! Vaceamos array de abraja 
    baraja = [];
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

//* Pedir carta
pedir.addEventListener('click', () => {
    //! Obtenemos carta
    let carta = baraja.pop();
    //! Obtenemos valor de carta
    let valor = carta.charAt(0);
    (!isNaN(valor)) ? valor = parseInt(valor) : 
    (['J', 'K', 'Q'].includes(valor)) ? valor = 10 : valor = 11;
    //! Acumulamos y mostrar puntaje
    puntajeJ += valor;
    boxPuntajeJ.innerText = puntajeJ;

    console.log(valor);
    let img = document.createElement('img');
    img.src = `./assets/${carta}.png`;
    img.classList.add('cajaImagen');
    boxJugador.append(img);
});

//* Reiniciar
reiniciar.addEventListener('click', () => {
    generarBaraja();
    barajear();
    boxJugador.innerText = null;

});