var date = new Date();
var time = date.getHours() + date.getMinutes() + date.getSeconds();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); 
var yyyy = date.getFullYear();
var fullDate = mm+dd+yyyy;
var fullCurrentDateTime = yyyy + '-' + mm + '-' + dd + ' ' + Date().slice(16,25);
var viewCode = "VW" + KEY_CODE(3) + fullDate + time;
var userCode = "USER" + KEY_CODE(3) + fullDate + time;
var userLogCode = "USERLOG" + KEY_CODE(3) + fullDate + time;

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