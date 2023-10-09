$('document').ready(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  function getAmenity (data) {
    return `<article>
    <div class="title_box">
      <h2>${data.name}</h2>
      <div class="price_by_night">$${data.price_by_night}</div>
    </div>
    <div class="information">
      <div class="max_guest">${data.max_guest} Guests</div>
            <div class="number_rooms">${data.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${data.number_bathrooms} Bathrooms</div>
    </div>
    <div class="user">
            <b>Owner:</b>
          </div>
          <div class="description">
      ${data.description}
      </div>
  </article>`;
  }

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    type: 'POST',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $('section.places').append(getAmenity(data[i]));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });

  const amenityList = {};
  const stateList = {};
  const cityList = {};

  $('.state-span input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      stateList[$(this).data('id')] = $(this).data('name');
    } else {
      delete stateList[$(this).data('id')];
    }

    const locationList = Object.values({ ...stateList, ...cityList });
    const locationText = locationList.join(', ');

    if (locationText.length >= 30) {
      $('.locations h4').text(locationText.slice(0, 30) + '...');
    } else {
      $('.locations h4').text(locationText);
    }
  });

  $('.city-li input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      cityList[$(this).data('id')] = $(this).data('name');
    } else {
      delete cityList[$(this).data('id')];
    }
    const locationList = Object.values({ ...stateList, ...cityList });
    const locationText = locationList.join(', ');

    if (locationText.length >= 30) {
      $('.locations h4').text(locationText.slice(0, 30) + '...');
    } else {
      $('.locations h4').text(locationText);
    }
  });

  $('.amenities input[type="checkbox"]').click(function () {
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

  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        amenities: Object.keys(amenityList),
        cities: Object.keys(cityList),
        states: Object.keys(stateList)
      }),
      type: 'POST',
      success: function (data) {
        $('section.places').html('');
        for (let i = 0; i < data.length; i++) {
          $('section.places').append(getAmenity(data[i]));
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
});
