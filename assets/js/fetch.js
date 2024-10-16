document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the form data
    const formData = new FormData(this);

    // Convert FormData to an object
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      // Make the API call using fetch
      const response = await fetch("https://formspree.io/f/xqazjgvo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  });

// Function to get user information
async function getUserInfo() {
  // Check if user information has already been collected
  if (sessionStorage.getItem("userInfoCollected")) {
    console.log("User information already collected for this session.");
    return; // Exit the function if already collected
  }
  const userInfo = {
    browserName: navigator.userAgent,
    location: "",
    latitude: null,
    longitude: null,
  };

  // Get geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userInfo.latitude = position.coords.latitude;
        userInfo.longitude = position.coords.longitude;

        // Optionally, you can reverse geocode the coordinates to get the location name using another method or API.
        userInfo.location = `Latitude: ${userInfo.latitude}, Longitude: ${userInfo.longitude}`;

        // Display the user information (or send it to your API)
        console.log("User Information:", userInfo);

        // Example of sending the information to your API
        sendUserInfo(userInfo);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }
}
// Function to send user information to your API
async function sendUserInfo(userInfo) {
  try {
    const response = await fetch("https://formspree.io/f/xqazjgvo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    // Set a flag in session storage to indicate information has been collected
    sessionStorage.setItem("userInfoCollected", "true");
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong. Please try again later.",
    });
  }
}

// Call the function on page load
window.onload = getUserInfo;
