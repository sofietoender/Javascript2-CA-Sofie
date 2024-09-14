

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('profile.js loaded');

//     const accessToken = localStorage.getItem('accessToken');
//     const apiKey = 'dae6ccc5-f86c-464a-b15b-c74239c9d85f'; // Your API key
//     const feedUrl = "https://v2.api.noroff.dev/social/posts"; // The endpoint for posts
//     const searchUrl = "https://v2.api.noroff.dev/social/posts/search"; // The endpoint for search

//     if (!accessToken) {
//         console.error('No access token found.');
//         alert('No access token found, please log in.');
//         window.location.href = 'index.html'; // Redirect to login if no token is found
//         return;
//     }

//     const options = {
//         headers: {
//             Authorization: `Bearer ${accessToken}`, // Use the access token
//             "X-Noroff-API-Key": apiKey // Include the API key
//         }
//     };

//     let allPosts = [];

//     async function fetchPosts(query = '') {
//         try {
//             const url = query ? `${searchUrl}?q=${encodeURIComponent(query)}` : feedUrl;
//             const response = await fetch(url, options);
//             if (!response.ok) {
//                 throw new Error(`Fetch failed with status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log('Posts fetched successfully:', data);
//             allPosts = data.data;
//             sortAndDisplayPosts(); // Sort and display posts after fetching

//         } catch (error) {
//             console.error('Error fetching posts:', error);
//         }
//     }

//     function sortPosts(posts, sortOption) {
//         return posts.slice().sort((a, b) => {
//             const dateA = new Date(a.created);
//             const dateB = new Date(b.created);

//             if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
//                 // Handle cases where dates are invalid
//                 return 0;
//             }

//             if (sortOption === 'newest') {
//                 return dateB - dateA; // Newer dates come first
//             } else if (sortOption === 'oldest') {
//                 return dateA - dateB; // Older dates come first
//             }
//             return 0; // No sorting if no valid option is provided
//         });
//     }

//     function displayPosts(posts) {
//         const postContainer = document.getElementById('feed');
//         if (!postContainer) {
//             console.error('Post container element not found.');
//             return;
//         }
//         postContainer.innerHTML = ''; // Clear any existing posts

//         posts.forEach(post => {
//             if (!post.media || !post.media.url) {
//                 return;
//             }

//             const authorName = post.author?.name || 'Anonymous';
//             const authorEmail = post.author?.email ? post.author.email.split('@')[0] : 'username';
//             const authorAvatar = post.author?.avatar?.url || '/images/default-avatar.png';
//             const avatarAlt = post.author?.avatar?.alt || 'User avatar';

//             const likesCount = post.reactions && post.reactions.length > 0 ? post.reactions[0].count : 0;
//             const commentsCount = post._count && post._count.comments !== undefined ? post._count.comments : 0;

//             const postElement = document.createElement('div');
//             postElement.classList.add('w-full', 'max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'mb-14'); 

//             postElement.innerHTML = `
//                 <div class="flex justify-between border-b border-gray-200">
//                     <div class="flex items-center p-4">
//                         <img class="w-12 h-12 rounded-full" src="${authorAvatar}" alt="${avatarAlt}" />
//                         <div class="ml-3 text-gray-400 dark:text-white-200">
//                             <p class="font-bold">${authorName}</p>
//                             <p>@${authorEmail}</p>
//                         </div>
//                     </div>
//                     <div class="relative">
//                         <button id="dropdownButton" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
//                             <span class="sr-only">Open dropdown</span>
//                             <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
//                                 <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"></path>
//                             </svg>
//                         </button>
//                         <!-- Dropdown Menu -->
//                         <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
//                             <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownButton">
//                                 <li>
//                                     <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Edit</a>
//                                 </li>
//                                 <li>
//                                     <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Delete</a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="p-4">
//                     <h2 class="text-l font-semibold">${post.title}</h2>
//                     <p class="mt-2 text-xs">${post.body}</p>
//                 </div>
//                 <div>
//                     <img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" class="w-full max-h-64 object-cover" />
//                 </div>
//                 <div class="flex p-2">
//                     <div class="flex m-2">
//                         <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                         </svg>
//                         <p class="text-gray-700 flex items-center text-sm ml-1">${likesCount} Likes</p>
//                     </div>
//                     <div class="flex m-2">
//                         <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6"/>
//                         </svg>
//                         <p class="text-gray-700 flex items-center text-sm ml-1">${commentsCount} Comments</p>
//                     </div>
//                 </div>
//             `;

//             postContainer.appendChild(postElement);

