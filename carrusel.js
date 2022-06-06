class BolaInf  {
   constructor(){
      this.x ;
      this.y ;
      this.radio              = 30;
      this.color              = 127;
      this.tipo               = 'i';
      this.txtCabecera        = 'Cadena de bloques BTC.';
      this.txtInf             = '';
      this.tranparenciaTxt    = 255;
    }//fin de constructor

    update(){

    }

    display(){

      textSize(25);
      fill(255,255,255);
      text ( this.txtCabecera ,5,  30);


      fill(0,0, 255);
      strokeWeight(0);
      ellipse (this.x, this.y, this.radio, this.radio);
      fill(255,255,0);
      textFont('Georgia');
      textSize(25);
      text ( this.tipo ,this.x - 3, this.y + 9);

      textSize(15);
      fill(255,255,255, this.tranparenciaTxt);
      text ( this.txtInf ,this.x - 3, this.y - 19);
        
    }//fin de display


    clicked(px, py) {
      let respuesta = false;
      let d = dist(px, py, this.x - 3, this.y + 9);
      if (d < this.radio) {
          respuesta = true;
      }
  
      return respuesta;
  
   }//fin clicked(px, py



}// fin de class BolaInf


class DatosBloque{
  constructor(){
    this.xCuadroExt          ;
    this.yCuadroExt          ;
    this.xCuadroInt             = this.xCuadroExt ;
    this.yCuadroInt             = this.yCuadroExt ;

    this.angulo              ;
    this.facEsc              ;

    this.indice              ;

    this.anchoVentanaExt        = 300;
    this.altoVentanaExt         = 500;
    this.anchoVentanaInt        = this.anchoVentanaExt;
    this.altoVentanaInt         = this.altoVentanaExt;

    this.margenVentana          = 0;
    this.margenTopVentana       = 0;

    this.tranparenciaMargen     = 180;
    this.transparenciaVentana   = 200;

    this.redondeoVentana        = 10;

    this.cabeceraTxt            = 'Nº: ';
    this.numeroBloque           = 170.457;
    this.brightness             = 50;

    this.textSize               = 0.3;

    this.textSegundaParte       = false;
    this.cabTexto1;
    this.texto1;
    this.cabTexto2;
    this.texto2;
    this.cabTexto3;
    this.texto3;
    this.cabTexto4;
    this.texto4;
    this.cabTexto5;
    this.texto5;

  }//fin constructor


  update(){
    //Si no nos dan posicionamiento
    if(!(this.xCuadroExt && this.yCuadroExt)){
      this.xCuadroExt     = xCentro - this.anchoVentanaExt/2;
      this.yCuadroExt     = yCentro - this.altoVentanaExt/2;

    }//fin del if(this.x && th

    this.xCuadroInt       = this.xCuadroExt + this.margenVentana;
    this.yCuadroInt       = this.yCuadroExt + this.margenTopVentana;

    this.anchoVentanaInt  = this.anchoVentanaExt - 2*(this.margenVentana);
    this.altoVentanaInt   = this.altoVentanaExt - this.margenTopVentana - this.margenVentana;

  }// fin de update


