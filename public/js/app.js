// Load my_boards on page load
$.ajax({
  method: 'GET',
  url: '/api/my_boards.json',
  dataType: 'json'
})
.done(function(data) {
  //handle successful response
  display(data);
})
.fail(function() {
  //Handle errors
  console.log("Unable to connect.");
})
.always(function() {
  //Always update the UI with status
});

function loadPage (page) {
  $.ajax({
    method: 'GET',
    url: '/api/' + page,
    dataType: 'json'
  })
  .done(function(data) {
    //handle successful response
    display(data);
  })
  .fail(function() {
    //Handle errors
    console.log("Unable to connect.");
  })
  .always(function() {
    //Always update the UI with status
  });
}

function display(response) {
  var bullet = '&#8226';
  // Fastenate Structure
  var mainPage = document.getElementById("mainPage");
    var header = document.createElement("div");
      var plusButton = document.createElement("button");
    var menu = document.createElement("ul");
      var random = document.createElement("li");
      var myBoards = document.createElement("li");
      var getTheApp = document.createElement("li");
    var threads = document.createElement("div");
    var footer = document.getElementById("footer");
  //header
  header.setAttribute("class", "header");
  mainPage.appendChild(header);

  //menu
  menu.setAttribute("class", "menu");
  mainPage.appendChild(menu);

  //random
  random.setAttribute("class", "random");
  random.className = "menuItems";
  random.innerHTML = "RANDOM " + bullet + " ";
  random.onclick = function () {
    mainPage.innerHTML = "";
    footer.innerHTML = "";
    loadPage('random.json');
  };
  menu.appendChild(random);

  //myBoards
  myBoards.setAttribute("class", "myBoards");
  myBoards.className = "menuItems";
  myBoards.innerHTML = "MY BOARDS " + bullet + " ";
  myBoards.onclick = function () {
    mainPage.innerHTML = "";
    footer.innerHTML = "";
    loadPage('my_boards.json');
  };
  menu.appendChild(myBoards);

  //getTheApp
  getTheApp.setAttribute("class", "getTheApp");
  getTheApp.className = "menuItems";
  getTheApp.innerHTML = "GET THE APP";
  getTheApp.onclick = function () {
    mainPage.innerHTML = "";
    footer.innerHTML = "";
    loadPage('get_the_app.json');
  };
  menu.appendChild(getTheApp);

  //threadContainer
  threads.className = "threadContainer";
  mainPage.appendChild(threads);
  var title;
  var imageContainer;
  var threadImage;
  var subtitleContainer;
  var author;
  var thread;
  var viewCount;
  var fillerText;
  var currDate = Date.now();

  for (var i = 0; i < response.data.children.length; i++) {
    data = response.data.children[i].data;
    thread  = document.createElement("div");
    thread.className = "threads";
    threadImage = document.createElement("img");
    threadImage.className = "threadImage";
    title = document.createElement("h1");
    title.className = "title";
    imageContainer = document.createElement("div");
    imageContainer.className = "imageContainer";
    subtitleContainer = document.createElement("ul");
    subtitleContainer.className = "subContainer";
    author = document.createElement("li");
    author.className = "author subtitle";
    createDate = document.createElement("li");
    createDate.className = "createDate subtitle";
    viewCount = document.createElement("li");
    viewCount.className = "score subtitle";
    fillerText = document.createElement("div");
    fillerText.className = "fillerText";

    author.innerHTML = "by " + data.author;
    createDate.innerHTML = timeDifference(currDate, data.created * 1000);
    threadImage.src = data.url;
    title.innerHTML = data.title;
    viewCount.innerHTML = " " + data.score + " views";
    fillerText.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ullam porro laudantium quidem, non inventore culpa quibusdam odit tempore, neque laboriosam, possimus! Consequuntur numquam, ipsa, ipsam eveniet voluptas quia! Suscipit!';

    threads.appendChild(thread);
    imageContainer.appendChild(threadImage);
    thread.appendChild(imageContainer);
    thread.appendChild(title);
    subtitleContainer.appendChild(author);
    subtitleContainer.appendChild(createDate);
    subtitleContainer.appendChild(viewCount);
    thread.appendChild(subtitleContainer);
    thread.appendChild(fillerText);
  }

  // footer
  var facebookImage = document.createElement("img");
  facebookImage.src = "/assets/facebook_grey.svg";
  facebookImage.className = "fbImage";
  var instagramImage = document.createElement("img");
  instagramImage.src = "/assets/instagram_grey.svg";
  instagramImage.className = "instImage";
  footer.appendChild(facebookImage);
  footer.appendChild(instagramImage);
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' second(s) ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minute(s) ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hour(s) ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' day(s) ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' month(s) ago';
    }

    else {
      if(Math.round(elapsed/msPerYear) === 1) {
        return '1 year ago';
      }
      else {
        return Math.round(elapsed/msPerYear ) + ' years ago';
      }
    }
}