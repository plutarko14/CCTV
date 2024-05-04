//img="";
objects = [];
status = "";

function preload(params) 
{
   // img= loadImage("dog_cat.jpg")
}
function setup(params) {
    canvas=createCanvas(600, 400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(600, 400);
    video.hide();
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Estado : Detección de objetos";
}

function modelLoaded() {
    console.log("¡Modelo cargado!")
    status = true;
    
  }
  function gotResult(error, results) 
{
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects=results;
}

function draw(params) {
   image(video, 0, 0, 600, 400);
   if(status!="")
   {
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Estado : objeto detectado";
        document.getElementById("number").innerHTML = "Objetos detectados:"+objects.length;
        fill(r, g, b);
        porcentaje=floor(objects[i].confidence*100);
        text(objects[i].label+ " " + porcentaje + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
         stroke(r, g, b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
   }
   
      
    }
}
