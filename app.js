var context;
var shape = new Object();
var board;
var score;
var n_food = 80;
var remining_food = 80;
var pac_color;
var start_time;
var finshing_time;
var interval;
var lives;
var slowTime = new Date();
var positionRight = true;

enemys = new Array();
var Movechance =0.3
var movingBouns = new Object();
var special1 = new Object();
special1.alive = true;
var special2 = new Object();
var special2 = new Object();
var AliveBouns = true;
special1.alive = true;
special2.alive = true;
var database = [
	{
		username: "k",
		password: "k",
	},
];

var remining_food;
var timer;
var n_enemies;
var five_color
var fifteen_color;
var twentyfive_color;
var keys_dic = { 'Left': 37, 'Up': 38, 'Right': 39, 'down': 40 }
var Left_Key = 37;
var Up_Key = 38;
var Right_Key = 39;
var Down_key = 40;
var five_color;
var fifteen_color;
var twentyfive_color
var duplicate_key = false;


$(document).ready(function () {
	opendiv(homePage);
});

function Start() {
	remining_food = n_food;
	board = new Array();
	lives = 5
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain_5 = 0.6 * remining_food;
	var food_remain_15 = 0.3 * remining_food;
	var food_remain_25 = 0.1 * remining_food;
	var pacman_remain = 1;
	start_time = new Date();
	finshing_time = new Date();
	finshing_time.setSeconds(finshing_time.getSeconds() + timer);
	for (var i = 0; i < n_enemies; i++) {
		enemys[i] = new Object();
	}

	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				n_enemies > 0 &&
				((i == 0 && j == 0) ||
					(i == 0 && j == 9) ||
					(i == 9 && j == 0) ||
					(i == 9 && j == 9))
			) {
				enemys[n_enemies - 1].i = i;
				enemys[n_enemies - 1].j = j;
				n_enemies--;
			}
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * (food_remain_5 + food_remain_15 + food_remain_25)) / cnt) {
					var randomNum2 = Math.random();
					if (randomNum2 < 0.6 && food_remain_5 > 0) {
						food_remain_5--;
						board[i][j] = 1;
					}
					else if (randomNum2 > 0.8 && food_remain_15 > 0) {
						food_remain_15--;
						board[i][j] = 3;
					}
					else if (food_remain_25 > 0) {
						food_remain_25--;
						board[i][j] = 5;
					}
					else {
						board[i][j] = 0;
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain_5)) / cnt) {
					shape.i = i;
					shape.iOrigin = i;
					shape.jOrigin = j;
					shape.j = j;
					board[i][j] = 2;
					pacman_remain--;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	if (pacman_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		i = emptyCell[0];
		j = emptyCell[1];
		shape.i = i;
		shape.iOrigin = i;
		shape.jOrigin = j;
		shape.j = j;
		board[i][j] = 2;
	}
	while (food_remain_5 > 0) {
		var emptyCell = findEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain_5--;
	}
	while (food_remain_15 > 0) {
		var emptyCell = findEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 3;
		food_remain_15--;
	}
	while (food_remain_25 > 0) {
		var emptyCell = findEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		food_remain_25--;
	}

	var emptyCell = findRandomCell(board)
	movingBouns.i = emptyCell[0]
	movingBouns.j = emptyCell[1]

	emptyCell = findRandomCell(board)
	special1.i = emptyCell[0]
	special1.j = emptyCell[1]


	emptyCell = findRandomCell(board)
	special2.i = emptyCell[0]
	special2.j = emptyCell[1]


	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 130);
}

function findEmptyCell(board) {
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			if (board[i][j] == 0)
				return [i, j];
		}
	}
}


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function findRandomCell(board) {
	while (true) {
		var i = Math.floor(Math.random() * 9 + 1);
		var j = Math.floor(Math.random() * 9 + 1);
		if (board[i][j] != 4) {
			return [i, j];
		}
	}
}

