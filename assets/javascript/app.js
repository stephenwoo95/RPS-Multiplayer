  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA4NaVu5YI_rjxBeeJptYXZOUCs_n2wSyE",
    authDomain: "rps-multiplayer-c2d3b.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-c2d3b.firebaseio.com",
    projectId: "rps-multiplayer-c2d3b",
    storageBucket: "",
    messagingSenderId: "342841719563"
  };
  firebase.initializeApp(config);

//set up database variable
var database = firebase.database();

//set up connections variables
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var users = database.ref("/users");
users.onDisconnect().remove();
var messages = database.ref("/messages");
messages.onDisconnect().remove();
var playerKey;
var numUsers=0;

$(document).ready(function(){
  connectedRef.on("value", function(snap) {
    if (snap.val()) {
      var con = connectionsRef.push(true);
      con.onDisconnect().remove();
    }
  });

  connectionsRef.on("value", function(snap) {
    numUsers=snap.numChildren();
    if(snap.numChildren()<=2)
      $("#nameModal").modal('show');
  });

  users.on("value", function(snap) {
    console.log(snap.val());
    var keyCount = 0;
    for(var key in snap.val()){
      console.log(key);
      keyCount++;
      console.log("keycount: "+ keyCount);
      if(!snap.val()[key].madeChoice){
        var name = snap.val()[key].name;
        if(keyCount===1){
          if(name!='')
            $(".p1name").html(name);
        }
        else if(keyCount===2){
          if(name!='')
            $(".p2name").html(name);
          $("#gameStatus").html("Pick an option");
          startGame();
        }
      }else{
      }
    }
  });
  //message board function FIX THIS
  $(".mytext").keyup(function(event){
    if(event.keyCode===13){
      var message = $("<p>");
      var messageText = $(".mytext").val().trim();
      users.once("value",function(snap) {
        console.log(snap.val());
        message.html(snap.val()[playerKey].name+": "+messageText);
      })
      $("#messages").append(message);
      $(".mytext").html('');
    }
  });
});

function addPlayer(event){
  event.preventDefault();
  var playerName = $(".nameInput").val().trim();
  playerKey = users.push({
        name: playerName,
        wins: 0,
        choice: '',
        madeChoice: false,
        playerNum: numUsers
  }).key;
}

//onclick for choices (must restrict to correct player)
function startGame(){
  console.log("starting game");
  $(".p1option").attr('onclick','selectMove(this)');
  $(".p2option").attr('onclick','selectMove(this)');
}

function selectMove(data) {
  console.log("selecting move");
  users.child(playerKey)
  // if(data.attr('value')==) {
  //   // users[playerKey]
  // }
}

//compare choices and update stats/choicemade