  display(){
    stroke(255,255, 255);
    strokeWeight(1);

    //Ventana exterior
    fill(this.brightness ,this.brightness , this.brightness , this.tranparenciaMargen);
    rect(this.xCuadroExt, this.yCuadroExt, 
         this.anchoVentanaExt,this.altoVentanaExt, 
         this.redondeoVentana);
    
    //Ventana Interior
    fill(this.brightness,this.brightness, this.brightness, this.transparenciaVentana);
    rect(this.xCuadroInt, this.yCuadroInt, 
         this.anchoVentanaInt,this.altoVentanaInt, 
         this.redondeoVentana);

    //Solo se muestra en cuadros del frente
    //NO FUNCIONA en muestra cuadros del bloque
       
    fill(255);
    textFont('Georgia');
    textSize(this.textSize * ((this.facEsc)/1.5));
    text ( this.cabeceraTxt + ' ' + (this.numeroBloque).toLocaleString("es-ES") ,this.xCuadroExt+5, this.yCuadroExt+25);
        

    if (this.textSegundaParte){
      
      var saltoLinea = 15;

      //textFont('Gugi');
      fill(0);
      textSize(this.textSize * ((this.facEsc)/1.6));

      textStyle(NORMAL);
      text ( this.cabTexto1     , this.xCuadroInt + 5, this.yCuadroInt + 1 * saltoLinea );
      textStyle(BOLD);
      text ( '  ' + this.texto1 , this.xCuadroInt + 5, this.yCuadroInt + 2 * saltoLinea );
      
      textStyle(NORMAL);
      text ( this.cabTexto2     , this.xCuadroInt + 5, this.yCuadroInt + 4 * saltoLinea );
      textStyle(BOLD);
      text ( '  ' + this.texto2 , this.xCuadroInt + 5, this.yCuadroInt + 5 * saltoLinea );

      textStyle(NORMAL);
      text ( this.cabTexto3     , this.xCuadroInt + 5, this.yCuadroInt + 7 * saltoLinea );
      textStyle(BOLD);
      text ( '  ' + this.texto3 , this.xCuadroInt + 5, this.yCuadroInt + 8 * saltoLinea );
      
      textStyle(NORMAL);
      text ( this.cabTexto4     , this.xCuadroInt + 5, this.yCuadroInt + 10 * saltoLinea );
      textStyle(BOLD);
      text ( '  ' + this.texto4 , this.xCuadroInt + 5, this.yCuadroInt + 11 * saltoLinea );

      textStyle(NORMAL);
      text ( this.cabTexto5     , this.xCuadroInt + 5, this.yCuadroInt + 13 * saltoLinea );
      textStyle(BOLD);
      text ( '  ' + this.texto5 , this.xCuadroInt + 5, this.yCuadroInt + 14 * saltoLinea );
       
    }//fin de if (this.textSegundaParte)

  }// fin de display



  clicked(px, py) {

    // let respuesta = Array({pinchado: false, numero: 0});
    let respuesta = false;

    let d = dist(px, py, this.xCuadroExt, this.yCuadroExt);
    if (d < this.facEsc) {
        this.brightness       = 255;
        respuesta = true ;
    }

    return respuesta;

  }//fin clicked(px, py



  mover(){
    //Llevar el cuadro del punto 1 al punto 2

  }

}//fin class DatosBloq


class MiSlider  {
  constructor(){
     
     this.x ;
     this.y ;

     this.ini          = 1;
     this.fin          = 170000;

     this.ancho        = 970;
     this.alto         = 20;
     this.tamano       = 950;
     
     this.slider       ;
     this.textNBlock   ;

     this.numBlock     = 1;

     this.miBolaInf = new BolaInf();

  }

  create(){

    this.ancho        =  windowWidth-150 - 20;
    this.alto         = 20; 
    this.tamano       = this.ancho - this.x;

    this.slider       = createSlider(this.ini, this.fin, this.numBlock);
    this.slider.position(this.x, this.y);
    this.slider.size(windowWidth-150, 20);

    this.textNBlock   = createInput('');
    this.textNBlock.size(50);
    this.textNBlock.position(windowWidth-97, this.y);

    this.miBolaInf.x = this.x - 28;
    this.miBolaInf.y = this.y + 5 ;

  }// fin create


  display(){

      this.slider.value(this.numBlock);
      this.textNBlock.value(this.numBlock);
      //this.miBolaInf.display();

  }// fin display

  displayBola(){

    this.miBolaInf.display();

  }//fin displayBola


  clicked(px, py) {
     let respuesta = 0;
 
     //AJUSTAR AREA ACTIVA       
     if ((px < this.x + this.ancho) && (px > this.x ) && 
         (py < this.y + this.alto ) && (py > this.y )){
          
         var pinchadoEn = this.slider.value();

         this.slider.value(pinchadoEn);
         this.textNBlock.value(pinchadoEn);

         respuesta = pinchadoEn;

     }
 
     return respuesta;
 
  }//fin clicked(px, py

}// fin de class MiSlider


// sliderChange(){
//   // var value = this.slider.value();
//   // console.log(val);
      
//   //this.textNBlock.value(this.slider.value());
//   //this.textNBlock.value(33);
      
//   noLoop();
// }