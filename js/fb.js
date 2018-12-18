// JavaScript source code
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		$(".fb-login-button").hide();
		$("#fb-logout").show();
		testAPI();
	} else {
		// The person is not logged into your app or we are unable to tell.
		document.getElementById('status').innerHTML = 'Please log ' +
			'into this app.';
		$(".fb-login-button").show();
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function (response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function () {
	FB.init({
		appId: '1947842912095857',
		cookie: true,  // enable cookies to allow the server to access
		// the session
		xfbml: true,  // parse social plugins on this page
		version: 'v2.8' // use graph api version 2.8
	});

	// Now that we've initialized the JavaScript SDK, we call
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.

	FB.getLoginStatus(function (response) {
		statusChangeCallback(response);
	});

};

// Load the SDK asynchronously
(function (d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me?fields=id,name,music,friends,birthday,email', function (response) {
		console.log(response);
		console.log('Successful login for: ' + response.name);

		//Add the user to the database
		var names = response.name.split(" ");
		if (names.length > 2) console.log("You have too many names!");
		var firstName = names[0];
		var lastName = names[1];
		var userInfo = {
			fbId: response.id,
			firstName: firstName,
			lastName: lastName,
			email: response.email,
			dateOfBirth: response.birthday
		};

		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/addUser',
			data: userInfo,
			success: function (data) {
				// Handle success code here
				console.log("User added to database");
			},
			error: function (code, message) {
				// Handle error here
			}
		});

		document.getElementById('status').innerHTML =
			'Thanks for logging in, ' + response.name + '!';

		document.getElementById('email').innerHTML =
			'Email: ' + response.email;

		createMusicList(response.music.data);

	});
}

function createMusicList(artists) {
	var artistTable = $("#artist-table tbody");
	artists.forEach(function (artist) {
		var row = $("<tr></tr>");
		var nameCell = $("<td></td>");
		nameCell.html(artist.name);
		var dateCell = $("<td></td>");
		dateCell.html(new Date(artist.created_time).toDateString());
		row.append(nameCell);
		row.append(dateCell);
		row.click(function (event) {
			window.location.href = window.location.href + "artist-page.html?artist=" + artist.name.replace(" ", "+");
		});
		artistTable.append(row);
	});
}

function logoutFB() {
	FB.logout(function () {
		clearTable();
		$("#status").html("You are logged out!");
		$("#fb-logout").hide();
		$(".fb-login-button").show();

	});
}

function clearTable() {
	$("#artist-table tbody").empty();
}