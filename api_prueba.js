//Variables generales

// Objetos satélites 
let numObjetos          = 20;           // Num. objetos satélites - Máximo 20

let numFrameRate        = 25;
let incrementoAngle     = 0.35;

// Mustra cuadro informativo de un bloque
var muestraCuadro       = false;
//figura satélite
var resetBrilloObj      = false;

//Instancia DatosBloque
var arrDatBloque        = Array();

//Trayestoria objetos satélites - Elipse
var angle               = 90;
var radio               = 20;
var alfa;
var beta;
var xCentro ;
var yCentro ;
var xMin  ;
var xMax ;
var difX ;
var yMin  ;
var yMax ;
var difY ;
var desplaXCentro       = 35;
var desplaYCentro       = 50;

var imgMundo;
var imgCielo;

 //Número de bloke el la blockchain
var numBlock            = 0;    
var numBlockSelec       = 0;  


var numBlockArranque    = 1;  

var bloqueEnSlide       = 0;
var pinchoEnInfo  ;


var slider;
var miSlider = Array();

var resLastBlock        = '';

// var miBolaInf ;
// var txtInfo;



function preload() {
  imgMundo  = loadImage('https://b2p5.github.io/bola-del-mundo-min.png');
  imgCielo  = loadImage('https://b2p5.github.io/imagenCielo-min.jpg');
  // newFont   = loadFont ('https://fonts.googleapis.com/css?family=Inconsolata');
}//fin preload

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////  setup  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function setup() {

  createCanvas(windowWidth,windowHeight);
  
  angleMode(DEGREES);	// change the angle mode from radians to degrees

  //Datos calculados del movie
  radio       = 20;
  angle       = 270 ;       // Angulo de arranque del primer objeto

  alfa        = (width/2)  - (width  * 0.1)  ;
  beta        = (height/2) - (height * 0.25)  ;
  
  xCentro     = width/2  - desplaXCentro;       
  yCentro     = height/2 - desplaYCentro;

  xMin        = xCentro - alfa;
  xMax        = xCentro + alfa;
  difX        = int(xMax - xMin);

  yMin        = yCentro - beta;
  yMax        = yCentro + beta;
  difY        = int(yMax - yMin);

  //Crea los satélites-bloques y cuadro datos bloque
  for (var i=0; i<numObjetos; i++){

    numBlock                                = i + numBlockArranque;

    arrDatBloque.push( new  DatosBloque() );
    
    arrDatBloque[i].numeroBloque            = numBlock;
    arrDatBloque[i].angle                   = angle;
    arrDatBloque[i].increm                  = false;
    arrDatBloque[i].indice                  = i;
    arrDatBloque[i].margenVentana           = 0;
    arrDatBloque[i].margenTopVentana        = 0;
    arrDatBloque[i].redondeoVentana         = 5;
    arrDatBloque[i].cabeceraTxt             = '';
    arrDatBloque[i].tranparenciaMargen      = 120;
    arrDatBloque[i].transparenciaVentana    = 20;

    //Giramos x grados
    angle += (360/numObjetos);


  }// fin for (var i=0; i<numObje



  //Instancia clase MiSlider
  ///////////////////////////////////////////////////////////////////////
  miSlider.push( new MiSlider );
  miSlider[0].x               = 50;
  miSlider[0].y               = windowHeight -60;

  miSlider[0].ini             = 1;
  miSlider[0].fin             = 728483;  //Llamar a getLastBlock() => https://blockchain.info/latestblock

  miSlider[0].numBlock        = numBlockArranque;

  miSlider[0].create();


  // conexión API
  myConex         = new Conex;

  //  noLoop()

  frameRate(numFrameRate);

}// fin function setup(


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////  draw  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
async function draw() {
  background(0);

  //Muestra imagen del cielo
  ////////////////////////////////////////////////////////////////////////
  let escalaCielo = 0.5;
  let tamanoXCielo = imgCielo.width  / escalaCielo;
  let tamanoYCielo = imgCielo.height / escalaCielo;
  tint(0, 100, 100);
  image(  imgCielo, 
          xCentro - (tamanoXCielo / 2), 
          yCentro - (tamanoYCielo / 2) , 
          tamanoXCielo, 
          tamanoYCielo 
        );


  // Muestra todos los satélites
  ////////////////////////////////////////////////////////////////////////
  for (var i=0; i< arrDatBloque.length; i++){

    var position        = calculaPosicion( arrDatBloque[i].angle );


    ////////////////////////////////////////
    //  NO FUNCIONA BIEN
    ////////////////////////////////////////
    //Injecion nuevos numeros de bloque
    //Si está en el top > incrementamos y semaforo a false
    if(  ((position.y)  < (yMin + 1))  && ( arrDatBloque[i].increm ) ){
      
      numBlock                      += 1;
      arrDatBloque[i].numeroBloque  = numBlock;
      arrDatBloque[i].increm        = false;

    }//fin de if((arrDatBloque[i].position.y < arrDatBloque[

    //Si esta en bottom => semaforo a true
    if( ((position.y)  > (yMax - 1))  && ( !arrDatBloque[i].increm    )   ){
      
          arrDatBloque[i].increm    = true;

    }// fin de if(arrDatBloque[i].position.y > arrO
    

    if (resetBrilloObj){
      arrDatBloque[i].brightness    = 50;
    }

    //Muestra bloques
    ////////////////////////////////////////////////////////////////////////
    var factorEscala                      = (((position.y - yMin)/difY)* 4) * radio;

    arrDatBloque[i].xCuadroExt            = position.x;
    arrDatBloque[i].yCuadroExt            = position.y;
    arrDatBloque[i].xCuadroInt            = position.x;
    arrDatBloque[i].yCuadroInt            = position.y;

    arrDatBloque[i].facEsc                = factorEscala;
    arrDatBloque[i].anchoVentanaExt       = factorEscala;
    arrDatBloque[i].altoVentanaExt        = factorEscala;
    arrDatBloque[i].anchoVentanaInt       = factorEscala;
    arrDatBloque[i].altoVentanaInt        = factorEscala;

    arrDatBloque[i].margenVentana         = 0;
    arrDatBloque[i].margenTopVentana      = 0;

    arrDatBloque[i].textSegundaParte      = false;

    arrDatBloque[i].update();
    arrDatBloque[i].display();

    arrDatBloque[i].angle               -= incrementoAngle;
    


    //Actualiza slider
    ////////////////////////////////////////////////////////////////////////
    //Muestra el numero de bloque cada "numFrameRate" frames
    if ((frameCount % numFrameRate) === 0){
      
        if (bloqueEnSlide === 0){
          miSlider[0].numBlock       = numBlock;
          miSlider[0].slider.value    (numBlock);
          miSlider[0].textNBlock.value(numBlock);

          miSlider[0].display();
        }

    }//fin de if ((frameCount 

    miSlider[0].displayBola();

  }// fin for (var i=0; i< 



  // Desmarca el objeto
  if (resetBrilloObj){
    resetBrilloObj          = false;
  }

  
  //Muestra bola del mundo
  ////////////////////////////////////////////////////////////////////////
  let escalaMundo  = 1.3;
  let tamanoXMundo = imgMundo.width / escalaMundo;
  let tamanoYMundo = imgMundo.height / escalaMundo;
  tint(0, 100, 100);
  image(  imgMundo, 
          xCentro - (tamanoXMundo / 2)+ 30, 
          yCentro - (tamanoYMundo / 2) - 50, 
          tamanoXMundo, 
          tamanoYMundo           
       );
  
       

  //Muestra Cuadro con datos del bloque
  ////////////////////////////////////////////////////////////////////////
  if(muestraCuadro){

    fill(255);
    textFont('Georgia');
    textSize(20);
    text('Loading...', xCentro-40, yCentro-20);

    arrDatBloque[numBlockSelec].anchoVentanaExt       = 200;
    arrDatBloque[numBlockSelec].altoVentanaExt        = 300;
    arrDatBloque[numBlockSelec].margenVentana         = 20;
    arrDatBloque[numBlockSelec].margenTopVentana      = 40;

    arrDatBloque[numBlockSelec].tranparenciaMargen    = 60;
    arrDatBloque[numBlockSelec].transparenciaVentana  = 255;

    arrDatBloque[numBlockSelec].facEsc                = '80';

    arrDatBloque[numBlockSelec].xCuadroExt = xCentro - 
          arrDatBloque[numBlockSelec].anchoVentanaExt/2 + desplaXCentro;
    arrDatBloque[numBlockSelec].yCuadroExt = yCentro - 
          arrDatBloque[numBlockSelec].altoVentanaExt/2 - desplaYCentro;

    arrDatBloque[numBlockSelec].cabeceraTxt            = '  ';


    //Conexión API => extraer datos
    // https://blockchain.info/block-height/154596?format=json

    //Ultimo bloque
    let resBlockHeight = await myConex.getBlockHeight( arrDatBloque[numBlockSelec].numeroBloque );


    arrDatBloque[numBlockSelec].textSegundaParte  = true;
    arrDatBloque[numBlockSelec].cabTexto1         = 'Time';
    arrDatBloque[numBlockSelec].texto1            = miTime(resBlockHeight.time);

    arrDatBloque[numBlockSelec].cabTexto2         = 'Versión';
    arrDatBloque[numBlockSelec].texto2            = resBlockHeight.ver;

    arrDatBloque[numBlockSelec].cabTexto3         = 'Fees';
    arrDatBloque[numBlockSelec].texto3            = (resBlockHeight.fee).toLocaleString("es-ES");;

    arrDatBloque[numBlockSelec].cabTexto4         = 'Size';
    arrDatBloque[numBlockSelec].texto4            = (resBlockHeight.size).toLocaleString("es-ES");;

    arrDatBloque[numBlockSelec].cabTexto5         = 'Bits';
    arrDatBloque[numBlockSelec].texto5            = (resBlockHeight.bits).toLocaleString("es-ES");

    
    arrDatBloque[numBlockSelec].update();
    
    arrDatBloque[numBlockSelec].display();

    arrDatBloque[numBlockSelec].textSegundaParte  = false;

  }//fin de if(muestraCuadro){


}// fin de funxcion draw



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////  varias  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function calculaPosicion(angle){

  // Posición dentro de la Elipse
  var xPosicion = xCentro + alfa * cos(angle);
  var yPosicion = yCentro + beta * sin(angle);

  return createVector(xPosicion, yPosicion);

}//fin calculaPosicion


