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
var panesViews = "Pane/Views/";
var userInformation = "USER INFORMATION/";
var users = "USERS/";
var data = "DATA/";
var widgets = "WIDGETS/";
var sub = "/";
var counter = 0;
var selectedId = "";
var isDashboardNoData = false;

//continous value
var viewId = setInterval(function() {
	counter += 1;
	viewId = viewCode + counter;
}, 1000);

//fb provider
var provider = new firebase.auth.GoogleAuthProvider();

//fb preference
//var usersRef = firebase.database().ref(users);

//local data
var currentUserEmailAddress = localStorage.getItem('user_email_address');
var currentUserId = localStorage.getItem('user_id');
var currentUserKey = localStorage.getItem('user_key');
var currentUserFullname = localStorage.getItem('user_full_name');
var currentUserProfilePicture = localStorage.getItem('user_icon_url');
var currentUserPosition = localStorage.getItem('user_position');
var currentUserStatus = localStorage.getItem('user_status');
var currentUserDateRegistered = localStorage.getItem('user_date_registered');
var currentUserTimeRegistered = localStorage.getItem('user_time_registered');

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

function INSERT_DEFAULT_USER_DATA(key) {
    database.ref(users + key + sub + data).set({
        AC001: 0,
        AC002: 0,
        AC003: 0,
        AC004: 0,
        AC005: 0,
        AM001: 0,
        AM002: 0,
        AM003: 0,
        AM004: 0,
        AM005: 0,
        DC001: 0,
        DC002: 0,
        DC003: 0,
        DC004: 0,
        DC005: 0,
        DM001: 0,
        DM002: 0,
        DM003: 0,
        DM004: 0,
        DM005: 0
    });
}
