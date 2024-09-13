console.log('feed.js loaded');

// Fetch the access token from localStorage
const accessToken = localStorage.getItem('accessToken');
const apiKey = 'dae6ccc5-f86c-464a-b15b-c74239c9d85f'; // Your API key
const feedUrl = "https://v2.api.noroff.dev/social/posts"; // The endpoint for posts

if (!accessToken) {
    console.error('No access token found.');
    alert('No access token found, please log in.');
    window.location.href = 'index.html'; // Redirect to login if no token is found
} else {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Use the access token
            "X-Noroff-API-Key": apiKey // Include the API key
        }
    };

    // Function to fetch the posts
    async function fetchPosts() {
        try {
            const response = await fetch(feedUrl, options);
            if (!response.ok) {
                throw new Error(`Fetch failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Posts fetched successfully:', data);
            displayPosts(data.data); // Call the function to display the posts

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    // Function to display the posts on the page
    function displayPosts(posts) {
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = ''; // Clear any existing posts

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post', 'p-4', 'border', 'rounded', 'shadow-sm');
            
            // Check if media exists and create the appropriate HTML
            const mediaHTML = post.media && post.media.url
                ? `<img src="${post.media.url}" alt="${post.media.alt || 'Image'}" class="mt-2 max-w-full h-auto">`
                : '';

            // Insert post data into the HTML
            postElement.innerHTML = `
                <h2 class="text-xl font-semibold">${post.title}</h2>
                <p class="mt-2">${post.body}</p>
                ${mediaHTML}
                <p class="mt-2 text-sm text-gray-500">Tags: ${post.tags.join(', ')}</p>
            `;
            postContainer.appendChild(postElement); // Append each post to the container
        });
    }

    // Call the function to fetch posts
    fetchPosts();
}









