import { accessToken, apiKey, postsUrl, searchUrl, profileName, profileUrl } from "../JS/constants/api.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log('profile.js loaded');


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

    async function fetchProfile() {
        try {
            const response = await fetch(profileUrl, options);
            if (!response.ok) {
                throw new Error(`Fetch failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Profile fetched successfully:', data.data);
            updateProfileCard(data.data);

        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    async function fetchPosts(query = '') {
        try {
            const url = query ? `${searchUrl}?q=${encodeURIComponent(query)}` : postsUrl;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Fetch failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Posts fetched successfully:', data);
            allPosts = data.data;
            displayPosts(allPosts); // Display posts without sorting

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    async function deletePost(postId) {
        try {
            const response = await fetch(`${postsUrl}/${postId}`, {
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
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M6 14h12m2-7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2m16 2h2v10h-2M2 12h2v10H2V12z"/>
                        </svg>
                        <p class="text-gray-700 flex items-center text-sm ml-1">${commentsCount} Comments</p>
                    </div>
                </div>
            `;

            postContainer.appendChild(postElement);

            // Add event listeners for dropdown buttons
            const dropdownButtons = postElement.querySelectorAll('.dropdown-button');
            dropdownButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const menu = button.nextElementSibling;
                    menu.classList.toggle('hidden');
                });
            });

            // Add event listeners for dropdown menu options
            const editButtons = postElement.querySelectorAll('.edit-post');
            const deleteButtons = postElement.querySelectorAll('.delete-post');

            editButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Add your edit logic here
                    console.log('Edit post');
                });
            });

            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const postId = postElement.dataset.id;
                    deletePost(postId);
                });
            });
        });
    }

    function updateProfileCard(profile) {
        const profileCard = document.getElementById('profile-card');
        if (!profileCard) {
            console.error('Profile card element not found.');
            return;
        }

        const profileImage = profile.avatar?.url || '/images/default-avatar.png';
        const profileBanner = profile.banner?.url || '/images/default-banner.png';
        const profileBio = profile.bio || 'No bio available';

        profileCard.innerHTML = `
            <div class="flex flex-col items-center pb-10">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="${profileImage}" alt="Profile picture" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${profile.name}</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">${profileBio}</span>
            </div>
        `;
    }

    function sortPosts(order) {
        console.log('Sorting posts:', order); // Debugging line
        if (order === 'newest') {
            allPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (order === 'oldest') {
            allPosts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
        console.log('Sorted posts:', allPosts); // Debugging line
        displayPosts(allPosts);
    }

    // Add event listener to the sort dropdown
    const sortSelect = document.getElementById('sortSelectUnique');
    sortSelect.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        console.log('Selected sort option:', selectedValue); // Debugging line
        sortPosts(selectedValue);
    });

    // Fetch the profile and posts when the page loads
    fetchProfile();
    fetchPosts();
});