//             // Add event listener for the dropdown button
//             const dropdownButton = postElement.querySelector('#dropdownButton');
//             const dropdownMenu = postElement.querySelector('#dropdownMenu');

//             dropdownButton.addEventListener('click', () => {
//                 dropdownMenu.classList.toggle('hidden');
//             });
//         });
//     }

//     function sortAndDisplayPosts() {
//         const sortOption = document.getElementById('sortSelectUnique').value;
//         const sortedPosts = sortPosts(allPosts, sortOption);
//         displayPosts(sortedPosts);
//     }

//     // Fetch initial posts
//     fetchPosts();

//     // Handle search form submission
//     const searchForm = document.getElementById('searchFormUnique');
//     searchForm.addEventListener('submit', (event) => {
//         event.preventDefault(); // Prevent the default form submission

//         const searchInput = document.getElementById('topbar-search-unique');
//         const query = searchInput.value.trim();

//         fetchPosts(query); // Fetch posts with the search query
//     });

//     // Handle sorting change
//     const sortSelect = document.getElementById('sortSelectUnique');
//     sortSelect.addEventListener('change', () => {
//         sortAndDisplayPosts(); // Sort and display posts based on selected option
//     });

// });


// document.addEventListener('DOMContentLoaded', () => {
//     console.log('profile.js loaded');

//     const accessToken = localStorage.getItem('accessToken');
//     const apiKey = 'dae6ccc5-f86c-464a-b15b-c74239c9d85f'; // Your API key
//     const feedUrl = "https://v2.api.noroff.dev/social/posts"; // The endpoint for posts
//     const searchUrl = "https://v2.api.noroff.dev/social/posts/search"; // The endpoint for search
//     const deleteUrl = "https://v2.api.noroff.dev/social/posts"; // Base URL for delete requests

//     if (!accessToken) {
//         console.error('No access token found.');
//         alert('No access token found, please log in.');
//         window.location.href = 'index.html'; // Redirect to login if no token is found
//         return;
//     }

//     const options = {
//         headers: {
//             Authorization: `Bearer ${accessToken}`, // Use the access token
//             "X-Noroff-API-Key": apiKey // Include the API key
//         }
//     };

//     let allPosts = [];

//     async function fetchPosts(query = '') {
//         try {
//             const url = query ? `${searchUrl}?q=${encodeURIComponent(query)}` : feedUrl;
//             const response = await fetch(url, options);
//             if (!response.ok) {
//                 throw new Error(`Fetch failed with status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log('Posts fetched successfully:', data);
//             allPosts = data.data;
//             sortAndDisplayPosts(); // Sort and display posts after fetching

//         } catch (error) {
//             console.error('Error fetching posts:', error);
//         }
//     }

//     async function deletePost(postId) {
//         try {
//             const response = await fetch(`${deleteUrl}/${postId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`, // Use the access token
//                     "X-Noroff-API-Key": apiKey // Include the API key
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error(`Delete failed with status: ${response.status}`);
//             }

//             console.log(`Post with ID ${postId} deleted successfully.`);
//             // Re-fetch posts after deletion
//             fetchPosts();

//         } catch (error) {
//             console.error('Error deleting post:', error);
//         }
//     }

//     function sortPosts(posts, sortOption) {
//         return posts.slice().sort((a, b) => {
//             const dateA = new Date(a.created);
//             const dateB = new Date(b.created);

//             if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
//                 // Handle cases where dates are invalid
//                 return 0;
//             }

//             if (sortOption === 'newest') {
//                 return dateB - dateA; // Newer dates come first
//             } else if (sortOption === 'oldest') {
//                 return dateA - dateB; // Older dates come first
//             }
//             return 0; // No sorting if no valid option is provided
//         });
//     }

//     function displayPosts(posts) {
//         const postContainer = document.getElementById('feed');
//         if (!postContainer) {
//             console.error('Post container element not found.');
//             return;
//         }
//         postContainer.innerHTML = ''; // Clear any existing posts

//         posts.forEach(post => {
//             if (!post.media || !post.media.url) {
//                 return;
//             }

//             const authorName = post.author?.name || 'Anonymous';
//             const authorEmail = post.author?.email ? post.author.email.split('@')[0] : 'username';
//             const authorAvatar = post.author?.avatar?.url || '/images/default-avatar.png';
//             const avatarAlt = post.author?.avatar?.alt || 'User avatar';

//             const likesCount = post.reactions && post.reactions.length > 0 ? post.reactions[0].count : 0;
//             const commentsCount = post._count && post._count.comments !== undefined ? post._count.comments : 0;

