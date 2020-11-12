//date and time
var date = new Date();
var time = date.getHours() + date.getMinutes() + date.getSeconds();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); 
var yyyy = date.getFullYear();
var fullDate = mm+dd+yyyy;
var currentDate = yyyy + '-' + mm + '-' + dd;
var currentTime = Date().slice(16,25);
var fullCurrentDateTime = currentDate + ' ' + currentTime;

//custom key
var viewCode = "VW" + KEY_CODE(3) + fullDate + time;

//constant
var freeUserImage = "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
var admin = "Admin";
var member = "Regular member";

//fb provider
var provider = new firebase.auth.GoogleAuthProvider();

//fb preference
var panesViews = "Pane/Views/";
var usersRef = firebase.database().ref("Users/");
var panesRef = firebase.database().ref(panesViews);

//local data
var currentUserEmailAddress = localStorage.getItem('user_email_address');
var currentUserId = localStorage.getItem('user_id');
var currentUser_key = localStorage.getItem('user_key');
var currentUserFullname = localStorage.getItem('user_full_name');
var currentUserProfilePicture = localStorage.getItem('user_icon_url');
var currentUserPosition = localStorage.getItem('user_position');
var currentUserStatus = localStorage.getItem('user_status');
var currentUserDateRegistered = localStorage.getItem('user_date_registered');
var currentUserTimeRegistered = localStorage.getItem('user_time_registered');

console.log("currentDate =>", currentDate);
console.log("currentTime =>", currentTime);

//methods
function KEY_CODE(len, charSet) {
    charSet = charSet || 'ABCDFGHIJKLMNOPQRSTUVWXYZ'+'0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function RELOAD_PAGE() {
	location.reload();
}