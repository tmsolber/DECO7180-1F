function iterateRecords(data) {
  $.each(data.result.records, function(recordKey, recordValue) {
    var englishWord = recordValue['English'];

    console.log(englishWord);
    if (englishWord) {
      $('#records').append($('<h3>').text(englishWord));
    }
  });
}

function moveIt() {
  // Use math.random() to find a new position for the picture
  picture.style.top = Math.round(Math.random() * spaceW) + 'px';
  picture.style.left = Math.round(Math.random() * spaceH) + 'px';
}

$(document).ready(function() {
  var isPaused = false;
  var time = 0;
  picture = $('#animalImage')[0];
  $('#animalImage').click(function() {
    isPaused = true;

    alert('This image has been clicked');
  });

  spaceW = screen.height - picture.height;
  spaceH = screen.width - picture.width;

  setInterval(function() {
    if (!isPaused) {
      time++;
      moveIt();
    }
  }, 5000);

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
