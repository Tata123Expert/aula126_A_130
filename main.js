song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
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
    canvas = createCanvas(600, 450);
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
    image(video, 0, 0, 600, 450);
    fill(14, 97, 251);
    stroke(14, 97, 251);

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20,);

        if(rightWristY > 0 && rightWristY <= 90)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 0.5";
            song.rate(0.5);
        }
        else if(rightWristY > 90 && rightWristY <= 180)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 1";
            song.rate(1);
        }
        else if(rightWristY > 180 && rightWristY <= 270)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 1.5";
            song.rate(1.5);
        }
        else if(rightWristY > 270 && rightWristY <= 360)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 2";
            song.rate(2);
        }
        else if(rightWristY > 360 && rightWristY <= 450)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 2.5";
            song.rate(2.5);
        }
        }
    

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20,);
        numeroEsquerdoY = Number(leftWristY);
        tirarDecimais = floor(numeroEsquerdoY);
        volume = tirarDecimais/450;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    
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
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}










