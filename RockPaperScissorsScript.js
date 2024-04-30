/*!
 * jQuery CLI
 * Simulating a command line interface with jQuery
 *
 * @version : 1.0.0
 * @author : Paulo Nunes (http://syndicatefx.com)
 * @demo : https://codepen.io/syndicatefx/pen/jPxXpz
 * @license: MIT
 */

/*!*
 * jQuery Text Typer plugin
 * https://github.com/gr8pathik/jquery-texttyper
 */
(function (e) {
  "use strict";
  e.fn.textTyper = function (t) {
    var n = {
        typingClass: "typing",
        beforeAnimation: function () {},
        afterAnimation: function () {},
        speed: 10,
        nextLineDelay: 400,
        startsFrom: 0,
        repeatAnimation: false,
        repeatDelay: 4e3,
        repeatTimes: 1,
        cursorHtml: '<span class="cursor">|</span>'
      },
      r = e.extend({}, n, t);
    this.each(function () {
      var t = e(this),
        n = 1,
        i = "typingCursor";
      var s = t,
        o = s.length,
        u = [];
      while (o--) {
        u[o] = e.trim(e(s[o]).html());
        e(s[o]).html("");
      }
      t.init = function (e) {
        var n = r.beforeAnimation;
        if (n) n();
        t.animate(0);
      };
      t.animate = function (o) {
        var a = s[o],
          f = r.typingClass,
          l = r.startsFrom;
        e(a).addClass(f);
        var c = setInterval(function () {
          var f = r.cursorHtml;
          f = e("<div>").append(e(f).addClass(i)).html();
          e(a).html(u[o].substr(0, l) + f);
          l++;
          if (u[o].length < l) {
            clearInterval(c);
            o++;
            if (s[o]) {
              setTimeout(function () {
                e(a).html(u[o - 1]);
                t.animate(o);
              }, r.nextLineDelay);
            } else {
              e(a)
                .find("." + i)
                .remove();
              if (
                r.repeatAnimation &&
                (r.repeatTimes == 0 || n < r.repeatTimes)
              ) {
                setTimeout(function () {
                  t.animate(0);
                  n++;
                }, r.repeatDelay);
              } else {
                var h = r.afterAnimation;
                if (h) h();
              }
            }
          }
        }, r.speed);
      };
      t.init();
    });
    return this;
  };
})(jQuery);
//end jquery

// Let's do it!!
$(document).ready(function () {
  // Hide unnecessary elements and focus on the input box
  $(".command").hide();
  $('input[type="text"]').focus();

  // Initialize the game to display the #home section
  $("#home").addClass("open");
  $("#home").textTyper({
    speed: 40,
    afterAnimation: function () {
      $(".command").fadeIn();
      $('input[type="text"]').focus();
      $('input[type="text"]').val("");
    }
  });

  // get array of section ids, that exist in DOM
  var sectionArray = [];
  $("section").each(function (i, e) {
    sectionArray.push($(e).attr("id"));
  });

  // Command Input------------------------------
  $('input[type="text"]').keyup(function (e) {
    if (e.which == 13) {
      // ENTER key pressed
      $(".command").hide();
      var userInput = $('input[type="text"]').val();
      var userInputL = userInput.toLowerCase();

      // Display section with id == userInput and hide all others
      $('section[id="' + userInput + '"]')
        .addClass("open")
        .siblings()
        .removeClass("open");

      // Process input
      processInput(userInput);

      // All sections with class .open init textTyper
      $(".open").textTyper({
        speed: 20,
        afterAnimation: function () {
          $(".command").fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val("");
        }
      });
    } // end if ENTER key pressed
  }); // end keyup function
  // End Command Input-----------------------------
});

// Astherek's random pick Function

function asthePicks(oppNum) {
 switch (oppNum) {
    case 1 :
      return "Vanza Thrkhavor is your opponent. She has little experience, so you may win easily.";
      break;
    case 2 :
      return "Lzaenoth Hajthjng is your opponent. I have heard that she uses the same weapon every time.";
      break;
    case 3 :
      return "Dnohoth Hajthjng is your opponent. He cares not if he wins or loses.";
      break;
    case 4 :
      return "I, Astherek Abtherek, am your opponent. All you should know is that I am far superior to you. Leave your illusions of winning behind.";
      break;
    case 5 : 
      return "Hlfasta Bthfesteuu is your opponent. Be wary, she is known to cheat.";
      break;
    case 6 :
      return "Kavvjng Abtherek is your opponent. He is undefeated. You have no chance of beating him.";
      break;
    case 7 :
      return "Ithng Chdnoth is your opponent. He is difficult to read. He is a thespian, you see.";
      break;
    case 8 :
     return "Knfe Thorftuu is your opponent. He is skillful, but not too difficult to defeat. A true Kagouti that eats only grass.";
     break;
    case 9 :
      return "Thengstuu Dnech is your opponent. He does not take this too seriously. Do not be prideful of a win.";
      break;
    default :
      return "Your opponent is yourself. Perhaps the hardest opponent you could have been given.";
      break;
  }
}

