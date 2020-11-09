//auth-users
var currentUsername = "";
var currentUserEmailAddress ="";
var currentUserId = "";

//fb-provider
var provider = new firebase.auth.GoogleAuthProvider();   

//fb-references
var panesViews = "Pane/Views/"
var panesRef = firebase.database().ref(panesViews);

//button-listeners
$("#btn-add-pane").click(function() {
    $('#modal-pane').modal('show');
});

$("#btn-submit-pane").click(function() {
    database.ref(panesViews + viewCode).set({
      user_id: 1,
      user_full_name: "fullName",
      user_icon: "profilePicture",
      user_position: "position",
      user_email_address: "emailAddress",
      user_password_password: 'NULL',
      user_status: 0
    });

    RELOAD_PAGE();
});

//card-effects
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);