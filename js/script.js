function iterateRecords(data) {
  $.each(data.result.records, function(recordKey, recordValue) {
    var englishWord = recordValue['English'];

    console.log(englishWord);
    if (englishWord) {
      $('#records').append($('<h3>').text(englishWord));
    }
  });
}

$(document).ready(function() {
  var data = {
    resource_id: '3e39dd7d-e777-4f47-9160-95aaca34bff5'
  };

  $.ajax({
    url: 'http://data.gov.au/api/action/datastore_search',
    data: data,
    dataType: 'jsonp', // We use "jsonp" to ensure AJAX works correctly locally (otherwise XSS).
    cache: true,
    success: function(data) {
      iterateRecords(data);
    }
  });
});
