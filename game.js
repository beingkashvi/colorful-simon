var buttonColours=["blue","purple","yellow","red"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
var score=0;
var yourscore=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(document).on('touchstart',function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
    });

function nextSequence(){
    userClickedPattern=[];
    yourscore++;
    $("#your-title").text("Your Score = "+(yourscore-1));
    level++;
    
    $("#level-title").text("Level " + level);
    if(yourscore>=score){
        $("#high-title").text("High Score = "+ (yourscore-1));
    }
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            
            nextSequence();
        },1000);
    }
}
else{
    console.log("wrong");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over");
    setTimeout(function(){  
        $("h1").text("Press Any Key To Restart");
    },1000);
    startOver();
}
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    score=yourscore;
    yourscore=0;
}






