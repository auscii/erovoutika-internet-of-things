//auth users
var currentUsername = "";
var currentUserEmailAddress ="";
var currentUserId = "";

//fb provider
var provider = new firebase.auth.GoogleAuthProvider();   

//fb references
var panesViews = "Pane/Views/"
var panesRef = firebase.database().ref(panesViews);

//button listeners
$("#btn-add-pane").click(function() {
    $('#modal-pane').modal('show');
});

$("#btn-submit-pane").click(function() {
    database.ref(panesViews + viewCode).set({
      user_id: 1,
      user_full_name: "fullName",
      user_icon_url: "",
      user_position: "position",
      user_email_address: "emailAddress",
      user_password: "NULL",
      user_status: 0,
      pane_view_id: viewCode,
      pane_view_background_url: "",
      pane_view_primary_title: "Binary rejected",
      pane_view_label_caption: "snow on a small feminine target that can deliver, Lorem ipsum dolor.",
      paneButtonValue: "Learn more",
      pane_view_sort_order: 0
    });

    RELOAD_PAGE();
});

//fetch pane views
FETCH_PANES();

function FETCH_PANES() {
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

		$("#pane-views").append('<figure class="snip1336" id="pane-views"><figcaption id="pane-views"><h2>'+panePrimaryTitle+'</h2><p>'+panelLabelCaption+'</p><a href="#" class="follow">'+paneButtonValue+'</a></figcaption></figure>');
	});
}

//pane views effects
$(".hover").mouseleave(
	function () {
		$(this).removeClass("hover");
	}
);