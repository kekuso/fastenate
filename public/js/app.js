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
  console.log("Sanity Check");
  var mainPage = document.getElementById("mainPage");
  var data;
  var header;

  data = response.data.children[1].data.domain;
  header = document.createElement("h2");
  header.innerHTML = data;
  mainPage.appendChild(header);
}