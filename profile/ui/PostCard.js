export function PostCard(authorName,authorEmail,authorAvatar,avatarAlt, likesCount,commentsCount, postTitle, postBody, postMediaUrl,postMediaAlt,postId) {
    const postElement = document.createElement('div');
            postElement.classList.add('w-full', 'max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'mb-14');
            postElement.dataset.id = postId; // Add the post ID to the element

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
                    <h2 class="text-l font-semibold">${postTitle}</h2>
                    <p class="mt-2 text-xs">${postBody}</p>
                </div>
                <div>
                    <img src="${postMediaUrl}" alt="${postMediaAlt || 'Post image'}" class="w-full max-h-64 object-cover" />
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

            return postElement;

}