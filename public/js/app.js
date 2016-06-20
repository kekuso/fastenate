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

  //threads
  threads.className = "threadContainer";
  var title;
  var imageContainer;
  var threadImage;
  var author;
  var thread;
  for (var i = 0; i < response.data.children.length; i++) {
    data = response.data.children[i].data;
    thread  = document.createElement("div");
    thread.className = "threads";
    threadImage = document.createElement("img");
    title = document.createElement("h1");
    imageContainer = document.createElement("div");
    author = document.createElement("h3");
    createDate = document.createElement("div");

    author.innerHTML = "author: " + data.author;
    createDate.innerHTML = "created: " + getDate(data.created);
    threadImage.src = data.url;
    title.innerHTML = data.title;

    threads.appendChild(thread);
    imageContainer.appendChild(threadImage);
    //thread.appendChild(imageContainer);
    thread.appendChild(title);
    thread.appendChild(author);
    thread.appendChild(createDate);
  }

  mainPage.appendChild(threads);
  // data = response.data.children[1].data.domain;
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