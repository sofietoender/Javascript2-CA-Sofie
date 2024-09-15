import { postsUrl,apiKey,accessToken, searchUrl } from "../JS/constants/api.js";
import { PostCard } from "./ui/PostCard.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log('feed.js loaded');

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
            sortAndDisplayPosts();

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    function sortPosts(posts, sortOption) {
        return posts.slice().sort((a, b) => {
            const dateA = new Date(a.created);
            const dateB = new Date(b.created);

            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                
                return 0;
            }

            if (sortOption === 'newest') {
                return dateB - dateA; 
            } else if (sortOption === 'oldest') {
                return dateA - dateB; 
            }
            return 0; 
        });
    }

    function displayPosts(posts) {
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = '';


        posts.forEach(post => {
            if (!post.media || !post.media.url) {
                return;
            }

            const authorName = post.author?.name || 'Anonymous';
            const authorEmail = post.author?.email ? post.author.email.split('@')[0] : 'username';
            const authorAvatar = post.author?.avatar?.url || '/images/default-avatar.png';
            const avatarAlt = post.author?.avatar?.alt || 'User avatar';

           const postTitle = post.title;
           const postBody = post.body
           const postMediaUrl = post.media.url;
           const postMediaAlt = post.media.alt;

            const likesCount = post.reactions && post.reactions.length > 0 ? post.reactions[0].count : 0;
            const commentsCount = post._count && post._count.comments !== undefined ? post._count.comments : 0;

            postContainer.appendChild(PostCard(authorName,authorEmail,authorAvatar,avatarAlt, likesCount,commentsCount,postTitle, postBody, postMediaUrl,postMediaAlt));
        });
    }

    function sortAndDisplayPosts() {
        const sortOption = document.getElementById('sortSelect').value;
        const sortedPosts = sortPosts(allPosts, sortOption);
        displayPosts(sortedPosts);
    }

    // Fetch initial posts
    fetchPosts();

    // Handle search form submission
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 

        const searchInput = document.getElementById('topbar-search');
        const query = searchInput.value.trim();

        fetchPosts(query); 
    });

    // Handle sorting change
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', () => {
        sortAndDisplayPosts(); 
    });

    // Modal handling
    const createPostBtn = document.getElementById('createPostBtn');
    const createPostModal = document.getElementById('createPostModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const createPostForm = document.getElementById('createPostForm');

    // Show modal
    createPostBtn.addEventListener('click', () => {
        createPostModal.classList.remove('hidden');
    });

    // Close modal and reset form
    closeModalBtn.addEventListener('click', () => {
        createPostModal.classList.add('hidden');
        createPostForm.reset();
    });

    // Handle form submission
    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('postTitle').value;
        const body = document.getElementById('postBody').value;
        const tags = document.getElementById('postTags').value.split(',').map(tag => tag.trim());
        const mediaUrl = document.getElementById('postImageUrl').value;
        const mediaAlt = document.getElementById('postImageAlt').value;

        try {
            const response = await fetch(postsUrl, {
                method: 'POST',
                headers: {
                    ...options.headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    body,
                    tags,
                    media: {
                        url: mediaUrl,
                        alt: mediaAlt
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to create post: ${response.status}`);
            }

            console.log('Post created successfully');
            fetchPosts(); 
            createPostModal.classList.add('hidden'); 
            createPostForm.reset(); 

        } catch (error) {
            console.error('Error creating post:', error);
        }
    });
});





