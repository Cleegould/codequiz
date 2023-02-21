var questionsArray = [  //questions
	{
		questionId: 1,
		question: "A(n) ___________ is a collection of items stored at contiguous memory locations.",
		answers: {
			a: 'Array',
			b: 'Group',
			c: 'Data Block',
			d: 'List'
		},
		correctAnswer: 'a'
	},
	{
		questionId: 2,
		question: "The _________ Log is a browser tool used for debugging javascript.",
		answers: {
			a: 'Internet',
			b: 'Chrome',
			c: 'Console',
			d: 'Explorer'
		},
		correctAnswer: 'c'
	},
	{
		questionId: 3,
		question: "__________ is a library used for managing HTML page layout.",
		answers: {
			a: 'Flexstrap',
			b: 'Javastrap',
			c: 'Bootbox',
			d: 'Bootstrap'
		},
		correctAnswer: 'd'
	},
	{
		questionId: 4,
		question: "CSS stands for ___________ Style Sheets.",
		answers: {
			a: 'Concurring',
			b: 'Cascading',
			c: 'Controlling',
			d: 'Constant'
		},
		correctAnswer: 'b'
	},
	{
		questionId: 5,
		question: "The __________ Tag defines a hyperlink in HTML.",
		answers: {
			a: 'Anchor',
			b: 'Link',
			c: 'Hyper',
			d: 'Var'
		},
		correctAnswer: 'a'
	}
];

var thisQuestionId = 0;
var countdown = 60;
var totalQuestions = questionsArray.length;
var score = 0;

function startQuiz() {	//function to start quiz
	
	setInterval(function () {
		countdown--;
		if (countdown === 0) {
			endQuiz("Times up!");
		}
		document.getElementById("timer").innerHTML = "Timer: " + countdown;
	}, 1000);

	document.getElementById('startButton').style.visibility = 'hidden';
	document.getElementById('instructions').style.visibility = 'hidden';
	showNextQuestion(thisQuestionId);
}

function showNextQuestion(thisId) {

	if (thisId == totalQuestions) {
		endQuiz("All done!");
		return;
	};

	//show hidden buttons
	document.getElementById('answer1Button').style.visibility = 'visible';
	document.getElementById('answer2Button').style.visibility = 'visible';
	document.getElementById('answer3Button').style.visibility = 'visible';
	document.getElementById('answer4Button').style.visibility = 'visible';

	//build question
	var thisQuestion = questionsArray[thisId].questionId + ". " + questionsArray[thisId].question;
	document.getElementById("questionContainer").innerHTML = thisQuestion;

	//build answer buttons
	document.getElementById("answer1Button").innerText = questionsArray[thisId].answers.a;	
	document.getElementById("answer2Button").innerText = questionsArray[thisId].answers.b;
	document.getElementById("answer3Button").innerText = questionsArray[thisId].answers.c;
	document.getElementById("answer4Button").innerText = questionsArray[thisId].answers.d;	
}

function chooseAnswer(answer) {

	if (answer == questionsArray[thisQuestionId].correctAnswer) {
		score++;
		document.getElementById("resultContainer").innerHTML += "<div class='green-text'>" + questionsArray[thisQuestionId].questionId + ". " + "Correct!</div>";
	}
	else {
		document.getElementById("resultContainer").innerHTML += "<div class='red-text'>" + questionsArray[thisQuestionId].questionId + ". " + "Incorrect!</div>";
		countdown = countdown - 10;
	}

	//advance to next question
	thisQuestionId++;	
	showNextQuestion(thisQuestionId);
}

function endQuiz(reason) {
	countdown = 0;
	document.getElementById('timer').style.visibility = 'hidden';
	document.getElementById('resultContainer').innerHTML += "<div>" + reason + "  Your score is " + score + "/5</div>"
	document.getElementById('endContainer').style.visibility = 'visible';
}

function submitInitials(){
	var newScore = {
		intials: document.getElementById('initialsTxt').value.trim(),
		score: score
	};

	//write scores to localstorage
	
	var existingEntries = JSON.parse(localStorage.getItem("Scores") || '[]');
	existingEntries.push(newScore);
	localStorage.setItem("Scores", JSON.stringify(existingEntries));

	//refresh game
	location.reload();
}

function getScores() {	
	document.getElementById('scores').style.visibility = 'visible';
	scores = JSON.parse(localStorage.getItem('Scores'));

	for (var i = 0; i <= scores.length; i++) {
		document.getElementById('allScores').innerHTML += "<div class='pad10-left'>" + scores[i].intials + " : " + scores[i].score + "</div>";
	}
		
}

function closeModal() {
	document.getElementById('allScores').innerHTML = "";
	document.getElementById('scores').style.visibility = 'hidden';
}