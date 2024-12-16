var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var lastIndex = userClickedPattern.length - 1;
var level = 0;
var started = false;

$(".btn").on("click", function() {
    if(started) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
    
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
});

$(document).on("keydown", function(e) {
    if(!started){
        nextSequence();
        $("h1").text("Level " + level);
        started = true;
    }
});



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(500).fadeIn(500);

    playSound(randomChosenColor);
    
   

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
} 
    
function animatePress(button) {
    $(button).addClass("pressed");

    setTimeout( () => {
        $(button).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel)  {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout( () => {
                nextSequence();
            }, 1000);
             
        }
    } else {
        startOver();
        $("h1").text("Game Over, Press Any Key to Restart");
        
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout( () => {
            $("body").removeClass("game-over");
        }, 200);
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}