//             const postElement = document.createElement('div');
//             postElement.classList.add('w-full', 'max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'mb-14');
//             postElement.dataset.id = post.id; // Add the post ID to the element

//             postElement.innerHTML = `
//                 <div class="flex justify-between border-b border-gray-200">
//                     <div class="flex items-center p-4">
//                         <img class="w-12 h-12 rounded-full" src="${authorAvatar}" alt="${avatarAlt}" />
//                         <div class="ml-3 text-gray-400 dark:text-gray-200">
//                             <p class="font-bold">${authorName}</p>
//                             <p>@${authorEmail}</p>
//                         </div>
//                     </div>
//                     <div class="relative">
//                         <button
//                             class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2 dropdown-button"
//                         >
//                             <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
//                                 <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"></path>
//                             </svg>
//                         </button>
//                         <!-- Dropdown Menu -->
//                         <div
//                             class="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 dropdown-menu"
//                         >
//                             <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
//                                 <li>
//                                     <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white edit-post">Edit</a>
//                                 </li>
//                                 <li>
//                                     <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white delete-post">Delete</a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="p-4">
//                     <h2 class="text-l font-semibold">${post.title}</h2>
//                     <p class="mt-2 text-xs">${post.body}</p>
//                 </div>
//                 <div>
//                     <img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" class="w-full max-h-64 object-cover" />
//                 </div>
//                 <div class="flex p-2">
//                     <div class="flex m-2">
//                         <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                         </svg>
//                         <p class="text-gray-700 flex items-center text-sm ml-1">${likesCount} Likes</p>
//                     </div>
//                     <div class="flex m-2">
//                         <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6"/>
//                         </svg>
//                         <p class="text-gray-700 flex items-center text-sm ml-1">${commentsCount} Comments</p>
//                     </div>
//                 </div>
//             `;

//             // Append the post to the container
//             postContainer.appendChild(postElement);
//         });

//         // Add event listeners for dropdown buttons
//         document.querySelectorAll('.dropdown-button').forEach(button => {
//             button.addEventListener('click', () => {
//                 const dropdownMenu = button.nextElementSibling;
//                 dropdownMenu.classList.toggle('hidden');
//             });
//         });

//         // Add event listeners for delete buttons
//         document.querySelectorAll('.delete-post').forEach(button => {
//             button.addEventListener('click', (event) => {
//                 event.preventDefault();
//                 const postId = button.closest('[data-id]').dataset.id;
//                 if (confirm('Are you sure you want to delete this post?')) {
//                     deletePost(postId);
//                 }
//             });
//         });
//     }

//     function sortAndDisplayPosts() {
//         const sortSelect = document.getElementById('sortSelect');
//         const sortOption = sortSelect ? sortSelect.value : 'newest';
//         const sortedPosts = sortPosts(allPosts, sortOption);
//         displayPosts(sortedPosts);
//     }

//     // Initial fetch of posts
//     fetchPosts();

//     // Add event listener for search input
//     const searchInput = document.getElementById('searchInput');
//     if (searchInput) {
//         searchInput.addEventListener('input', () => {
//             fetchPosts(searchInput.value);
//         });
//     }

//     // Add event listener for sort select
//     const sortSelect = document.getElementById('sortSelect');
//     if (sortSelect) {
//         sortSelect.addEventListener('change', sortAndDisplayPosts);
//     }
// });



