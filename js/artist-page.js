$(function () {
	var urlVars = getUrlVars();
	var artist = urlVars.artist;
	getArtist(artist).then(function (data) {
		data = data.artist;
		console.log(data.bio.content);
		var splitInfo = data.bio.content.split(/\n/);
		splitInfo = splitInfo.filter(function (d) { return d !== ""; });
		console.log(splitInfo);
		var artistInfo = $("#artist-info");
		splitInfo.forEach(function (paragraph) {
			var p = $("<p></p>");
			p.html(paragraph);
			artistInfo.append(p);
		});
		$("#artist-name").html(data.name);
	});
});
