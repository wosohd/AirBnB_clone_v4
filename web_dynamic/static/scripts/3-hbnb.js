$('document').ready(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    type: 'POST',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $('section.places').append(
          `<article>
            <div class="title_box">
              <h2>${data[i].name}</h2>
              <div class="price_by_night">$${data[i].price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${data[i].max_guest} Guests</div>
                    <div class="number_rooms">${data[i].number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${data[i].number_bathrooms} Bathrooms</div>
            </div>
            <div class="user">
                    <b>Owner:</b>
                  </div>
                  <div class="description">
              ${data[i].description}
              </div>
          </article>`
        );
      }
    },
    error: function (error) {
      console.log(error);
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
