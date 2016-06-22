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

var bullet = '&#8226';
function display(response) {
  // console.log("Sanity Check");

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
  menu.appendChild(random);

  //myBoards
  myBoards.setAttribute("class", "myBoards");
  myBoards.className = "menuItems";
  myBoards.innerHTML = "MY BOARDS " + bullet + " ";
  menu.appendChild(myBoards);

  //getTheApp
  getTheApp.setAttribute("class", "getTheApp");
  getTheApp.className = "menuItems";
  getTheApp.innerHTML = "GET THE APP";
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

    author.innerHTML = "by " + data.author + " " + bullet;
    createDate.innerHTML = " created: " + getDate(data.created) + " " + bullet;
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

function getDate(timestamp) {
  var date = new Date(timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var time;

  if(min < 10) {
    min = '0' + min.toString();
  }
  if(hour > 12) {
    if(hour < 13) {
      hour = 12;
    }
    else {
      hour = hour - 12;
    }
    time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + 'PM (HST)';
  }
  else {
    time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + 'AM (HST)';
  }
  return time;
}