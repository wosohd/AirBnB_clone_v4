$('document').ready(function () {
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