function GetKeyPressed() {
	if (keysDown[keys_dic['Up']]) {
		//up
		return 1;
	}
	if (keysDown[keys_dic['down']]) {
		//down
		return 2;
	}
	if (keysDown[keys_dic['Left']]) {
		//left
		return 3;
	}
	if (keysDown[keys_dic['Right']]) {
		//right
		return 4;
	}

}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	time = new Date();
	lblTime.value = ((finshing_time - time) / 1000).toFixed(1);
	if (lblTime.value <= 0) {
		window.clearInterval(interval)
		StopMusic()
		if (score > 100) {
			alert("Winnnnnnnnneerrr")
		}
		else {
			alert("You are better than " + score + " points")
		}
		return
	}

	lblLives.value = lives;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;

			if (board[i][j] == 2) {
				//pacman
				if (positionRight) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			} else if (board[i][j] == 1) {
				//food
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = five_color; //color
				context.fill();

			} else if (board[i][j] == 3) {
				//food
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteen_color //color
				context.fill();

			} else if (board[i][j] == 5) {
				//food
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = twentyfive_color; //color
				context.fill();

			} else if (board[i][j] == 4) {
				//wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
	{
		if (AliveBouns) {
			var center = new Object();
			center.x = movingBouns.i * 60 + 15;
			center.y = movingBouns.j * 60 + 15;
			var img = new Image();
			img.src = "cherry.png";
			context.drawImage(img, center.x, center.y, 30, 30);
		}

		if (special1.alive) {
			var center = new Object();
			center.x = special1.i * 60 + 30;
			center.y = special1.j * 60 + 30;
			var img = new Image();
			img.src = "hourglass.png";
			context.drawImage(img, center.x, center.y, 30, 30);
		}

		if (special2.alive) {
			var center = new Object();
			center.x = special2.i * 60 + 15;
			center.y = special2.j * 60 + 15;
			var img = new Image();
			img.src = "pngwing.com.png";
			context.drawImage(img, center.x, center.y, 30, 30);
		}

	}
	{
		for (var i = 0; i < enemys.length; i++) {
			var enemy = enemys[i];
			var center = new Object();
			var img = new Image();
			center.x = enemy.i * 60 + 15;
			center.y = enemy.j * 60 + 15;
			img.src = "enemy" + (i + 1) + ".png";
			context.drawImage(img, center.x, center.y, 40, 40);
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	var left = false;
	if (x == 1) {
		//up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		//down
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		//left
		positionRight = false;
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		//right
		positionRight = true;

		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		remining_food--;
		score += 5;
	}
	if (board[shape.i][shape.j] == 3) {
		remining_food--;
		score += 15;
	} if (board[shape.i][shape.j] == 5) {
		remining_food--
		score += 25;
	}
	if (AliveBouns) {
		if (Math.random() < 0.4) {
			var random = Math.random();
			if (random < 0.25 && movingBouns.i > 1 && board[movingBouns.i - 1][movingBouns.j] != 4) {
				movingBouns.i--
			}
			else if (random > 0.75 && movingBouns.i < 9 && board[movingBouns.i + 1][movingBouns.j] != 4) {
				movingBouns.i++;
			}
			else if (random > 0.5 && movingBouns.j > 1 && board[movingBouns.i][movingBouns.j - 1] != 4) {
				movingBouns.j--;
			}
			else if (random < 0.5 && movingBouns.j < 9 && board[movingBouns.i][movingBouns.j + 1] != 4) {
				movingBouns.j++;
			}
		}
	}

	slowed = 0.3
	time = new Date();
	let t = ((slowTime - time) / 1000).toFixed(1);
	if (t <= 0) {

		slowed = 0;

	}

	for (var ix = 0; ix < enemys.length; ix++) {
		if (Math.random() < Movechance - slowed) {
			if (enemys[ix].i > shape.i && board[enemys[ix].i - 1][enemys[ix].j] != 4) {
				enemys[ix].i--
			}
			else if (enemys[ix].i < shape.i && board[enemys[ix].i + 1][enemys[ix].j] != 4) {
				enemys[ix].i++;
			}
			else if (enemys[ix].j > shape.j && board[enemys[ix].i][enemys[ix].j - 1] != 4) {
				enemys[ix].j--;
			}
			else if (enemys[ix].j < shape.j && board[enemys[ix].i][enemys[ix].j + 1] != 4) {
				enemys[ix].j++;
			}
		}
		if (enemys[ix].j == shape.j && enemys[ix].i == shape.i) {
			return hit();
		}

		if (AliveBouns && movingBouns.j == shape.j && movingBouns.i == shape.i) {
			AliveBouns = false
			score += 50;
		}

		if (special1.alive && special1.j == shape.j && special1.i == shape.i) {
			special1.alive = false
			start_time = new Date();
			slowTime = new Date();
			slowTime.setSeconds(slowTime.getSeconds() + 2);

		}


		if (special2.alive && special2.j == shape.j && special2.i == shape.i) {
			special2.alive = false
			lives += 1
		}



		board[shape.i][shape.j] = 2;
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;
		if (score >= 20 && time_elapsed <= 10) {
			pac_color = "green";
		}
		if (!AliveBouns && remining_food == 0) {
			Draw();
			window.clearInterval(interval);
			StopMusic()
			window.alert("Game completed");
		} else {
			Draw();
		}
	}
}

function hit() {
	score -= 10
	if (lives == 1) {
		lives--;
		Draw()
		alert("Game Over")
		window.clearInterval(interval);
		StopMusic()
	}
	else {
		lives--;
		var n_enemies = enemys.length
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				if (
					n_enemies > 0 &&
					((i == 0 && j == 0) ||
						(i == 0 && j == 9) ||
						(i == 9 && j == 0) ||
						(i == 9 && j == 9))
				) {
					enemys[n_enemies - 1].i = i;
					enemys[n_enemies - 1].j = j;
					n_enemies--;
				}
			}
		}
		board[shape.i][shape.j] = 0;
		shape.i = shape.iOrigin;
		shape.j = shape.jOrigin;
		return Draw();
	}
}

