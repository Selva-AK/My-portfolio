document.getElementById("contactForm").addEventListener("submit", async function (event) {
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
      const response = await fetch("https://formsubmit.co/selvaak008@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
  
      if (response.ok) {
        alert("Message sent successfully!");
        // Clear the form fields
        this.reset();
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  });
  