function mousePressed() {
    
    let pinchaDentro ;

    ////////////////////////////////////////
    //  NO FUNCIONA BIEN
    //////////////////////////////////////
    muestraCuadro = false;
    for (let i = 0; i < arrDatBloque.length; i++) {
      pinchaDentro = arrDatBloque[i].clicked(mouseX, mouseY);    
  
      if (pinchaDentro){
        muestraCuadro                     = true;
        numBlockSelec                     = arrDatBloque[i].indice;
        arrDatBloque[i].brightness        = 255;
      }

    }//fin de for (let i = 0; i < arrDatBloque


    if (muestraCuadro) {   //este if se puede pasar al if anterior
      noLoop();
     
    }else{
      muestraCuadro  = false;
      resetBrilloObj = true;
      loop();

    }//fin de if (muestraCuadro


    //Gestión slider de bloqueEnSlide al pinchar en el
    /////////////////////////////////////////////////////////////////////////////////
    bloqueEnSlide = miSlider[0].clicked(mouseX, mouseY); 
    if (bloqueEnSlide){

      noLoop();

      //text('Loading...', xCentro, yCentro);

      //console.log("bloqueEnSlide: ", bloqueEnSlide);
      miSlider[0].numBlock      = bloqueEnSlide;
      numBlock                  = bloqueEnSlide;


      angle = 270;
      for (var i=0; i< arrDatBloque.length; i++){
        arrDatBloque[i].numeroBloque  = bloqueEnSlide++;
        
      }// fin for (var i=0; i< arrDatBloque.len
      
      miSlider[0].display();


    }//fin de if (bloqueEnSlide)

    pinchoEnInfo = miSlider[0].miBolaInf.clicked(mouseX, mouseY);
    if (pinchoEnInfo){
      miSlider[0].miBolaInf.txtInf     = 'Doble click sobre el slider para moverse por los bloques de la cadena';
      miSlider[0].display();   

    }//fin de if (pinchoEnInfo

}//fin de function mousePressed()

