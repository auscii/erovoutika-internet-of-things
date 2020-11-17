//fetch pane views
DASBOARD_VIEWS();

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

$("#btn-add-view").click(function() {
	console.log("btn-add-view");
});

function DASBOARD_VIEWS() {
	if (!currentUserId) {
		window.location.href="../index.html";
	} else {
	 	//set user details
		$("#user-img").attr("src", currentUserProfilePicture);
		$('#user-fullname').html(currentUserFullname);

		//populate pane view(s) depending on the current user logged in
		database.ref(users + currentUserKey).on('child_added', function(data) {
			var id = data.val().pane_view_id;
			if (id) {
				POPULATE_DASHBOARD(id);
			}
		});
	}
}

function POPULATE_DASHBOARD(id) {
	$('#spinner').css({"display":"none"}); 
	$("#pane-views").append('<input type="hidden" value="'+id+'"> <div class="cards flex justify-center m-top-10 cards-container"><div class="card bg-white border shadow rounded p-4 w-1/4" id="cards-sub-container"><button id="btn-add-new-card" class="card-button" data-toggle="modal" data-target="#add-new-modal" onclick="NEW_CARD(this)" value="'+id+'"><i class="fa fa-plus"></i> </button></div></div>');
}

function NEW_CARD(input) {
	var selectedId = input.value;
	$('#modal-add-card').modal('show');
    //$("#modal-big-text").html(selectedId);
}

//pane views effects
$(".hover").mouseleave(
	function () {
		$(this).removeClass("hover");
	}
);

const swappable = new Draggable.Sortable(document.querySelectorAll('.cards'), {
  draggable: '.card'
});