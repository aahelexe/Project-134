img="";
stat="";
object=[];
function preload()
{
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.position(350,150)
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects...";
    document.getElementById("baby_status").innerHTML="Baby Not Found";
}
function modelLoaded()
{
    console.log("CocoSSD loaded.");
    stat=true;
}

function draw()
{
    image(video,0,0,380,380);
    if(stat==true)
    {
        objectDetector.detect(video, gotResults);
        for (i=0;i<object.length;i++)
        {
            if(object.length>0)
            {
                document.getElementById("status").innerHTML="Status: Object Detected"; 
                if(object[i].label=="person")
                {
                document.getElementById("baby_status").innerHTML="Possible Baby Detected";
                document.getElementById("status").innerHTML="Status: Object Detected";
                }
              else if(object[i].label!="person")
              {
                document.getElementById("baby_status").innerHTML="Baby not detected";
                document.getElementById("status").innerHTML="Status: Object Detected";
              }
            }
            else if(object.length<=0)
            {
                document.getElementById("status").innerHTML="Status: No Object Detected";
                document.getElementById("baby_status").innerHTML="Baby not detected";
            }
            r=random(255);
            g=random(255);
            b=random(255);
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%", object[i].x+20, object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            
        }
    }
}
function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        object=results;
    }
}