function mouseReleased() {
  
  //De donde venimos
  if (bloqueEnSlide){
    
    bloqueEnSlide = 0;
    loop();

  }//fin de if (bloqueEnSlide)

  if (pinchoEnInfo){
    
    pinchoEnInfo  = false;
    miSlider[0].miBolaInf.txtInf     = '';
    miSlider[0].displayBola(); 
    loop();

  }//fin de if (pinchoEnInfo)


}//Fin de function mouseReleased


function miTime(time) {
  let date = new Date(time * 1000);
  // console.log(date);
  return date.getDay() + '/' + date.getMonth() +'/'+ date.getFullYear() + ' ' +date.getHours() + ':' + date.getMinutes();

}//fin miTime


// function muestraTxtInf(){

// }

// function ocultaTxtInf(){
  
// }


















// function sliderChanged(){
//   loop();
// }

// function updateValue(){
//   //if the textbox is updated, update the slider
//   slider.value(textBox.value())
// }


// function mouseClicked() {
//   if (isLooping()) {
//     noLoop();
//   }else{
//     loop();
//   }
  
// }
// slider.style('width', anchoSlider );    
// slider.style('color', 'red');
// var anchoSlider   = windowWidth + 'px' ;

// if(arrDatBloque[i].angle < -360){
    //   arrDatBloque[i].angle = 0
    // }



  // Slider e input posicion
  ///////////////////////////////////////////////////////////////////////
  // slider      = createSlider(1, 170000, 0);
  // slider.position(100, height - 50);
  // slider.size(windowWidth-200, 20);

  // textSlider  = createInput('');
  // textSlider.size(50)
  // textSlider.position(width-97, height - 50)

  // textSlider.value(slider.value());
  // slider.input(sliderChange);

  // //Muestra bloque en slide
  // textSlider.value(numBlock);
  //console.log(numBlock);    


  // function sliderChange(){
  //   textSlider.value(slider.value());
  //   noLoop();
  // }

    //Muestra slider
  ////////////////////////////////////////////////////////////////////////
  // slider.value();
  // numBlockArranque = slider.value();
  // updateValue();
  // console.log(arrDatBloque[BloqueCentral].numeroBloque);
  // slider.value(arrDatBloque[BloqueCentral].numeroBloque);
  // slider.value(random(1,100000));
  // textSlider.value(random(1,100000));
  
  //setup();
  // console.log(val);