// opponent weapon generator

function getOppWeap(oppNum, userWeap) {
  let weapNum
  if (oppNum === 2) {
    weapNum = 0;
  } else if (oppNum === 4 || oppNum === 5 || oppNum === 6) {
    if (userWeap === "rock") {
     weapNum = 1;
    } else if (userWeap === "paper") {
      weapNum = 2;
    } else {
      weapNum = 0;
    }
  } else {
    weapNum = Math.floor(Math.random() * 3);
  }
  switch (weapNum) {
    case 0 :
      return "rock";
      break;
    case 1 : 
      return "paper";
      break;
    case 2 : 
      return "scissors";
      break;
    default :
      return "nothing";
      break;
  }
}


// win loss calculator

function determineWinner(userWeap, oppWeap) {
  if (userWeap === oppWeap) {
    return "tie. It seems this was an equal match.";
  } else if (userWeap === "rock" && oppWeap === "paper") {
    return "lose. You have been made invisible and useless.";
  } else if (userWeap === "paper" && oppWeap === "scissors") {
    return "lose. You have been cut to pieces.";
  } else if (userWeap === "scissors" && oppWeap === "rock") {
    return "lose. You have been crushed beyond recognition.";
  } else if (userWeap === "nothing") {
      return "lose. Did you truly think you could win with nothing?";
  } else {
    return "win. This was unexpected. You will not be so lucky next time.";
  }
  }

let cachedRandNum = null; // Variable to store the generated random number

function generateRandomNumber() {
  if (currentGameState === "rock" || currentGameState === "paper" || currentGameState === "scissors" || currentGameState === "nothing") {
    cachedRandNum = Math.floor(Math.random() * 10);
  }
  return cachedRandNum;
}



