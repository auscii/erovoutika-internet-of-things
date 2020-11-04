var provider = new firebase.auth.GoogleAuthProvider();   
var USER_ACTIVE = "";

$("#user-active").val("");


$("#login_btn").click(function() {

    $('#progressUserDetailsModal').modal('show');

    var userLoginEmailAddress = $("#ems_login_email_address").val();
    var userLoginPassword = $("#ems_login_password").val();
    var usersRef = firebase.database().ref("Users/");
    var archiveEventUsersRef = firebase.database().ref("Archive/Users/EventUsers/");
    var archiveAdminUsersRef = firebase.database().ref("Archive/Users/Admin/");

    archiveEventUsersRef.once('value', function(snapshot) {
        if (snapshot.exists()) 
        {
          SUSPENDED_USER_ACCOUNT(userLoginEmailAddress, userLoginPassword, usersRef);
        }
        else 
        {
          AUTHENTICATE_USER_DETAILS(userLoginEmailAddress, userLoginPassword, usersRef);
        }
    });
   
});