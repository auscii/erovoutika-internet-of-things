//listeners
$("#btn-login-submit").click(function() {
	 AUTH_USER_ACCOUNT();
});

$("#btn-login-google").click(function() {
  $('#modal-not-available').modal('show');
	//LOGIN_GOOGLE_ACCOUNT();
});

$("#btn-login-register").click(function() {
  window.location.href="index/register.html";
});

$("#btn-register-back").click(function() {
  window.location.href="../index.html";
});

$("#btn-register-submit").click(function() {
  NEW_ACCOUNT();
});

$("#btn-login-reset").click(function() {
  $('#modal-not-available').modal('show');
});

//methods
function LOGIN_GOOGLE_ACCOUNT() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      AUTH_GOOGLE_ACCOUNT();
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(error);
        alert(error);
    });
}

function AUTH_GOOGLE_ACCOUNT() {
    firebase.auth().onAuthStateChanged((user) => {
      var user = firebase.auth().currentUser;
      var googleUserId = user.uid;
      var googleUserEmailAddress = user.email;
      var googleUserFullName = user.displayName;
      var googleUserProfilePicture = user.photoURL;
      firebase.auth().sendPasswordResetEmail(googleUserEmailAddress);
      $('#modal-google-completion-registration').modal('show');
      $('#btn_complete_google_sign_in').click(function() {
          var googleUserAddress = $("#register-address").val().trim();
          var googleUserContactNumber = $("#register-contact-number").val().trim();
          var googleUserOccupation = $("#register-occupation").val().trim();
          var googleUserKey = googleUserEmailAddress.replace(/[^a-zA-Z ]/g,'').trim();
          database.ref(users + googleUserKey + sub + userInformation).set({
              user_key: googleUserKey,
              user_id: googleUserId,
              user_full_name: googleUserFullName,
              user_icon_url: googleUserProfilePicture,
              user_position: member,
              user_email_address: googleUserEmailAddress,
              user_contact_number: googleUserContactNumber,
              user_occupation: googleUserOccupation,
              user_address: googleUserAddress,
              user_password: "NULL",
              user_status: 1,
              user_date_logged_in_date: currentDate,
              user_date_logged_in_time: currentTime
          });
      });
    }); 
}

function USER_LOG_OUT() {
  console.log("user_log_out");
  localStorage.clear();
  firebase.auth().signOut();
  window.location.href="../index.html";
}

function AUTH_USER_ACCOUNT() {
  var userLoginEmailAddress = $("#user-email-address").val();
  var userLoginPassword = $("#user-password").val();
  $('#modal-progress').modal('show');
  $('#loading-message').html('Getting user details...');
  if (!userLoginEmailAddress || !userLoginPassword) {
      $('#modal-progress').modal('hide');
      $('#modal-login-error').modal('show');
      $('#error-message').html("User not found!");
      return;
  }
  firebase.auth().signInWithEmailAndPassword(userLoginEmailAddress, userLoginPassword).then(function(firebaseUser) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
          var user = firebase.auth().currentUser;
          database.ref(users).on('child_added', function(snapshot) {
             firebase.database().ref(users + snapshot.key).orderByChild("user_key").on("child_added", function(data) {
                var userId = data.val().user_id;
                var userKey = data.val().user_key;
                var userFullName = data.val().user_full_name;
                var userIconUrl = data.val().user_icon_url;
                var userPosition = data.val().user_position;
                var userEmailAddress = data.val().user_email_address;
                var p = data.val().user_password;
                var userStatus = data.val().user_status;
                var userAddress = data.val().user_address;
                var userContactNumber = data.val().user_contact_number;
                var userOccupation = data.val().user_occupation;
                if (userLoginEmailAddress == userEmailAddress) {
                   localStorage.setItem('user_id', userId);
                   localStorage.setItem('user_key', userKey);
                   localStorage.setItem('user_full_name', userFullName);
                   localStorage.setItem('user_icon_url', userIconUrl);
                   localStorage.setItem('user_position', userPosition);
                   localStorage.setItem('user_email_address', userEmailAddress);
                   localStorage.setItem('p', p);
                   localStorage.setItem('user_status', userStatus);
                   localStorage.setItem('user_date_registered', fullDate);
                   localStorage.setItem('user_time_registered', time);
                   localStorage.setItem('user_address', userAddress);
                   localStorage.setItem('user_contact_number', userContactNumber);
                   localStorage.setItem('user_occupation', userOccupation);
                   window.location.href='index/main.html';
                }
            });
          });
        } else {
          $('#modal-progress').modal('hide');
          $('#modal-login-error').modal('show');
          $('#error-message').html('User Not Found!');
      }
    });
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        $('#modal-progress').modal('hide');
        $('#modal-login-error').modal('show');
        $('#error-message').html("Error: " + errorMessage);
    });
}

function NEW_ACCOUNT() {
  var registerEmailAddress = $("#register-email-address").val().trim();
  var registerPassword = $("#register-password").val().trim();
  var registerReTypePassword = $("#register-re-password").val().trim();
  var registerFullname = $("#register-fullname").val().trim();
  var registerAddress = $("#register-address").val().trim();
  var registerContactNumber = $("#register-contact-number").val().trim();
  var registerOccupation = $("#register-occupation").val().trim();
  var registerUserKey = registerEmailAddress.replace(/[^a-zA-Z ]/g,'').trim();
  $('#modal-register-btn').html('Close');
  $('#modal-register-btn').css({"background-color":"#eb4034"});
  if (registerPassword != registerReTypePassword) {
      $('#modal-register').modal('show');
      $('#modal-register-message').html('Password Mismatched! Please confirm your Password.');
  } else if (!registerEmailAddress || !registerPassword || !registerFullname || 
             !registerAddress || !registerContactNumber || !registerOccupation) {
      $('#modal-register').modal('show');
      $('#modal-register-message').html('Please fill-up all input fields!');
  } else {
      $('#modal-progress').modal('show');
      $('#loading-message').html('Saving user account...');
      firebase.auth().createUserWithEmailAndPassword(registerEmailAddress, registerPassword).then(function(user) {
          var user = firebase.auth().currentUser;
          database.ref(users + registerUserKey + sub + userInformation).set({
              user_key: registerUserKey,
              user_id: user.uid,
              user_full_name: registerFullname,
              user_icon_url: freeUserImage,
              user_position: member,
              user_email_address: registerEmailAddress,
              user_contact_number: registerContactNumber,
              user_occupation: registerOccupation,
              user_address: registerAddress,
              user_password: registerPassword,
              user_status: 1,
              user_date_logged_in_date: currentDate,
              user_date_logged_in_time: currentTime
          });
          INSERT_DEFAULT_USER_DATA(registerUserKey);
          $('#modal-progress').modal('hide');
          $('#modal-register').modal('show');
          $('#modal-register-message').html('Successfully register new account!');
          $('#modal-register-btn').html('OK');
          $('#modal-register-btn').css({"background-color":"#008a07"});
          $("#modal-register-btn").click(function() {
             window.location.href="../index.html";
          });
      }, function(error) {
          $('#modal-register').modal('show');
          $('#modal-register-message').html(error.code + ": " + error.message);
          $('#modal-register-btn').html('Close');
      });
  }
}

//send form if they hit enter (bugs: when entering no value of user/pass input field, still showing/displaying progress modal)
// document.onkeypress = enter;
// function enter(e) {
//    if (e.which == 13) { 
//       $('#modal-progress').modal('hide');
//       AUTH_USER_ACCOUNT();
//    }
// }