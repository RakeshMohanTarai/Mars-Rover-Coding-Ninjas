$(function() {
  $("#date-picker").datepicker(); // datepicker() is used to get the calander 

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
    var apiKey = "aBBTk9o2ZPT8cgerPyNau58JCp5VdfScftAtLuAR";// It doesn't effect the code id you don't give your api key
   
    // Construct the API URL with the selected date and API key for the NASA Mars rover photos API.
    var apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY`;

    // Call the displayImages function passing the constructed API URL as a parameter.
    displayImages(apiUrl);
  });
});

// Define the displayImages function that takes an API URL as a parameter.
function displayImages(apiUrl) {
 // Clear existing images means Without this line, if the user makes multiple requests to display images for different dates, the new images would be appended to the existing images in the "image-container," 
  $("#image-container").empty();

  // Make a request to the NASA API 
  //$.ajax() is part of the jQuery library and uses jQuery-specific syntax
  
  $.ajax({
    url: apiUrl, // The URL to which the GET request is sent. It contains the constructed API URL with the selected date and API key.
    method: 'GET',  // The HTTP method for the request, in this case, 'GET' to retrieve data from the server.
    
    // This is a success callback function that is executed when the AJAX request is successful and a response is received from the server.
    // The 'response' parameter contains the data sent back by the server in response to the API request.
    success: function(response) { 
       // If the API call is successful and images are returned in the response, process them.
      if (response.photos.length > 0) {
      //  The response typically contains data in JSON format, and in this case, it has a property named photos.
      // JSON is used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).
        response.photos.forEach(function(photo) { //: This is the callback function that is executed for each photo in the array.
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
       // This is an error callback function that is executed when the AJAX request encounters an error or fails to receive a response from the server.
    // It is triggered in case of network errors, server-side errors, or other issues that prevent the request from being successful.

    // If an error occurs during the API call, show an alert.
      alert("An error occurred while fetching images.");
    }
  });
}


// We can also use fetch() function for request the NASA API but instead of fetch() it will be better to use the ajax() cause it supports almost all type of browers.

//function displayImages(apiUrl) {
  // Clear any existing images in the "image-container" element.
  //$("#image-container").empty();

  // Make the API request using the fetch() API.
//   fetch(apiUrl)
//     .then(response => {
//       // Check if the response was successful (status code 200-299).
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       // Parse the response as JSON.
//       return response.json();
//     })
//     .then(data => {
//       // Check if there are photos in the response.
//       if (data.photos.length > 0) {
//         // Iterate through each photo in the response.
//         data.photos.forEach(photo => {
//           // Get the image source URL from the "img_src" property of the photo object.
//           var imageSrc = photo.img_src;
//           // Create a new image element with the retrieved source URL.
//           var imageElement = $("<img>").attr("src", imageSrc);
//           // Append the new image element to the "image-container" element to display the image.
//           $("#image-container").append(imageElement);
//         });
//       } else {
//         // If no images are found for the selected date, show an alert.
//         alert("No images found for the selected date.");
//       }
//     })
//     .catch(error => {
//       // If an error occurs during the API call, show an alert.
//       alert("An error occurred while fetching images.");
//     });
// }
