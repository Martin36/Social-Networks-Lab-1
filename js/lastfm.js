var lastfmApiKey = "0d342a0e38c97664eecfa764f703b1b9";
var lastfmSecret = "e7545c38c38ee3a1a36b17d637c69e15";

//$(function () {
//	var urlVars = getUrlVars();
//	var token = urlVars.token;
//	if (token !== undefined) {
//		//Then the user has authenticated to lastfm
//		getAuthUser(token);
//	}

//	getArtist("Elvis Presley");

//});

function getAuthUser(token) {
	var signString = "api_key" + lastfmApiKey + "methodauth.getSessiontoken" + token + lastfmSecret;
	var encodedSignString = encodeURIComponent(signString);
	var decodedSignString = unescape(encodedSignString);
	var signHash = CryptoJS.MD5(decodedSignString).toString();
	console.log(signString);

	var postObj = {
		method: "auth.getSession",
		api_key: lastfmApiKey,
		token: token,
		api_sig: signHash
	};

	$.ajax({
		type: 'POST',
		url: 'https://ws.audioscrobbler.com/2.0/?',
		data: postObj,
		dataType: 'jsonp',
		success: function (data) {
			// Handle success code here
			console.log(data);
		},
		error: function (code, message) {
			// Handle error here
		}
	});

}

function getArtist(artist) {
	return new Promise(function (resolve, reject) {
		artist = artist.replace(" ", "+");
		$.ajax({
			type: 'POST',
			url: 'https://ws.audioscrobbler.com/2.0/',
			data: 'method=artist.getinfo&' +
				'artist=' + artist + '&' +
				'api_key=57ee3318536b23ee81d6b27e36997cde&' +
				'format=json',
			dataType: 'jsonp',
			success: function (data) {
				// Handle success code here
				console.log(data);
				resolve(data);
			},
			error: function (code, message) {
				// Handle error here
			}
		});
	});
}

function authUser() {
	console.log("clicked!");
	var url = "http://www.last.fm/api/auth/?api_key=" + lastfmApiKey;
	window.location.href = url;
}