// Define game states
var currentGameState = "home"; // Start the game at the "home" state
var userWeap;
var oppWeap;
let oppNum;
// Function to process user input and update the game state
function processInput(userInput) {
  let userInputL = userInput.toLowerCase();
  let oppName = asthePicks(oppNum); 
  let oppPronoun = ""
    switch (oppNum) {
      case 1:
      case 2:
      case 5:
    	oppPronoun = "She has";
        break;
      case 4:
        oppPronoun = "I have";
   	break;
      case 3:
      case 6:
      case 7:
      case 8:
      case 9:
       oppPronoun = "He has";
       break;
      default:
       oppPronoun = "You have";
       break;
}

  switch (currentGameState) {
    case "home":
      if (userInputL == "hello") {
        $("#headHello").html(`&raquo;${userInput}`);
        $("#hello").addClass("open").siblings().removeClass("open");
        currentGameState = "hello";
      } else {
        $("#headErrorHome").html(`&raquo;${userInput}`);
        $("#errorHome").addClass("open").siblings().removeClass("open");
      }
      break;
    case "hello":
      if (userInputL == "yes") {
        $("#headKnow").html(`&raquo;${userInput}`);
        $("#know").addClass("open").siblings().removeClass("open");
        currentGameState = "know";
      } else if (userInputL == "no") {
        $("#headTeach").html(`&raquo;${userInput}`);
        $("#teach").addClass("open").siblings().removeClass("open");
        currentGameState = "teach";
      } else {
        $("#headErrorHello").html(`&raquo;${userInput}`);
        $("#errorHello").addClass("open").siblings().removeClass("open");
      }
      break;
    case "know":
      if (userInputL == "thank you") {
        $("#headThankYou").html(`&raquo;${userInput}`);
        $("#thankYou").addClass("open").siblings().removeClass("open");
        currentGameState = "thankYou";
      } else {
        $("#headErrorKnow").html(`&raquo;${userInput}`);
        $("#errorKnow").addClass("open").siblings().removeClass("open");
      }
      break;
    case "teach":
      if (userInputL == "thank you") {
        $("#headThankYou").html(`&raquo;${userInput}`);
        $("#thankYou").addClass("open").siblings().removeClass("open");
        currentGameState = "thankYou";
      } else {
        $("#headErrorTeach").html(`&raquo;${userInput}`);
        $("#errorTeach").addClass("open").siblings().removeClass("open");
      }
      break;
    case "thankYou":
      if (userInputL == "rock") {
        $("#headRock").html(`&raquo;${userInput}`);
        $("#rock").addClass("open").siblings().removeClass("open");
        currentGameState = "rock";
        userWeap = "rock";
		oppNum = generateRandomNumber();
      oppWeap = getOppWeap(oppNum, userWeap);
      } else if (userInputL == "paper") {
        $("#headPaper").html(`&raquo;${userInput}`);
        $("#paper").addClass("open").siblings().removeClass("open");
        currentGameState = "paper";
        userWeap = "paper";
		oppNum = generateRandomNumber();
      oppWeap = getOppWeap(oppNum, userWeap);
      } else if (userInputL == "scissors") {
        $("#headScissors").html(`&raquo;${userInput}`);
        $("#scissors").addClass("open").siblings().removeClass("open");
        currentGameState = "scissors";
        userWeap = "scissors";
		oppNum = generateRandomNumber();
      oppWeap = getOppWeap(oppNum, userWeap);
      } else {
        $("#headErrorThankYou").html(`&raquo;${userInput}`);
        $("#errorThankYou").addClass("open").siblings().removeClass("open");
        currentGameState = "wait";
        userWeap = "nothing";
		oppNum = generateRandomNumber();
        oppWeap = getOppWeap(oppNum, userWeap);
      }

      break;
    case "wait":
      if (userInputL == "wait, what?") {
        $("#headNothing").html(`&raquo;${userInput}`);
        $("#nothing").addClass("open").siblings().removeClass("open");
        currentGameState = "nothing";
      } else {
        $("#headErrorWait").html(`&raquo;${userInput}`);
        $("#errorWait").addClass("open").siblings().removeClass("open");
      }
      break;
    case "rock":
    case "paper":
    case "scissors":
    case "nothing":
      if (userInputL == "i'll choose") {
        $("#headUserPick").html(`&raquo;${userInput}`);
        $("#userPick").addClass("open").siblings().removeClass("open");
        currentGameState = "userPick";
      } else if (userInputL == "you pick") {
        $("#headAsthePick").html(`&raquo;${userInput}`);
	    $("#oppName").html(`${oppName}`);
        $("#asthePick").addClass("open").siblings().removeClass("open");
        currentGameState = "theGame";
      } else {
        $("#headErrorRockPaperScissors").html(`&raquo;${userInput}`);
        $("#errorRockPaperScissors")
          .addClass("open")
          .siblings()
          .removeClass("open");
      }
      break;
    // user input shows dialogue for that opponent, changes state to "do you want to start?"
    case "userPick":
      switch (userInputL) {
        case "vanza":
          $("#headVanza").html(`&raquo;${userInput}`);
          $("#vanza").addClass("open").siblings().removeClass("open");
		  oppNum = 1;
          currentGameState = "theGame";
          break;
        case "lzaenoth":
          $("#headLzaenoth").html(`&raquo;${userInput}`);
          $("#lzaenoth").addClass("open").siblings().removeClass("open");
		  oppNum = 2;
          currentGameState = "theGame";
          break;
        case "dnohoth":
          $("#headDnohoth").html(`&raquo;${userInput}`);
          $("#dnohoth").addClass("open").siblings().removeClass("open");
		  oppNum = 3;
          currentGameState = "theGame";
          break;
        case "hlfasta":
          $("#headHlfasta").html(`&raquo;${userInput}`);
          $("#hlfasta").addClass("open").siblings().removeClass("open");
		  oppNum = 5;
          currentGameState = "theGame";
          break;
        case "kavvjng":
          $("#headKavvjng").html(`&raquo;${userInput}`);
          $("#kavvjng").addClass("open").siblings().removeClass("open");
		  oppNum = 6;
          currentGameState = "theGame";
          break;
        case "ithng":
          $("#headIthng").html(`&raquo;${userInput}`);
          $("#ithng").addClass("open").siblings().removeClass("open");
		  oppNum = 7;
          currentGameState = "theGame";
          break;
        case "knfe":
          $("#headKnfe").html(`&raquo;${userInput}`);
          $("#knfe").addClass("open").siblings().removeClass("open");
		  oppNum = 8;
          currentGameState = "theGame";
          break;
        case "thengstuu":
          $("#headThengstuu").html(`&raquo;${userInput}`);
          $("#thengstuu").addClass("open").siblings().removeClass("open");
		  oppNum = 9;
          currentGameState = "theGame";
          break;
        case "astherek":
          $("#headAstherek").html(`&raquo;${userInput}`);
          $("#astherek").addClass("open").siblings().removeClass("open");
		  oppNum = 4;
          currentGameState = "theGame";
          break;
        case "asthe":
          $("#headAsthe").html(`&raquo;${userInput}`);
          $("#asthe").addClass("open").siblings().removeClass("open");
		  oppNum = 4;
          currentGameState = "theGame";
          break;
        default:
          $("#headErrorUserPick").html(`&raquo;${userInput}`);
          $("#errorUserPick").addClass("open").siblings().removeClass("open");
          currentGameState = "errorUserPick";
          break;
      }
      break;
    case "errorUserPick":
      switch (userInputL) {
        case "vanza":
          $("#headVanza").html(`&raquo;${userInput}`);
          $("#vanza").addClass("open").siblings().removeClass("open");
		  oppNum = 1;
          currentGameState = "theGame";
          break;
        case "lzaenoth":
          $("#headLzaenoth").html(`&raquo;${userInput}`);
          $("#lzaenoth").addClass("open").siblings().removeClass("open");
		  oppNum = 2;
          currentGameState = "theGame";
          break;
        case "dnohoth":
          $("#headDnohoth").html(`&raquo;${userInput}`);
          $("#dnohoth").addClass("open").siblings().removeClass("open");
		  oppNum = 3;
          currentGameState = "theGame";
          break;
        case "hlfasta":
          $("#headHlfasta").html(`&raquo;${userInput}`);
          $("#hlfasta").addClass("open").siblings().removeClass("open");
		  oppNum = 5;
          currentGameState = "theGame";
          break;
        case "kavvjng":
          $("#headKavvjng").html(`&raquo;${userInput}`);
          $("#kavvjng").addClass("open").siblings().removeClass("open");
		  oppNum = 6;
          currentGameState = "theGame";
          break;
        case "ithng":
          $("#headIthng").html(`&raquo;${userInput}`);
          $("#ithng").addClass("open").siblings().removeClass("open");
		  oppNum = 7;
          currentGameState = "theGame";
          break;
        case "knfe":
          $("#headKnfe").html(`&raquo;${userInput}`);
          $("#knfe").addClass("open").siblings().removeClass("open");
		  oppNum = 8;
          currentGameState = "theGame";
          break;
        case "thengstuu":
          $("#headThengstuu").html(`&raquo;${userInput}`);
          $("#thengstuu").addClass("open").siblings().removeClass("open");
		  oppNum = 9;
          currentGameState = "theGame";
          break;
        case "astherek":
          $("#headAstherek").html(`&raquo;${userInput}`);
          $("#astherek").addClass("open").siblings().removeClass("open");
		  oppNum = 4;
          currentGameState = "theGame";
          break;
        case "asthe":
          $("#headAsthe").html(`&raquo;${userInput}`);
          $("#asthe").addClass("open").siblings().removeClass("open");
		  oppNum = 4;
          currentGameState = "theGame";
          break;
        default:
          $("#headAsthePick").html(`&raquo;${userInput}`);
		  $("#oppName").html(`${oppName}`);
          $("#asthePick").addClass("open").siblings().removeClass("open");
          currentGameState = "theGame";
          break;
      }
      break;
    case "theGame":
      if (userInputL == "yes") {
        let result = determineWinner(userWeap, oppWeap);
        $("#headGameResult").html(`&raquo;${userInput}`);
	    $("#resultInfo").html(`${oppPronoun} chosen ${oppWeap} against your ${userWeap}. It looks like you ${result}`);
        $("#gameResult").addClass("open").siblings().removeClass("open");
        currentGameState = "gameEnd";
      } else if (userInputL == "no") {
        $("#headGameHold").html(`&raquo;${userInput}`);
        $("#gameHold").addClass("open").siblings().removeClass("open");
        currentGameState = "gameHold";
      } else {
        $("#headGame").html(`&raquo;${userInput}`);
        $("#errorGame").addClass("open").siblings().removeClass("open");
      }
      break;
    case "gameHold":
      if (userInputL == "start over") {
        $("#headThankYou").html(`&raquo;${userInput}`);
        $("#thankYou").addClass("open").siblings().removeClass("open");
        currentGameState = "thankYou";
      } else if (userInputL == "leave") {
        $("#headGameEndBad").html(`&raquo;${userInput}`);
        $("#gameEndBad").addClass("open").siblings().removeClass("open");
	   currentGameState = "helloAgain";
      } else {
		window.close();
	  }
      break;
    case "gameEnd":
      if (userInput == "play again") {
        $("#headThankYou").html(`&raquo;${userInput}`);
        $("#thankYou").addClass("open").siblings().removeClass("open");
        currentGameState = "thankYou";
      } else if (userInput == "leave") {
        $("#headGameEnd").html(`&raquo;${userInput}`);
        $("#gameEnd").addClass("open").siblings().removeClass("open");
		currentGameState = "helloAgain";
      } else {
	    window.close();
	  }
      break;
	  case "helloAgain" :
		if (userInput == "hello again") {
		$("#headHome").html(`&raquo;${userInput}`);
        $("#home").addClass("open").siblings().removeClass("open");
        currentGameState = "hello";
      } else {
        window.close();
		}
    default:
      break;
  }
}
