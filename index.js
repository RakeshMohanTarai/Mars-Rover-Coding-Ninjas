// The following code is wrapped in a jQuery document-ready function, which ensures that the code runs after the DOM has been fully loaded.
$(function() {

  // Bind the datepicker widget to the element with ID "date-picker."
  $("#date-picker").datepicker();

  // Attach a click event handler to the element with ID "submit-btn."
  $("#submit-btn").click(function(e) {
    // Prevent the default form submission behavior when the button is clicked.
    e.preventDefault();

    // Get the selected date from the datepicker input.
    var selectedDate = $("#date-picker").val();

    // Check if a date has been selected. If not, show an alert and return from the function.
    if (selectedDate === '') {
      alert("Please select a date.");
      return;
    }

    // Assign an API key to the variable "apiKey." (Note: This is a dummy API key, and it won't affect the code if you don't provide a valid one.)
    var apiKey = "aBBTk9o2ZPT8cgerPyNau58JCp5VdfScftAtLuAR";

    // Construct the API URL with the selected date and API key for the NASA Mars rover photos API.
    var apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${selectedDate}&api_key=${apiKey}`;

    // Call the displayImages function passing the constructed API URL as a parameter.
    displayImages(apiUrl);
  });
});

// Define the displayImages function that takes an API URL as a parameter.
function displayImages(apiUrl) {
  // Clear any existing images in the "image-container" element.
  $("#image-container").empty();

  // Make an AJAX request to the NASA API using the provided API URL.
  $.ajax({
    url: apiUrl,
    method: 'GET',
    success: function(response) {
      // If the API call is successful and images are returned in the response, process them.
      if (response.photos.length > 0) {
        // Iterate through each photo in the response.
        response.photos.forEach(function(photo) {
          // Get the image source URL from the "img_src" property of the photo object.
          var imageSrc = photo.img_src;

          // Create a new image element with the retrieved source URL.
          var imageElement = $("<img>").attr("src", imageSrc);

          // Append the new image element to the "image-container" element to display the image.
          $("#image-container").append(imageElement);
        });
      } else {
        // If no images are found for the selected date, show an alert.
        alert("No images found for the selected date.");
      }
    },
    error: function() {
      // If an error occurs during the API call, show an alert.
      alert("An error occurred while fetching images.");
    }
  });
}
