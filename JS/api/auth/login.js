import { API_AUTH_URL } from '../../constants/api.js'
const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    const data = { email, password };

    try {
        const response = await fetch(API_AUTH_URL, {
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

