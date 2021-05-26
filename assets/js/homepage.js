var userFormEl = document.querySelector("#user-form");  //grab form element
var nameInputEl = document.querySelector("#username"); //grab a specified username
var repoContainerEl = document.querySelector("#repos-container"); //grab repo list container div
var repoSearchTerm = document.querySelector("#repo-search-term"); // grab searched term display span
var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos"; //api endpoint url that accepts username input varible
  
  //make a request to the url
  fetch(apiUrl).then(function(response) { //fetch .then parse json object
   //if response was successful
    if(response.ok) {
    response.json().then(function(data) { // .then grab the data parameter
      displayRepos(data, user); //send data to display function
    });
   } else {
     alert("Error: Github User Not Found");
   }
  }).catch(function(error) { //catch error
    alert("Unable to connect to Github");
  });
};

var formSubmitHandler = function(event) {
  event.preventDefault(); //prevent browser default action upon submitting
  // get value from input element
var username = nameInputEl.value.trim(); // username and ensure there is not space at the 
                                         // beginning and ending of string 

if (username) { //if there is a username value
  getUserRepos(username); //input username value into fetch function
  nameInputEl.value = ""; // reset value
} else {
  alert("Please enter a GitHub username"); // error handling
}
  console.log(event);
}

//function to accept both arrays of repo data and the term we searched for as parameters
var displayRepos = function(repos, searchTerm) {
  //Check if api returned any repos
  if(repos.length === 0) {
    repoContainerEl.textContent = "No repositiories found.";
    return;
  }
  //clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  // loop over repos
  for(var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;
    
    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    
    //create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
    
    //append to container
    repoEl.appendChild(titleEl);
    
    //append container to dom
    repoContainerEl.appendChild(repoEl);

    // create a status element
var statusEl = document.createElement("span");
statusEl.classList = "flex-row align-center";

// check if current repo has issues or not
if (repos[i].open_issues_count > 0) {
  statusEl.innerHTML =
    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
} else {
  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
}

// append to container
repoEl.appendChild(statusEl);
  }
  console.log(searchTerm);
  console.log(repos);
};

userFormEl.addEventListener("submit", formSubmitHandler);