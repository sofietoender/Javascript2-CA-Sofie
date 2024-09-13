// Define the API URL
const url = "https://v2.api.noroff.dev/auth/login";

// Get the form element
const form = document.getElementById('loginForm');

// Add an event listener to the form
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    // Define the body payload with the form values
    const data = {
        email: email,
        password: password
    };

    try {
        // Make the POST request
        const response = await fetch(url, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json', // Ensure the server knows we're sending JSON
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            
        }

        // Parse the JSON response body
        const responseData = await response.json();
        console.log('Success:', responseData); // Log the response data

        // Optionally, handle successful login (e.g., redirect or show a message)

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
});