function opendiv(ID) {
	closediv();
	var t = $(ID);
	if (ID == "#settingPage1") {

		StopMusic();
	}

	t.show();

	if (ID === "#gamePage") {
		context = canvas.getContext("2d");
		Start();
	}
}

function closediv() {
	$(".flexbox-container").hide();
	window.clearInterval(interval);
	StopMusic()
}

function submitRegistration() {
	var flag = false;
	var Username = $("#signUsername").val();
	if (isUserUsed(Username)) {
		alert("User Name in use allready");
		return;
	}
	var Password = $("#signPassword").val();
	if (!checkPwd(Password)) {
		return;
	}

	var Name = $("#signFull").val();
	if (/\d/.test(Name)) {
		alert("Name Cannt contains numbers");
		return;
	}

	var Email = $("#signEmail").val();
	if (!validateEmail(Email)) {
		alert("Not Valid Email");
		return;
	}

	var date = $("#signDate").val();
	if (
		Username.length == 0 ||
		Password.length == 0 ||
		Name.length == 0 ||
		Email.length === 0 ||
		date.length === 0
	) {
		alert("One or more field are empty");
		return;
	}
	database.push({
		username: Username,
		password: Password,
	});

	alert("Account made successfully");
	opendiv("#loginPage");
}

function checkPwd(str) {
	if (str.length < 6) {
		alert("Password is too short");
		return false;
	} else if (str.search(/\d/) == -1) {
		alert("Password need to have number in it");
		return false;
	} else if (str.search(/[a-zA-Z]/) == -1) {
		alert("Password need to have lettes in it");
		return false;
	}
	return true;
}

function checkName(str) {
	if (str.length < 6) {
		alert("Password is too short");
		return false;
	} else if (str.search(/\d/) == -1) {
		alert("Password need to have number in it");
		return false;
	} else if (str.search(/[a-zA-Z]/) == -1) {
		alert("Password need to have lettes in it");
		return false;
	}
	return true;
}

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function isUserUsed(user) {
	for (let i = 0; i < database.length; i++) {
		if (database[i].username === user) return true;
	}
	return false;
}

function signIn() {
	var user = $("#login_username").val();
	var pass = $("#login_password").val();
	if (database.find((e) => e.username == user && e.password == pass)) {
		opendiv("#settingPage");
	} else {
		alert("Sorry, wrong username and password!");
	}
}

function Check_Key_Press(inputField, event) {
	event.preventDefault();
	inputField.value = event.key;
	var cur_keys = [];
	cur_keys.push($('#leftkey').val());
	cur_keys.push($('#rightkey').val());
	cur_keys.push($('#upkey').val());
	cur_keys.push($('#downkey').val());
	if (new Set(cur_keys).size !== cur_keys.length) {
		window.alert("This Button Is Already Being Used");
		event.stopPropagation();
		event.preventDefault();
		return
	}

	if (inputField.id.localeCompare('leftkey') == 0) {
		Left_Key = event.keyCode;
	}
	else if (inputField.id.localeCompare('rightkey') == 0) {
		Right_Key = event.keyCode;
	}
	else if (inputField.id.localeCompare('upkey') == 0) {
		Up_Key = event.keyCode;
	}
	else if (inputField.id.localeCompare('downkey') == 0) {
		Down_Key = event.keyCode;
	}

}


