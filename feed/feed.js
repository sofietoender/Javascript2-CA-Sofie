// const feedUrl = "https://v2.api.noroff.dev/social/posts";
// const accessToken = localStorage.getItem('accessToken');
// const apiKey = 'dae6ccc5-f86c-464a-b15b-c74239c9d85f';

// const options = {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//     "X-Noroff-API-Key": apiKey
//   }
// };

// async function fetchPosts() {
//     try {
//         const response = await fetch(feedUrl, options);
//         const data = await response.json();
//         console.log('Posts:', data);

//         // Code to display posts on the page goes here
//         displayPosts(data.data);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// function displayPosts(posts) {
//     const postContainer = document.getElementById('postContainer');
//     postContainer.innerHTML = '';

//     posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.classList.add('post');
//         postElement.innerHTML = `
//             <h2>${post.title}</h2>
//             <p>${post.body}</p>
//             <img src="${post.media.url}" alt="${post.media.alt}">
//             <p>Tags: ${post.tags.join(', ')}</p>
//         `;
//         postContainer.appendChild(postElement);
//     });
// }

// // Fetch posts when the page loads
// fetchPosts();

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

    async function fetchPosts() {
        console.log('Fetching posts...');
        try {
            const response = await fetch(feedUrl, options);

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid authorization token. Please log in again.');
                } else {
                    throw new Error(`Fetch failed with status: ${response.status}`);
                }
            }

            const data = await response.json();
            console.log('Posts fetched successfully:', data);
            displayPosts(data.data);

        } catch (error) {
            console.error('Error fetching posts:', error);
            alert('Failed to fetch posts. Please try again later.');
        }
    }

    function displayPosts(posts) {
        const postContainer = document.getElementById('postContainer');
        if (!postContainer) {
            console.error('Post container not found.');
            return;
        }
        postContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post', 'p-4', 'border', 'rounded', 'shadow-sm');
            postElement.innerHTML = `
                <h2 class="text-xl font-semibold">${post.title}</h2>
                <p class="mt-2">${post.body}</p>
                <img src="${post.media.url}" alt="${post.media.alt}" class="mt-2 max-w-full h-auto">
                <p class="mt-2 text-sm text-gray-500">Tags: ${post.tags.join(', ')}</p>
            `;
            postContainer.appendChild(postElement);
        });
    }

    // Ensure fetchPosts is only called once
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded and parsed');
        if (window.fetchPostsCalled) {
            console.log('fetchPosts already called, skipping...');
            return;
        }
        window.fetchPostsCalled = true;
        fetchPosts();
    });
}







