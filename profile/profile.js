import { accessToken, apiKey, postsUrl, searchUrl, profileName, profileUrl, profilePostsUrl } from "../JS/constants/api.js";
import { PostCard } from "./ui/PostCard.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log('profile.js loaded');


    if (!accessToken) {
        console.error('No access token found.');
        alert('No access token found, please log in.');
        window.location.href = 'index.html'; 
        return;
    }

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`, 
            "X-Noroff-API-Key": apiKey 
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
            const url = query ? `${searchUrl}?q=${encodeURIComponent(query)}` : profilePostsUrl;
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Fetch failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Posts fetched successfully:', data);
            allPosts = data.data;
            displayPosts(allPosts); 

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    async function deletePost(postId) {
        try {
            const response = await fetch(`${postsUrl}/${postId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`, 
                    "X-Noroff-API-Key": apiKey 
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
        postContainer.innerHTML = ''; 

        posts.forEach(post => {
            if (!post.media || !post.media.url) {
                return;
            }

            const authorName = post.author?.name || 'Anonymous';
            const authorEmail = post.author?.email ? post.author.email.split('@')[0] : 'username';
            const authorAvatar = post.author?.avatar?.url || '/images/logo social.png';
            const avatarAlt = post.author?.avatar?.alt || 'User avatar';

            const likesCount = post.reactions && post.reactions.length > 0 ? post.reactions[0].count : 0;
            const commentsCount = post._count && post._count.comments !== undefined ? post._count.comments : 0;

            const postTitle = post.title;
           const postBody = post.body
           const postMediaUrl = post.media.url;
           const postMediaAlt = post.media.alt;

           const postId = post.id;

            const postElement = PostCard(authorName,authorEmail,authorAvatar,avatarAlt, likesCount,commentsCount,postTitle, postBody, postMediaUrl,postMediaAlt,postId)
            
            postContainer.appendChild(postElement);


            // Add event listeners for dropdown buttons
            const dropdownButtons = postElement.querySelectorAll('.dropdown-button');
            dropdownButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const menu = button.nextElementSibling;
                    menu.classList.toggle('hidden');
                });
            });

            console.log(dropdownButtons)

            // Add event listeners for dropdown menu options
            const editButtons = postElement.querySelectorAll('.edit-post');
            const deleteButtons = postElement.querySelectorAll('.delete-post');

            const editModal = document.getElementById("editPostModal")

            editButtons.forEach(button => {
                button.addEventListener('click', () => {
                    editModal.classList.remove('hidden');
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

/**
 * Sorts post based on oldest or newest
 * @param {string} order The order to sort the posts
 */
    
    function sortPosts(order) {
       
        if (order === 'newest') {
            allPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (order === 'oldest') {
            allPosts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
       
        displayPosts(allPosts);
    }

    // Add event listener to the sort dropdown
    const sortSelect = document.getElementById('sortSelectUnique');
    sortSelect.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        sortPosts(selectedValue);
    });

    // Fetch the profile and posts when the page loads
    fetchProfile();
    fetchPosts();
});









