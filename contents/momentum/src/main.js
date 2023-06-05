/********* Dimensions ************/
const canvasWidth   = 600;
const canvasHeight  = 400;
const defaultM1 = 10;
const defaultM2 = 10;
/********** Variables ********/

var oldX,oldY;
var ball1;
var ball2;
var color1 = 'blue';
var color2 = 'red';
var t = 0.0;
var pivo;
var v1f;
var v2f;

/********** Physical constants ********/


/********** Canvas building ********/

var canvas      = document.getElementById("myCanvas");
var ctx         = canvas.getContext("2d");
canvas.width    = canvasWidth;
canvas.height   = canvasHeight;
ctx.font = '18px Arial';


/********** HTML interaction ********/

var sliderM1     = document.getElementById("m1");
var m1View       = document.getElementById("outMass1");
var sliderM2     = document.getElementById("m2");
var m2View       = document.getElementById("outMass2");
var sliderV1     = document.getElementById("v1");
var v1View       = document.getElementById("outSpeed1");
//var sliderV2     = document.getElementById("v2");
//var v2View       = document.getElementById("outSpeed2");
var btnRun       = document.getElementById("button-start");
var btnStop      = document.getElementById("button-stop");
var btnReset     = document.getElementById("button-reset");

//var posfin       = document.getElementById("finalpos");
var answer       = document.getElementById("answ");

m1View.innerHTML = sliderM1.value;
m2View.innerHTML = sliderM2.value;
v1View.innerHTML = sliderV1.value;
//v2View.innerHTML = sliderV2.value;

sliderM1.oninput = function(){
  m1View.innerHTML = this.value;
  
}

sliderM2.oninput = function(){
  m2View.innerHTML = this.value;
}

sliderV1.oninput = function(){
  v1View.innerHTML = this.value;
}

//sliderV2.oninput = function(){
//  v2View.innerHTML = this.value;
//}


var pos1 = new Vector2D(10,200);
var pos2 = new Vector2D(590 ,200)
pivo = new Vector2D(0,200);


/********** Animation ********/
function init() {

  ball1 = new Ball(pivo, pos1, sliderM1.value,color1,sliderV1.value);
  ball2 = new Ball(pivo, pos2, sliderM2.value,color2,-10.0);
  draw();
 }

document.onload = init();

//btnRun.onclick = function() {
//    console.log("Start!");
//    animate();
   //if(!running) {
   //   if (answered === true) {
   //         init();
   //         dynamics(1.0 * sliderForce.value);
   //         running = true;
   //         animate();
   //     } else {
   //         mustAnswer();
    //    }
    //}
    
//}

//btnStop.onclick = function() {

//    pause();
//    ctx.clearRect(0,0, canvasWidth, canvasHeight);
//    draw();
//}

// STOPWATCH STUFF

window.onload = function () {
  var seconds = 00;
  var tens = 00;
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  //var buttonStart = document.getElementById('button-start');
  //var buttonStop = document.getElementById('button-stop');
  //var buttonReset = document.getElementById('button-reset');
  
  var Interval ;

  btnRun.onclick = function() {

        //console.log(answer.value);
        ball1.setMass(sliderM1.value);
        ball1.setV(sliderV1.value);
        ball2.setMass(sliderM2.value);
        ball2.setV(-10.0);
        animate();
  }

  //  btnStop.onclick = function() {
  //      pause();
  //      draw();
  //     clearInterval(Interval);
  //}


  btnReset.onclick = function() {
    clearInterval(Interval);
    //tens = "00";
    // 	seconds = "00";
    //  appendTens.innerHTML = tens;
    //	appendSeconds.innerHTML = seconds;

    //pendulo.setLenght(1.0 * sliderLenght.value);
    ctx.save();
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    ctx.restore();  
    }



  function startTimer () {
    tens++;

    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9){
      appendTens.innerHTML = tens;

    }

    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }

  }


}


function draw() {
    ctx.save();
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    ball1.draw(ctx);
    ball2.draw(ctx);
    ctx.beginPath();
    ctx.moveTo(0,210);
    ctx.lineTo(600,210);
    ctx.stroke();
    ctx.restore();
}

function pause() {
    cancelAnimationFrame(animId);
}

function animate() {
    animId = requestAnimationFrame(animate);
    t += 0.03
    ball1.move(t);
    ball2.move(t);
    //Elastica (teste)
    if( Math.abs(ball1.pos.x - ball2.pos.x) < 20 ){
      //v1f = new Vector2D(0.005*t*((-10.0 - sliderV1.value) + (2.0*sliderM1.value*sliderV1.value + (-10.0)**2 * (sliderM2.value - sliderM1.value))/(sliderM2.value - sliderM1.value)),0);
      var m1 = sliderM1.value;
      var m2 = sliderM2.value;
      var v1 = sliderV1.value;
      ball1.setV( 50.0*(((m1 - m2)/(m1 + m2))*v1 + (2.0*m2/(m1+m2))*(-10.0)));
      //console.log("%f",50.0*(((m1 - m2)/(m1 + m2))*v1 + (2.0*m2/(m1+m2))*(-10.0)));
      ball2.setV( 50.0*(((2.0*m1)/(m1+m2))*v1 + ((m2 - m1)/(m1+m2))*(-10.0)));
      //ball1.move1(t,sliderM1.value,sliderM2.value,sliderV1.value);
      //ball2.move2(t,sliderM1.value,sliderM2.value,sliderV1.value);
    }

    //console.log("%d, %d",t,tcol);

    draw();
}

draw();
  
