//YOUR FIREBASE LINKS
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
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        like: 0,
        message: msg
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
                message_with_tag = "<h4 class='messenge_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value = " + like + " onclick='update_like(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like:" + like + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}

getData();

function update_like(firebase_message_id) {
console.log("clicked on like button -" + message_id );
button_id = message_id;
likes = document.getElementById(button_id).value;
updated_likes = Number(likes)+1
console.log(updated_likes);
firebase.database().ref(room_name).child(message_id).update({
like: updated_likes
});
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html"
}