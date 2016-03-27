$(document).ready(function(){

	//remember whether user checked secret sounds preference
	chrome.storage.sync.get(function(prefs) {

		$('#showSecret').attr({checked: prefs.showSecret});

	});

	//store secret sounds preference when checkbox is changed
	$('#showSecret').change(function(){

		var prefs = {
			showSecret : $('#showSecret').is(':checked')
		};

		chrome.storage.sync.set(prefs, function() {
		    console.log('saving prefs:',prefs);
		});
		
	});
	

});