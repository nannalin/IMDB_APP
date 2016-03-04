(function () {
	$(init);

	function init() {
		$("#searchMovie").click(searchMovie);

		var movieTitle = $("#movieTitle");


		var table = $("#result");
		// find tbody to output result 
		var tbody = $("#container");
		// clone one is in the DOM , the other is in the memory
		var template = $("#template").clone();

		function searchMovie() {
			var title = movieTitle.val();
			console.log("title = " + title);


			$.ajax({
				url: "http://www.myapifilms.com/imdb/idIMDB?title=" + title + "&token=38156e0f-67c9-4027-af2c-8ac1d1d99398&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=4&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&quotes=0",
				crossDomain: true,
				dataType: "jsonp",
				success: renderMoviesWithTemplate
			});
		}

		function renderMoviesWithTemplate(response) {
			console.log(response);
			// empty the body in the DOM
			tbody.empty();

			for (var key in response.data.movies) {
				var movie = response.data.movies[key];
				var title = movie.title;
				var plot = movie.simplePlot;
				var posterUrl = movie.urlPoster;
				var imdbUrl = movie.urlIMDB;

				// this template tr is in the memory from cloning
				var tr = template.clone();
				tr.find(".link").attr("href", imdbUrl).html(title);
				tr.find(".plot").html(plot);
				tr.find(".poster").attr("src", posterUrl);

				// add this tr to the DOM
				tbody.append(tr);
			}
		}

		function renderMovies(response) {
			console.log(response);

			// remove all item in the tbody
			tbody.empty();

			for (var m in response.data.movies) {
				var movie = response.data.movies[m];
				var title = movie.title;
				var plot = movie.simplePlot;
				var posterUrl = movie.urlPoster;
				var imdbUrl = movie.urlIMDB;

				var tr = $("<tr>");
				var titleLink = $("<a>").attr("href", imdbUrl).html(title);
				var titleTd = $("<td>").append(titleLink);
				var plotTd = $("<td>" + plot + "</td>");
				var img = $("<img>").attr("src", posterUrl);
				var posterTd = $("<td>").append(img);

				tr.append(titleTd);
				tr.append(plotTd);
				tr.append(posterTd);

				// tbody is in a DOM. It has rander
				tbody.append(tr);

				console.log("title in loop = "+ title);
			}
		}
	}
}) ();