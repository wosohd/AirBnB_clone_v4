$('document').ready(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  const amenityList = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      amenityList[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityList[$(this).data('id')];
    }
    const amenityNames = Object.values(amenityList);
    const amenitiesText = amenityNames.join(', ');
    if (amenitiesText.length >= 30) {
      $('.amenity_list').text(amenitiesText.slice(0, 30) + '...');
    } else {
      $('.amenity_list').text(amenitiesText);
    }
  });
});
