
var colors = ["green", "blue", "red", "yellow"];

var pattern = [];

var userPattern = [];


var gameStarted = false;

var level = 0;


$(document).keypress(function(){
    if (!gameStarted){
      $("#level-title").text("Level" + level); 
      nextSequence();
      gameStarted = true;
    }
});

$(".btn").click(function(){
    var colorPressed = $(this).attr("id");

    userPattern.push(colorPressed);

    playSound(colorPressed);

    animate(colorPressed);

    checkAnswer(userPattern.length-1);
});

function playSound(name){
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play()
}

function animate(currColor){
    $("#" + currColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currColor).removeClass("pressed");
    });
}

function checkAnswer(currLevel){

    if (pattern[currLevel] === userPattern[currLevel]){
        console.log('success');
   

        if (userPattern.length === pattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    }
    else{
        console.log('wrong');

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        level = 0;
        gameStarted= false;

        pattern = [];
        userPattern = [];
    }   
    
};

function nextSequence(){

    userPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    
    var randNum = Math.floor(Math.random() * 4);

    var randColor = colors[randNum];

    pattern.push(randColor);

    $("#" + randColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randColor);
}


