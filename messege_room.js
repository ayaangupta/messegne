//ADD YOUR FIREBASE LINKS HERE
const firebaseConfig = {
      apiKey: "AIzaSyBnel6rumlBwt-s-NOmgOiHl6I614fuSeI",
  authDomain: "messenge-7ae28.firebaseapp.com",
  databaseURL: "https://messenge-7ae28-default-rtdb.firebaseio.com",
  projectId: "messenge-7ae28",
  storageBucket: "messenge-7ae28.appspot.com",
  messagingSenderId: "753424681782",
  appId: "1:753424681782:web:9ef393f919d03845178197"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function add_room() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "messenge_page.html"
}


function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room_name -" + Room_names);
                  row = "<div class='room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "messenge_page.html"
}

function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
window.location = "index.html"
}