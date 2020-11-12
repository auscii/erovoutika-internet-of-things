//listeners
$("#btn-add-pane").click(function() {
    $('#modal-pane').modal('show');
});

$("#btn-submit-pane").click(function() {
  	database.ref(users + currentUserKey + sub + viewId).set({
       pane_view_id: viewId,
       pane_view_sort_order: 0
    });
    $("#modal-pane").modal("hide");
});

//fetch pane views
DASBOARD_VIEWS();

function DASBOARD_VIEWS() {
	if (!currentUserId) {
		window.location.href="../index.html";
	} else {
		//for testing
		var panePrimaryTitle = "Binary rejected";
		var panelLabelCaption = "snow on a small feminine target that can deliver, Lorem ipsum dolor.";
		var paneButtonValue = "Learn more";

	 	//set user details
		$("#user-img").attr("src", currentUserProfilePicture);
		$('#user-fullname').html(currentUserFullname);

		//populate pane view(s) depending on the current user logged in
		database.ref(users + currentUserKey).on('child_added', function(data) {
			if (data.val().pane_view_id) {
				$('#spinner').css({"display":"none"});
				$("#pane-views").append('<figure class="snip1336"><figcaption><div class="card-tools" style="margin-left: -15px;"><button type="button" class="btn btn-tool"><i class="fas fa-plus"></i></button></div> <br><h2>'+panePrimaryTitle+'</h2><p>'+panelLabelCaption+'</p><a href="#" class="follow">'+paneButtonValue+'</a></figcaption></figure>');
			}
		});
	}
}

//pane views effects
$(".hover").mouseleave(
	function () {
		$(this).removeClass("hover");
	}
);