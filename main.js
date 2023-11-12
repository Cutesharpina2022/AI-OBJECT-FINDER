img = "";
Status="";
objects = [];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(380 , 380);
    canvas.center();
video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}

function draw(){
    image( video, 0 , 0 , 380 , 380);
   if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video , gotResult);
      for(i = 0;i < objects.length; i++){
    document.getElementById("status").innerHTML = "Status : object detected";
    document.getElementById("number_of_objects").innerHTML = "Number of objects detected are -;"+ objects.length; 
     fill(r,g,b);
     percent = floor(objects[i].confidence * 100);
     text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y +15);
     noFill();
     stroke(r,g,b);
     rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
     if(objects[i].label == object_name){
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById(status).innerHTML = "the object is dectected!"
     }

      }
   }
   
}

function modelLoaded(){
    console.log('model is loaded!');
    status = true;
    objectDetector.detect(video , gotResult);
}

function gotResult( error , results){
    if(error){
        console.log(error);
    }
    console.log(results)
    objects = results;
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status :detecting object";
    object_name = document.getElementById("object_name").value;
}