//auth users
var currentUserEmailAddress = localStorage.getItem('user_email_address');
var currentUserId = localStorage.getItem('user_id');
var currentUserFullname = localStorage.getItem('user_full_name');
var currentUserProfilePicture = localStorage.getItem('user_icon_url');
var currentUserPosition = localStorage.getItem('user_position');
var currentUserStatus = localStorage.getItem('user_status');
var currentUserDateRegistered = localStorage.getItem('user_date_registered');
var currentUserTimeRegistered = localStorage.getItem('user_time_registered');

//fb provider
var provider = new firebase.auth.GoogleAuthProvider();   

//fb references
var panesViews = "Pane/Views/";
var panesRef = firebase.database().ref(panesViews);

//total preferences
var totalPanes = setInterval(function() {
	panesRef.once("value").then(function(snapshot) {
	    console.log("total snapshot =>", snapshot.numChildren()); 
	    totalPanes = snapshot.numChildren();
	});
}, 1000);

//button listeners
$("#btn-add-pane").click(function() {
    $('#modal-pane').modal('show');
});

$("#btn-submit-pane").click(function() {
	console.log("btn-submit-pane");

    database.ref(panesViews + viewCode + totalPanes).set({
      user_id: 1,
      user_full_name: "fullName",
      user_icon_url: "",
      user_position: "position",
      user_email_address: "emailAddress",
      user_password: "NULL",
      user_status: 0,
      pane_view_id: viewCode + totalPanes,
      pane_view_background_url: "",
      pane_view_primary_title: "Binary rejected",
      pane_view_label_caption: "snow on a small feminine target that can deliver, Lorem ipsum dolor.",
      paneButtonValue: "Learn more",
      pane_view_sort_order: 0
    });

    $("#modal-pane").modal("hide");

    //RELOAD_PAGE();
});

//fetch pane views
DASBOARD_VIEWS();

function DASBOARD_VIEWS() {
	if (!currentUserId) {
		window.location.href="index.html";
	} else {
		panesRef.orderByChild("user_id").on("child_added", function(snapshot) {
			var id = snapshot.val().user_id;
			var fullName = snapshot.val().user_full_name;
			var iconUrl = snapshot.val().user_icon_url;
			var position = snapshot.val().user_position;
			var emailAddress = snapshot.val().user_email_address;
			var password = snapshot.val().user_password;
			var status = snapshot.val().user_status;
			var paneId = snapshot.val().pane_view_id;
			var paneBgUrl = snapshot.val().pane_view_background_url;
			var panePrimaryTitle = snapshot.val().pane_view_primary_title;
			var panelLabelCaption = snapshot.val().pane_view_label_caption;
			var paneButtonValue = snapshot.val().paneButtonValue;
			var paneSortOrder = snapshot.val().pane_view_sort_order;

			if (id) {
				$('#spinner').css({"display":"none"});
				$("#pane-views").append('<figure class="snip1336"><figcaption><div class="card-tools" style="margin-left: -15px;"><button type="button" class="btn btn-tool"><i class="fas fa-plus"></i></button></div> <br><h2>'+panePrimaryTitle+'</h2><p>'+panelLabelCaption+'</p><a href="#" class="follow">'+paneButtonValue+'</a></figcaption></figure>');
			}

			//set user details
			$("#user-img").attr("src", currentUserProfilePicture);
			$('#user-fullname').html(currentUserFullname);

		});
	}
}

//pane views effects
$(".hover").mouseleave(
	function () {
		$(this).removeClass("hover");
	}
);

/* for creating user
database.ref('Users/' + userCode).set({
	user_id: userCode,
	user_full_name: "Juan dela cruz",
	user_icon_url: "https://toppng.com//public/uploads/preview/login-icons-user-flat-icon-115534363917nmr24mjcm.png",
	user_position: "Admin",
	user_email_address: "juan@gmail.com",
	user_password: "juan",
	user_status: 1,
	user_date_logged_in_date: fullDate,
	user_date_logged_in_time: time
});
*/