DASBOARD_VIEWS();

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

$("#btn-submit-card").click(function() {
	$('#pane-views').css({"display":"none"}); 
    $("#modal-add-widget").modal("hide");

	var type = $('#widget-type').val();
	var title = $('#widget-title').val();
	var size = $('#widget-size').val();
	var value = $('#widget-value').val();
	var includeSparkline = $('#widget-include-sparkline').val();
	var animateValueChanges = $('#widget-animate-value-changes').val();
	var units = $('#widget-units').val();

  	database.ref(users + currentUserKey + sub + selectedId).set({
       pane_view_id: selectedId,
       pane_view_type: type,
       pane_view_title: title,
       pane_view_size: size,
       pane_view_value: value,
       pane_view_include_sparkline: includeSparkline,
       pane_view_animate_value_changes: animateValueChanges,
       pane_view_units: units,
       pane_view_sort_order: 1
    });

    DASBOARD_VIEWS();
    RELOAD_PAGE();
});

$('select[id=widget-type]').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
	if (valueSelected == "Text") {
		VIEW_INPUTS("block");
	} else {
		alert("Not available");
	}
});

$("#btn-submit-delete-widget").click(function() {
	database.ref(users + currentUserKey + sub + selectedId).remove();
    $("#modal-delete-card").modal("hide");
    $("#modal-success").modal("show");
    $("#modal-success-message").html("Successfully delete card!");
});

$("#btn-close-success-pane").click(function() {
    RELOAD_PAGE();
});

function DASBOARD_VIEWS() {
	VIEW_INPUTS("none");
	if (!currentUserId) {
		window.location.href="../index.html";
	} else {
		$("#user-img").attr("src", currentUserProfilePicture);
		$('#user-fullname').html(currentUserFullname);
		database.ref(users + currentUserKey).on('child_added', function(data) {
			var id = data.val().pane_view_id;
			if (id) {
				POPULATE_DASHBOARD(id);
			}
		});
	}
}

function POPULATE_DASHBOARD(id) {
	database.ref(users + currentUserKey).on('child_added', function(data) {
		var viewId = data.val().pane_view_id;
		var type = data.val().pane_view_type;
		var title = data.val().pane_view_title;
		var size = data.val().pane_view_size;
		var value = data.val().pane_view_value;
		var includeSparkline = data.val().pane_view_include_sparkline;
		var animateValueChanges = data.val().pane_view_animate_value_changes;
		var units = data.val().pane_view_units;

		if (id == viewId) {
	 		if (title == undefined || value == undefined || units == undefined) {
	 			title = "";
	 			value = "";
	 			units = "";
	 		}
			$('#spinner').css({"display":"none"}); 
			$("#pane-views").append('<div class="cards flex justify-center m-top-10 cards-container"><div class="card bg-white border shadow rounded p-4 w-1/4" id="cards-sub-container"><button id="btn-add-new-card" class="card-button" data-toggle="modal" data-target="#add-new-modal" onclick="NEW_CARD(this)" value="'+id+'"><i class="fa fa-plus"></i></button><button id="btn-delete-card" class="card-button" data-toggle="modal" data-target="#modal-delete-card" onclick="DELETE_CARD(this)" value="'+id+'" style="margin-left: 130px; margin-top: -80px;"><i class="fa fa-trash"></i></button><span id="display-title-label" style="font-weight: lighter; font-size: 21px;">'+title+'</span><span id="display-value-label" style="margin-top: -5px; font-size: 20px; font-weight: bolder;">'+value+'</span><span id="display-units-label" style="margin-top: -27px; margin-left: 40px;">'+units+'</span></div></div>');
		}
	});
}

function NEW_CARD(input) {
	VIEW_INPUTS("none");
	$('#modal-add-widget').modal('show');
 	selectedId = input.value;
}

function DELETE_CARD(input) {
 	selectedId = input.value;
}

function VIEW_INPUTS(value) {
	//TEXT
	$('#widget-title').css({"display":value}); 
	$('#widget-size').css({"display":value}); 
	$('#widget-value').css({"display":value}); 
	$('#widget-include-sparkline').css({"display":value}); 
	$('#widget-animate-value-changes').css({"display":value}); 
	$('#widget-units').css({"display":value}); 
	$('#widget-title-label').css({"display":value}); 
	$('#widget-size-label').css({"display":value}); 
	$('#widget-value-label').css({"display":value}); 
	$('#widget-include-sparkline-label').css({"display":value}); 
	$('#widget-animate-value-changes-label').css({"display":value}); 
	$('#widget-units-label').css({"display":value}); 
}

$(".hover").mouseleave(
	function () {
		$(this).removeClass("hover");
	}
);

const swappable = new Draggable.Sortable(document.querySelectorAll('.cards'), {
  draggable: '.card'
});