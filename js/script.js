function iterateRecords(data) {
  $.each(data.result.records, function(recordKey, recordValue) {
    var englishWord = recordValue['English'];
    var yugaraWord = recordValue['Yugara'];

    if (englishWord && yugaraWord) {
      englishYugara[englishWord] = yugaraWord;
    }
  });
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function moveIt() {
  // Use math.random() to find a new position for the picture
  picture.style.top = Math.round(Math.random() * spaceW) + 'px';
  picture.style.left = Math.round(Math.random() * spaceH) + 'px';
  //console.log(max);
  //console.log(Object.keys(usedAnimalImages).length);
  //if (max == 1) {
  //  for (i = 1; i <= Object.keys(usedAnimalImages).length; i++) {
  //    animalImages[i] = usedAnimalImages[i];
  //    delete usedAnimalImages[i];
  //    max++;
  //  }
  //}
  //console.log(animalImages);
  //console.log(usedAnimalImages);
  ranNum = getRandomIntInclusive(1, 3);
  $('#animalImage').attr('src', animalImages[ranNum]);

  //usedAnimalImages[ranNum] = animalImages[ranNum];
  //delete animalImages[ranNum];
  //max = max - 1;
}

$(document).ready(function() {
  var isPaused = false;
  var time = 0;

  picture = $('#animalImage')[0];
  animalImages = {
    1: '../images/shark.jpg',
    2: '../images/eagle.jpg',
    3: '../images/horse.png'
  };
  englishYugara = {};
  max = Object.keys(animalImages).length;
  //usedAnimalImages = {};

  //This will happen when you click the animal image
  $('#animalImage').click(function() {
    isPaused = true;
    console.log($('#animalImage').attr('src'));
    if ($('#animalImage').attr('src') == '../images/shark.jpg') {
      $('#englishWord').text('Shark');
      $('#yugaraWord').text(englishYugara['Shark']);
    }
    if ($('#animalImage').attr('src') == '../images/eagle.jpg') {
      $('#englishWord').text('Eagle');
      $('#yugaraWord').text(englishYugara['Eagle']);
    }
    if ($('#animalImage').attr('src') == '../images/horse.png') {
      $('#englishWord').text('Horse');
      $('#yugaraWord').text(englishYugara['Horse']);
    }

    $('#popUp')[0].style.display = 'flex';
  });

  $('#gotcha').click(function() {
    $('#popUp')[0].style.display = 'none';
    isPaused = false;
  });

  spaceW = screen.height - picture.height;
  spaceH = screen.width - picture.width;
  // Use this function to make the ictures move over and over again
  setInterval(function() {
    if (!isPaused) {
      $('#animalImage')[0].style.display = 'none';
      time++;
      moveIt();
      $('#animalImage')[0].style.display = 'block';
    }
  }, 3000);

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
      myResults = data.result.records;
    }
  });
  console.log(englishYugara);
});
