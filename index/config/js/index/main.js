DASBOARD_VIEWS();
SET_USER_PROFILE();

$("#btn-add-pane").click(function() {
    $('#modal-pane').modal('show');
});

$("#btn-submit-pane").click(function() {
  	database.ref(users + currentUserKey + sub + widgets + viewId).set({
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
  	database.ref(users + currentUserKey + sub + widgets + selectedId).set({
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

$('select[id=widget-type], select[id=widget-edit-type]').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
	if (valueSelected != "Text") {
		alert('Not available');
    	$('#widget-type').val("Text");
    	$('#widget-edit-type').val("Text");
	}
    VIEW_INPUTS("block");
});

$("#btn-submit-delete-widget").click(function() {
	database.ref(users + currentUserKey + sub + widgets + selectedId).remove();
    $("#modal-delete-card").modal("hide");
    $("#modal-success").modal("show");
    $("#modal-success-message").html("Successfully deleted!");

	console.log('CLICKED SUBMIT WIDGET BTN');
	//CHECK_REMOVED_CARD();
});

$("#btn-close-success-pane").click(function() {
    RELOAD_PAGE();
});

function DASBOARD_VIEWS() {
	VIEW_INPUTS("none");
	if (!currentUserId) {
		window.location.href="../index.html";
	} else {
		database.ref(users + currentUserKey + sub + widgets).on('child_added', function(data) {
			var id = data.val().pane_view_id;
			if (id) {
				console.log('FETCH child_added');
				POPULATE_DASHBOARD(data.val().pane_view_id, data.val().pane_view_title, data.val().pane_view_value, data.val().pane_view_units, 1);
			}
		});
		database.ref(users + currentUserKey + sub + widgets).on('child_changed', function(data) {
			var id = data.val().pane_view_id;
			if (id) {
				console.log('FETCH child_changed');
				POPULATE_DASHBOARD(data.val().pane_view_id, data.val().pane_view_title, data.val().pane_view_value, data.val().pane_view_units, 2);
			}
		});
		database.ref(users + currentUserKey + sub + widgets).on('child_removed', function(data) {
			console.log('FETCH child_removed');
		});
		setTimeout(function() {
			CHECK_IF_DATA_EXISTS();
		}, 5000);

	}
}

function CHECK_REMOVED_CARD() {
	console.log('selectedId ->', selectedId);

	listIds.forEach(function(e) {
	    console.log("listIds ->", e);

	    if (selectedId == e) {
	    	$("#pane-views").remove();
	    }
	});
}

function POPULATE_DASHBOARD(id, title, value, units, status) {
	if (title == undefined || value == undefined || units == undefined) {
		title = "";
		value = "";
		units = "";
	}
	isDashboardNoData = true;
	listIds.push(viewId);
	$('#spinner').css({"display":"none"}); 

	// if (status == 2) {
	// 	$("#pane-views #"+id).remove();
	// 	console.log('POPULATE_DASHBOARD REMOVED PREV VIEW');
	// }
	$("#pane-views").append('<div class="cards flex justify-center m-top-10 cards-container"><div class="card bg-white border shadow rounded p-4 w-1/4" id="cards-sub-container"><button title="Add new card widget" id="btn-add-new-card" class="card-button" data-toggle="modal" data-target="#add-new-modal" onclick="NEW_CARD(this)" value="'+id+'"><i class="fa fa-plus-circle"></i></button><button title="Edit card widget" style="margin-left: 60px; margin-top: -80px;" id="btn-edit-card" class="card-button" data-toggle="modal" data-target="#edit-card-modal" onclick="EDIT_CARD(this)" value="'+id+'"><i class="fa fa-edit"></i></button><button title="Delete card widget" id="btn-delete-card" class="card-button" data-toggle="modal" data-target="#modal-delete-card" onclick="DELETE_CARD(this)" value="'+id+'" style="margin-left: 140px; margin-top: -80px;"><i class="fa fa-trash"></i></button><span title="Title" id="display-title-label" style="font-weight: lighter; font-size: 21px;">'+title+'</span><span title="Value" id="display-value-label" style="margin-top: -5px; font-size: 20px; font-weight: bolder;">'+value+'</span><span title="Units" id="display-units-label">'+units+'</span></div></div>');
	console.log('POPULATE_DASHBOARD_TRUE');
}

function NEW_CARD(input) {
	VIEW_INPUTS("none");
	POPULATE_VALUES();
	$('#modal-add-widget').modal('show');
 	selectedId = input.value;
}

function DELETE_CARD(input) {
 	selectedId = input.value;
}

function EDIT_CARD(input) {
	POPULATE_VALUES();
 	selectedId = input.value;
	$('#edit-card-modal').modal('show');
 	$('.modal-edit-widget-header').html('Edit widget card');
	database.ref(users + currentUserKey + sub + widgets).on('child_added', function(data) {
		var viewId = data.val().pane_view_id;
		var type = data.val().pane_view_type;
		var title = data.val().pane_view_title;
		var size = data.val().pane_view_size;
		var value = data.val().pane_view_value;
		var includeSparkline = data.val().pane_view_include_sparkline;
		var animateValueChanges = data.val().pane_view_animate_value_changes;
		var units = data.val().pane_view_units;
		if (selectedId == viewId) {
 			$('#widget-edit-type').val(type);
			$('#widget-edit-title').val(title);
			$('#widget-edit-size').val(size);
			$('#widget-edit-value').val(value);
			$('#widget-edit-include-sparkline').val(includeSparkline);
			$('#widget-edit-animate-value-changes').val(animateValueChanges);
			$('#widget-edit-units').val(units);
		} 
		/*
		else {
			if (!getTitle || getTitle == undefined) {
				alert('No available data');
				//TODO: - Check conflict for dismissing first modal and show next modal
				// $('#edit-card-modal').modal('hide');
				// $('#modal-invalid').modal('show');
				// $('#modal-invalid-message').html('No available data');
			}
		}
		*/

		//$("#pane-views").append('<div class="cards flex justify-center m-top-10 cards-container"><div class="card bg-white border shadow rounded p-4 w-1/4" id="cards-sub-container"><button title="Add new card widget" id="btn-add-new-card" class="card-button" data-toggle="modal" data-target="#add-new-modal" onclick="NEW_CARD(this)" value="'+id+'"><i class="fa fa-plus-circle"></i></button><button title="Edit card widget" style="margin-left: 60px; margin-top: -80px;" id="btn-edit-card" class="card-button" data-toggle="modal" data-target="#edit-card-modal" onclick="EDIT_CARD(this)" value="'+id+'"><i class="fa fa-edit"></i></button><button title="Delete card widget" id="btn-delete-card" class="card-button" data-toggle="modal" data-target="#modal-delete-card" onclick="DELETE_CARD(this)" value="'+id+'" style="margin-left: 140px; margin-top: -80px;"><i class="fa fa-trash"></i></button><span title="Title" id="display-title-label" style="font-weight: lighter; font-size: 21px;">'+title+'</span><span title="Value" id="display-value-label" style="margin-top: -5px; font-size: 20px; font-weight: bolder;">'+value+'</span><span title="Units" id="display-units-label">'+units+'</span></div></div>');
	});

	$("#btn-edit-submit-card").click(function() {
	 	var getType = $('#widget-edit-type').val();
		var getTitle = $('#widget-edit-title').val();
		var getSize = $('#widget-edit-size').val();
		var getValue = $('#widget-edit-value').val();
		var getIncludeSparkline = $('#widget-edit-include-sparkline').val();
		var getAnimateValueChanges = $('#widget-edit-animate-value-changes').val();
		var getUnits = $('#widget-edit-units').val();
		database.ref(users + currentUserKey + sub + widgets + selectedId).update({
	       pane_view_id: selectedId,
	       pane_view_type: getType,
	       pane_view_title: getTitle,
	       pane_view_size: getSize,
	       pane_view_value: getValue,
	       pane_view_include_sparkline: getIncludeSparkline,
	       pane_view_animate_value_changes: getAnimateValueChanges,
	       pane_view_units: getUnits,
	       pane_view_sort_order: 1
		});
		$('#edit-card-modal').modal('hide');
		//RELOAD_PAGE();


	});

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

function CHECK_IF_DATA_EXISTS() {
	var start = setInterval( function() {
		if (isDashboardNoData) {
	  		clearInterval(start);
			return;
		} else {
			$('#spinner').css({"display":"none"}); 
			$('#modal-invalid').modal('show');
			$('#modal-invalid-message').html('No available data');
			isDashboardNoData = true;
		}
	}, 1000);
}

function POPULATE_VALUES() {
	database.ref(users + currentUserKey).on('child_added', function(data) {
		var AC001 = data.val().AC001;
		var AC002 = data.val().AC002;
		var AC003 = data.val().AC003;
		var AC004 = data.val().AC004;
		var AC005 = data.val().AC005;
		var AM001 = data.val().AM001;
		var AM002 = data.val().AM002;
		var AM003 = data.val().AM003;
		var AM004 = data.val().AM004;
		var AM005 = data.val().AM005;
		var DC001 = data.val().DC001;
		var DC002 = data.val().DC002;
		var DC003 = data.val().DC003;
		var DC004 = data.val().DC004;
		var DC005 = data.val().DC005;
		var DM001 = data.val().DM001;
		var DM002 = data.val().DM002;
		var DM003 = data.val().DM003;
		var DM004 = data.val().DM004;
		var DM005 = data.val().DM005;
		if (AC001 != undefined) {
			var json = '{"values":[ {"title":"AC001","value":"'+AC001+'"},{"title":"AC002","value":"'+AC002+'"},{"title":"AC003","value":"'+AC003+'"},{"title":"AC004","value":"'+AC004+'"},{"title":"AC005","value":"'+AC005+'"},{"title":"AM001","value":"'+AM001+'"},{"title":"AM002","value":"'+AM002+'"},{"title":"AM003","value":"'+AM003+'"},{"title":"AM004","value":"'+AM004+'"},{"title":"AM005","value":"'+AM005+'"},{"title":"DC001","value":"'+DC001+'"},{"title":"DC002","value":"'+DC002+'"},{"title":"DC003","value":"'+DC003+'"},{"title":"DC004","value":"'+DC004+'"},{"title":"DC005","value":"'+DC005+'"},{"title":"DM001","value":"'+DM001+'"},{"title":"DM002","value":"'+DM002+'"},{"title":"DM003","value":"'+DM003+'"},{"title":"DM004","value":"'+DM004+'"},{"title":"DM005","value":"'+DM005+'"} ]}';
			$.each(JSON.parse(json).values, function (i, item) {
			    $('#widget-value, #widget-edit-value',).append($('<option>', { 
			        value: item.value,
			        text : item.title 
			    }));
			});
		}
	});
}

$(".hover").mouseleave(
	function () {
		$(this).removeClass("hover");
	}
);

const swappable = new Draggable.Sortable(document.querySelectorAll('.cards'), {
  draggable: '.card'
});