//listeners
$("#btn-login-submit").click(function() {
	 AUTH_USER_ACCOUNT();
});

$("#btn-login-google").click(function() {
	//LOGIN_GOOGLE_ACCOUNT();
	$('#modal-not-available').modal('show');
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
	/*
    firebase.auth().onAuthStateChanged((user) => {
      var user = firebase.auth().currentUser;
      var userId = user.uid;
      var emailAddress = user.email;
      var fullName = user.displayName;
      var profilePicture = user.photoURL;
      var position = "PO";
      var registeredDate = new Date().toLocaleDateString();
      var registeredTime = new Date().toLocaleTimeString();
      var actionStatus_a = 'ADD';
      var actionType = 'New User - ' + fullName;

      firebase.auth().sendPasswordResetEmail(emailAddress);

      $('#btn_complete_google_sign_in').click(function()
      {
          var userAddress = $('#compgoosign_address').val();
          var userBdate = $('#compgoosign_bdate').val();

          database.ref('Users/' + userId).set(
          {
              userid: userId,
              emailad: emailAddress,
              name: fullName,
              profilepicture: profilePicture,
              position: position,
              password: 'NULL',
              dateregistered: registeredDate,
              timeregistered: registeredTime,
              address: userAddress,
              birthdate: userBdate,
              approvalstatus: 'NULL'
          });
      });

    }); 
	*/
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

  if (userLoginEmailAddress == "") {
      $('#modal-progress').modal('hide');
      $('#modal-login-error').modal('show');
      $('#error-message').html("User not found!");
      console.log("userLoginEmailAddress is empty");
      return;
  }

  firebase.auth().signInWithEmailAndPassword(userLoginEmailAddress, userLoginPassword).then(function(firebaseUser) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
          var user = firebase.auth().currentUser;
          usersRef.orderByChild("user_key")
                  .on("child_added",
          function(data) {
             var userId = data.val().user_id;
             var userKey = data.val().user_key;
             var userFullName = data.val().user_full_name;
             var userIconUrl = data.val().user_icon_url;
             var userPosition = data.val().user_position;
             var userEmailAddress = data.val().user_email_address;
             var p = data.val().user_password;
             var userStatus = data.val().user_status;

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

             window.location.href='index/main.html';
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
      console.log("-> Password Mismatched!");
  } else if (!registerEmailAddress || !registerPassword || !registerFullname || 
             !registerAddress || !registerContactNumber || !registerOccupation) {
      console.log("-> registration fill up fields!");
      $('#modal-register').modal('show');
      $('#modal-register-message').html('Please fill-up all input fields!');
  } else {
      firebase.auth().createUserWithEmailAndPassword(registerEmailAddress, registerPassword).then(function(user) {
          database.ref('Users/' + registerUserKey).set({
              user_key: registerUserKey,
              user_id: userCode,
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
          $('#modal-register').modal('show');
          $('#modal-register-message').html('Successfully register new account!');
          $('#modal-register-btn').html('OK');
          $('#modal-register-btn').css({"background-color":"#34eb7a"});
          $("#modal-register-btn").click(function() {
            window.location.href="../index.html";
          });
          console.log("-> registration success!");
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