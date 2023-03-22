const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;

let started = false;
if (!started) {
    $(".btn").css("pointerEvents", "none");
    $("u").click(function() {
        if (!started) {
            $("#level-title").text("Level " + level);
            $(".btn").css("pointerEvents", "auto");
            $("footer").hide();
            nextSequence();
            started = true;
    }});
};


$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(level);
});

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, 500 * i)
    };
};

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor) {
    $(".btn." + currentColor).addClass("pressed");
    setTimeout(function() {
        $(".btn." + currentColor).removeClass("pressed");
    }, 100) 
};

function checkAnswer() {
    if (userClickedPattern.length !== gamePattern.length) {
        for (i = 0; i < userClickedPattern.length; i++) {
            if (userClickedPattern[i] !== gamePattern[i]) {
                setTimeout(function() {
                    let audioWrong = new Audio("sounds/wrong.mp3");
                    audioWrong.play();
                    $("body").addClass("game-over");
                    // setTimeout(function() {
                    //     $("body").removeClass("game-over");
                    // }, 200);
                }, 200)
                $(".btn").css("pointerEvents", "none");
                $("#level-title").css("fontSize", "2rem");
                $("#level-title").after("<h1 id='level-title'>Game Over</h1>");
                $(".container").after("<h1 id='restart' id='level-title'>Click here to restart.</h1>");
                $("#restart").click(function() {
                    location.reload(true);
                });
            }
        }
    } else if (userClickedPattern.toString() === gamePattern.toString()) {
        level++;
        setTimeout(function() {
            $("#level-title").text("Level " + level);
        }, 300);
        
        setTimeout(function() {
            userClickedPattern = [];
            nextSequence();
        }, 1000);
    } else {
        setTimeout(function() {
            let audioWrong = new Audio("sounds/wrong.mp3");
            audioWrong.play();
            $("body").addClass("game-over");
            // setTimeout(function() {
            //     $("body").removeClass("game-over");
            // }, 200);
        }, 200)
        $(".btn").css("pointerEvents", "none");
        $("#level-title").css("fontSize", "2rem");
        $("#level-title").after("<h1 id='level-title'>Game Over</h1>");
        $(".container").after("<h1 id='restart'>Click <u>here</u> to restart.</h1>");
        $("#restart").click(function() {
            location.reload(true);
        });
    };
     
};