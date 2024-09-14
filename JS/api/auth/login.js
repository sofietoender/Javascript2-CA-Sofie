// // Define the API URL
// const url = "https://v2.api.noroff.dev/auth/login";

// // Get the form element
// const form = document.getElementById('loginForm');

// // Add an event listener to the form
// form.addEventListener('submit', async (event) => {
//     event.preventDefault(); // Prevent the default form submission

//     // Get the form values
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('pass').value;

//     // Define the body payload with the form values
//     const data = {
//         email: email,
//         password: password
//     };

//     try {
//         // Make the POST request
//         const response = await fetch(url, {
//             method: 'POST', // Specify the request method
//             headers: {
//                 'Content-Type': 'application/json', // Ensure the server knows we're sending JSON
//             },
//             body: JSON.stringify(data) // Convert the data object to a JSON string
//         });

//         // Check if the response is OK (status code 200-299)
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
            
//         }

//         // Parse the JSON response body
//         const responseData = await response.json();
//         console.log('Success:', responseData); // Log the response data

//         // Optionally, handle successful login (e.g., redirect or show a message)

//     } catch (error) {
//         console.error('Error:', error); // Log any errors that occur
//     }
// });



// const url = "https://v2.api.noroff.dev/auth/login";
// const form = document.getElementById('loginForm');

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('pass').value;

//     const data = {
//         email: email,
//         password: password
//     };

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const responseData = await response.json();
//         console.log('Success:', responseData);

//         // Store the token in local storage or session storage
//         localStorage.setItem('accessToken', responseData.accessToken);

//         // Redirect to feed.html
//         window.location.href = './feed/index.html';

//     } catch (error) {
//         console.error('Error:', error);
//     }
// });


// const url = "https://v2.api.noroff.dev/auth/login";
// const form = document.getElementById('loginForm');

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('pass').value;

//     const data = { email, password };

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         const responseData = await response.json();
//         const accessToken = responseData.accessToken;

//         if (accessToken) {
//             localStorage.setItem('accessToken', accessToken);
//             console.log('Access token saved:', accessToken);

//             // Redirect to the feed page after successful login
//             window.location.href = 'feed/index.html';
//         } else {
//             console.error('Access token is missing in the response.');
//         }

//     } catch (error) {
//         console.error('Error:', error);
//     }
// });



// const url = "https://v2.api.noroff.dev/auth/login";
// const form = document.getElementById('loginForm');

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('pass').value;

//     const data = { email, password };

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         const responseData = await response.json();
//         console.log('Login Response Data:', responseData);

//         // Extract the accessToken from responseData.data
//         const accessToken = responseData.data.accessToken; 

//         if (accessToken) {
//             localStorage.setItem('accessToken', accessToken); // Save the token to localStorage
//             console.log('Access token saved:', accessToken);

//             // Redirect to the feed page
//             window.location.href = 'feed/index.html';
//         } else {
//             console.error('Access token is missing in the response.');
//         }

//     } catch (error) {
//         console.error('Error:', error);
//     }
// });



const url = "https://v2.api.noroff.dev/auth/login";
const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    const data = { email, password };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const responseData = await response.json();
        console.log('Login Response Data:', responseData);

        // Extract the accessToken and name from responseData.data
        const accessToken = responseData.data.accessToken;
        const name = responseData.data.name;

        if (accessToken && name) {
            // Save the token and name to localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('username', name); // Save the user's name
            console.log('Access token and username saved:', accessToken, name);

            // Redirect to the feed page
            window.location.href = 'feed/index.html';
        } else {
            console.error('Access token or name is missing in the response.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
});

