export function PostCard(authorName,authorEmail,authorAvatar,avatarAlt, likesCount,commentsCount, postTitle, postBody, postMediaUrl,postMediaAlt) {

    const postElement = document.createElement('div');
    postElement.classList.add('w-full', 'max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'mb-14'); 

    postElement.innerHTML = `
        <div class="flex justify-between border-b border-gray-200">
            <div class="flex items-center p-4">
                <img class="w-12 h-12 rounded-full" src="${authorAvatar}" alt="${avatarAlt}" />
                <div class="ml-3 text-gray-400 dark:text-white-200">
                    <p class="font-bold">${authorName}</p>
                    <p>@${authorEmail}</p>
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6"/>
                </svg>
                <p class="text-gray-700 flex items-center text-sm ml-1">${commentsCount} Comments</p>
            </div>
        </div>
    `;

    return postElement
}