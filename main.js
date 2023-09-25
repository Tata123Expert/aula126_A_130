song = "";
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound("Música do Carros.mp3");
} 

function setup()
{
    canvas = createCanvas(600, 440);
    canvas.position(460, 250);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet Carregado");
}

function draw()
{
    image(video, 0, 0, 600, 440);
    fill(14, 97, 251);
    stroke(14, 97, 251);
    circle(leftWristX, leftWristY, 20,);
    númeroEsquerdoY = Number(leftWristY);
    tirarDecimais = floor(númeroEsquerdoY);
    volume = tirarDecimais/440;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}

function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}































