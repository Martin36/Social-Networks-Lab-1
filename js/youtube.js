// JavaScript source code
//TODO: spara youtube datan i databasen
function initYoutubeApi() {
	gapi.client.setApiKey("AIzaSyCEvx5qdM0hIYCT9YFgBCj1FI2_uDikNQE");
	gapi.client.load("youtube", "v3", function () {
	});
}

function loadAPIClientInterfaces() {
	gapi.client.setApiKey("AIzaSyCEvx5qdM0hIYCT9YFgBCj1FI2_uDikNQE");
	gapi.client.load('youtube', 'v3', function () {
		handleAPILoaded();
	});
}

function handleAPILoaded() {
	var request = gapi.client.youtube.search.list({
		part: "snippet",
		type: "video",
		q: "guided+meditation",
		maxResults: 5,
		order: "viewCount"
	});
	//execute the request
	request.execute(function (response) {
		console.log(response);
		var videoData = response.items[1];
		var videoUrl = "https://www.youtube.com/embed/" + videoData.id.videoId;
		$("#video-title").html(videoData.snippet.title);
		$("#video-player").attr("src", videoUrl);
	});


}

function start() {
	// 2. Initialize the JavaScript client library.
	gapi.client.init({
		'apiKey': 'AIzaSyCEvx5qdM0hIYCT9YFgBCj1FI2_uDikNQE',
	}).then(function () {
		// 3. Initialize and make the API request.
		return gapi.client.request({
			'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
		})
	}).then(function (response) {
		console.log(response.result);
	}, function (reason) {
		console.log('Error: ' + reason.result.error.message);
	});
};
// 1. Load the JavaScript client library.
gapi.load('client', loadAPIClientInterfaces);