function config() {
	remining_food = document.getElementById("numBallsInput").value;
	timer = document.getElementById("timer").value;
	timer = parseInt(document.getElementById("timer").value);
	n_enemies = document.getElementById("numMonsterInput").value;
	five_color = document.getElementById("5_color").value
	fifteen_color = document.getElementById("15_color").value
	twentyfive_color = document.getElementById("25_color").value;
	if (duplicate_key) {
		window.alert("Cant Start Game With Duplicate Keys.");
		return;
	}
	if (isNaN(timer) ||timer<=0) {
		window.alert("Invalid Time");
		return;
	}
	opendiv('#gamePage')
	getConfigForGame()
	PlayMusic();

}


function RandomConfig() {

	document.getElementById("numBallsInput").value = Math.floor(Math.random() * 40) + 50;
	document.getElementById("numBallsOutput").innerHTML = document.getElementById("numBallsInput").value;
	document.getElementById("timer").value = Math.floor(Math.random() * 60) + 60;

	document.getElementById("numMonsterInput").value = Math.floor(Math.random() * 4);
	document.getElementById("numMonsterOutput").innerHTML = document.getElementById("numMonsterInput").value;

	document.getElementById("5_color").value = '#' + Math.floor(Math.random() * 16777215).toString(16);
	document.getElementById("15_color").value = '#' + Math.floor(Math.random() * 16777215).toString(16);
	document.getElementById("25_color").value = '#' + Math.floor(Math.random() * 16777215).toString(16);

}


function PlayMusic() {
	document.getElementById("music").play();
	document.getElementById("music").volume = 0.25;
}

function StopMusic() {
	document.getElementById("music").pause();
	document.getElementById("music").currentTime = 0;
}


function Check_Key_Press(inputField, event) {
	event.preventDefault();
	inputField.value = event.key;
	var cur_keys = [];
	cur_keys.push($('#leftkey').val());
	cur_keys.push($('#rightkey').val());
	cur_keys.push($('#upkey').val());
	cur_keys.push($('#downkey').val());
	if (new Set(cur_keys).size !== cur_keys.length) {
		duplicate_key = true;
	}
	else {
		duplicate_key = false;
	}

	if (inputField.id.localeCompare('leftkey') == 0) {
		keys_dic['Left'] = event.keyCode;
	}
	else if (inputField.id.localeCompare('rightkey') == 0) {
		keys_dic['Right'] = event.keyCode;

	}
	else if (inputField.id.localeCompare('upkey') == 0) {
		keys_dic['Up'] = event.keyCode;
	}
	else if (inputField.id.localeCompare('downkey') == 0) {
		keys_dic['down'] = event.keyCode;
	}

}

function switchDialogAboout() {
	$('#about_window').show();
	$(document).mouseup(function (e) {
		var container = $("#about_window");

		// if the target of the click isn't the container nor a descendant of the container
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.hide();
		}
	});
	//esc press
	$(document).on('keydown', function (e) {
		if (e.keyCode == 27) {
			$('#about_window').hide();
		}
	});
	$('#close').click(function () {
		$('#about_window').hide()
	})
}


function getConfigForGame(){

	document.getElementById("leftkey_game").value = document.getElementById("leftkey").value
	document.getElementById("rightkey_game").value = document.getElementById("rightkey").value
	document.getElementById("upkey_game").value = document.getElementById("upkey").value
	document.getElementById("downkey_game").value = document.getElementById("downkey").value

	document.getElementById("5_color_game").value=	document.getElementById("5_color").value;
	document.getElementById("15_color_game").value=	document.getElementById("15_color").value;
	document.getElementById("25_color_game").value=	document.getElementById("25_color").value;

	document.getElementById("numBalls_game").value=document.getElementById("numBallsInput").value;
	document.getElementById("timer_game").value= parseInt(document.getElementById("timer").value);
	document.getElementById("numMonster_game").value=document.getElementById("numMonsterInput").value;
}
