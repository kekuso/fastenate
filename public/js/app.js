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
  mainPage.backgroundColor = '#fff';

  //header
  header.setAttribute("id", "header");
  //header.backgroundColor = "#fff";
  mainPage.appendChild(header);

  //headerBackground
  headerBackground.setAttribute("id", "headerBackground");
  headerBackground.src = "/assets/header_bg.svg";
  header.appendChild(headerBackground);
  //logo
  logo.setAttribute("id", "logo");
  logo.src = "/assets/logo.svg";
  header.appendChild(logo);

  //menu
  menu.setAttribute("id", "menu");
  mainPage.appendChild(menu);

  //random
  random.setAttribute("id", "random");
  random.className = "menuItems";
  random.innerHTML = "RANDOM";
  menu.appendChild(random);

  //myBoards
  myBoards.setAttribute("id", "myBoards");
  myBoards.className = "menuItems";
  myBoards.innerHTML = "MY BOARDS";
  menu.appendChild(myBoards);

  //getTheApp
  getTheApp.setAttribute("id", "getTheApp");
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


    threadImage.src = data.url;
    title.innerHTML = data.title;
    imageContainer.appendChild(threadImage);
    threads.appendChild(imageContainer);
    threads.appendChild(title);
  }

  mainPage.appendChild(threads);
  // data = response.data.children[1].data.domain;
}