document.addEventListener('DOMContentLoaded', () => {
    console.log('profile.js loaded');

    const accessToken = localStorage.getItem('accessToken');
    const apiKey = 'dae6ccc5-f86c-464a-b15b-c74239c9d85f'; // Your API key
    const feedUrl = "https://v2.api.noroff.dev/social/posts"; // Endpoint for posts
    const searchUrl = "https://v2.api.noroff.dev/social/posts/search"; // Endpoint for search
    const deleteUrl = "https://v2.api.noroff.dev/social/posts"; // Base URL for delete requests

    if (!accessToken) {
        console.error('No access token found.');
        alert('No access token found, please log in.');
        window.location.href = 'index.html'; // Redirect to login if no token is found
        return;
    }

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Use the access token
            "X-Noroff-API-Key": apiKey // Include the API key
        }
    };

    let allPosts = [];

    async function fetchPosts(query = '') {
        try {
            const url = query ? `${searchUrl}?q=${encodeURIComponent(query)}` : feedUrl;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Fetch failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Posts fetched successfully:', data);
            allPosts = data.data;
            sortAndDisplayPosts(); // Sort and display posts after fetching

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    async function deletePost(postId) {
        try {
            const response = await fetch(`${deleteUrl}/${postId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Use the access token
                    "X-Noroff-API-Key": apiKey // Include the API key
                }
            });
            if (!response.ok) {
                throw new Error(`Delete failed with status: ${response.status}`);
            }

            console.log(`Post with ID ${postId} deleted successfully.`);
            // Re-fetch posts after deletion
            fetchPosts();

        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    function sortPosts(posts, sortOption) {
        return posts.slice().sort((a, b) => {
            const dateA = new Date(a.created);
            const dateB = new Date(b.created);

            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                // Handle cases where dates are invalid
                return 0;
            }

            if (sortOption === 'newest') {
                return dateB - dateA; // Newer dates come first
            } else if (sortOption === 'oldest') {
                return dateA - dateB; // Older dates come first
            }
            return 0; // No sorting if no valid option is provided
        });
    }

    function displayPosts(posts) {
        const postContainer = document.getElementById('feed');
        if (!postContainer) {
            console.error('Post container element not found.');
            return;
        }
        postContainer.innerHTML = ''; // Clear any existing posts

        posts.forEach(post => {
            if (!post.media || !post.media.url) {
                return;
            }

            const authorName = post.author?.name || 'Anonymous';
            const authorEmail = post.author?.email ? post.author.email.split('@')[0] : 'username';
            const authorAvatar = post.author?.avatar?.url || '/images/default-avatar.png';
            const avatarAlt = post.author?.avatar?.alt || 'User avatar';

            const likesCount = post.reactions && post.reactions.length > 0 ? post.reactions[0].count : 0;
            const commentsCount = post._count && post._count.comments !== undefined ? post._count.comments : 0;

            const postElement = document.createElement('div');
            postElement.classList.add('w-full', 'max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'mb-14');
            postElement.dataset.id = post.id; // Add the post ID to the element

            postElement.innerHTML = `
                <div class="flex justify-between border-b border-gray-200">
                    <div class="flex items-center p-4">
                        <img class="w-12 h-12 rounded-full" src="${authorAvatar}" alt="${avatarAlt}" />
                        <div class="ml-3 text-gray-400 dark:text-gray-200">
                            <p class="font-bold">${authorName}</p>
                            <p>@${authorEmail}</p>
                        </div>
                    </div>
                    <div class="relative">
                        <button
                            class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2 dropdown-button"
                        >
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"></path>
                            </svg>
                        </button>
                        <!-- Dropdown Menu -->
                        <div
                            class="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 dropdown-menu"
                        >
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white edit-post">Edit</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white delete-post">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <h2 class="text-l font-semibold">${post.title}</h2>
                    <p class="mt-2 text-xs">${post.body}</p>
                </div>
                <div>
                    <img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" class="w-full max-h-64 object-cover" />
                </div>
                <div class="flex p-2">
                    <div class="flex m-2">
                        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <p class="text-gray-700 flex items-center text-sm ml-1">${likesCount} Likes</p>
                    </div>
                    <div class="flex m-2">
                        <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6"/>
                        </svg>
                        <p class="text-gray-700 flex items-center text-sm ml-1">${commentsCount} Comments</p>
                    </div>
                </div>
            `;

            // Append the post to the container
            postContainer.appendChild(postElement);
        });

        // Add event listeners for dropdown buttons
        document.querySelectorAll('.dropdown-button').forEach(button => {
            button.addEventListener('click', () => {
                const menu = button.nextElementSibling;
                menu.classList.toggle('hidden');
            });
        });

        // Add event listeners for dropdown actions
        document.querySelectorAll('.edit-post').forEach(editLink => {
            editLink.addEventListener('click', (event) => {
                event.preventDefault();
                const postId = event.target.closest('div[data-id]').dataset.id;
                // Implement edit functionality
                alert(`Edit post with ID: ${postId}`);
            });
        });

        document.querySelectorAll('.delete-post').forEach(deleteLink => {
            deleteLink.addEventListener('click', (event) => {
                event.preventDefault();
                const postId = event.target.closest('div[data-id]').dataset.id;
                if (confirm('Are you sure you want to delete this post?')) {
                    deletePost(postId);
                }
            });
        });
    }

    function sortAndDisplayPosts() {
        const sortSelect = document.getElementById('sortSelectUnique');
        if (!sortSelect) {
            console.error('Sort select element not found.');
            return;
        }

        const sortOption = sortSelect.value;
        const sortedPosts = sortPosts(allPosts, sortOption);
        displayPosts(sortedPosts);
    }

    // Fetch posts on initial load
    fetchPosts();

    // Add event listener for sorting
    document.getElementById('sortSelectUnique').addEventListener('change', sortAndDisplayPosts);
});