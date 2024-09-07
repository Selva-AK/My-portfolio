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
      const response = await fetch("https://formspree.io/f/xqazjgvo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Message sent successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        
        // Clear the form fields
        this.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Something went wrong, message didn't send"
        }); 
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Something went wrong. Please try again later.",
        confirmButtonText: 'Try Again'
      });      
    }
  });
  