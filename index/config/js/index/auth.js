var usersRef = firebase.database().ref("Users/");

$("#btn-login-submit").click(function() {
	var userLoginEmailAddress = $("#user-email-address").val();
	var userLoginPassword = $("#user-password").val();

	$('#modal-progress').modal('show');
	$('#loading-message').html('Getting user details...');

	firebase.auth().signInWithEmailAndPassword(userLoginEmailAddress, 
											   userLoginPassword).then(function(firebaseUser) {
		firebase.auth().onAuthStateChanged((user) => {
			if (user != null) {
		      var user = firebase.auth().currentUser;
		      usersRef.orderByChild("user_email_address")
		              .equalTo(userLoginEmailAddress)
		              .on("child_added",
		      function(data) {
		         var userId = data.val().user_id;
		         var userFullName = data.val().user_full_name;
		         var userIconUrl = data.val().user_icon_url;
		         var userPosition = data.val().user_position;
		         var userEmailAddress = data.val().user_email_address;
		         var p = data.val().user_password;
		         var userStatus = data.val().user_status;

		         localStorage.setItem('user_id', userId);
		         localStorage.setItem('user_full_name', userFullName);
		         localStorage.setItem('user_icon_url', userIconUrl);
		         localStorage.setItem('user_position', userPosition);
		         localStorage.setItem('user_email_address', userEmailAddress);
		         localStorage.setItem('p', p);
             localStorage.setItem('user_status', userStatus);
             localStorage.setItem('user_date_registered', fullDate);
		         localStorage.setItem('user_time_registered', time);

		         database.ref('Users/Log/' + userLogCode).set({
					    user_id: userId,
			      	user_full_name: userFullName,
			      	user_icon_url: userIconUrl,
			      	user_position: userPosition,
			      	user_email_address: userEmailAddress,
			      	user_password: p,
			      	user_status: 0,
			      	user_date_logged_in_date: fullDate,
			      	user_date_logged_in_time: time
		         });

	             window.location.href='main.html';
		      });
		    } else {
		  		$('#modal-progress').modal('hide');
		  		$('#modal-login-error').modal('show');
		  		$('#error-message').html('User Not Found!');
		  }
		});
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
  		$('#modal-progress').modal('hide');
  		$('#modal-login-error').modal('show');
  		$('#error-message').html("Error: " + errorMessage);
    });
});

$("#btn-login-google").click(function() {
	//LOGIN_GOOGLE_ACCOUNT();
	$('#modal-not-available').modal('show');
});

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
  window.location.href="index.html";
}