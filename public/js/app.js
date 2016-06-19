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

function display(response) {
  // console.log("Sanity Check");

  // Fastenate Structure
  var mainPage = document.getElementById("mainPage");
    var header = document.createElement("div");
      var headerBackground = document.createElement("img");
      var logo = document.createElement("img");
      var plusButton = document.createElement("button");
    var menu = document.createElement("div");
      var random = document.createElement("div");
      var myBoards = document.createElement("div");
      var getTheApp = document.createElement("div");
    var threads = document.createElement("div");

  //mainPage
  //mainPage.backgroundColor = '#fff';

  //header
  header.setAttribute("class", "header");
  //header.backgroundColor = "#fff";
  mainPage.appendChild(header);

  //headerBackground
  // headerBackground.setAttribute("id", "headerBackground");
  // headerBackground.src = "/assets/header_bg.svg";
  //header.appendChild(headerBackground);
  //logo
  // logo.setAttribute("id", "logo");
  // logo.src = "/assets/logo.svg";
  //header.appendChild(logo);

  //menu
  menu.setAttribute("class", "menu");
  mainPage.appendChild(menu);

  //random
  random.setAttribute("class", "random");
  random.className = "menuItems";
  random.innerHTML = "RANDOM";
  menu.appendChild(random);

  //myBoards
  myBoards.setAttribute("class", "myBoards");
  myBoards.className = "menuItems";
  myBoards.innerHTML = "MY BOARDS";
  menu.appendChild(myBoards);

  //getTheApp
  getTheApp.setAttribute("class", "getTheApp");
  getTheApp.className = "menuItems";
  getTheApp.innerHTML = "GET THE APP";
  menu.appendChild(getTheApp);

  //threads
  threads.className = "threads";
  var title;
  var imageContainer;
  var threadImage;
  var author;
  for (var i = 0; i < response.data.children.length; i++) {
    data = response.data.children[i].data;
    threadImage = document.createElement("img");
    title = document.createElement("h1");
    imageContainer = document.createElement("div");
    author = document.createElement("h3");
    createDate = document.createElement("div");

    author.innerHTML = "author: " + data.author;
    createDate.innerHTML = "created: " + getDate(data.created);
    threadImage.src = data.url;
    title.innerHTML = data.title;

    imageContainer.appendChild(threadImage);
    //threads.appendChild(imageContainer);
    threads.appendChild(title);
    threads.appendChild(author);
    threads.appendChild(createDate);
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