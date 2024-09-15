import { register } from "../../api/auth/register.js";

export function registerHandler() {
    const form = document.querySelector("#registerForm");
    if (form) {
        form.addEventListener("submit",submitForm);
    }
};

async function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);

    if(data.bio.trim() ==="") {
        delete data.bio;

    }

    if(data.avatarUrl.trim() ==="") {
        delete data.avatarUrl;
    }
    else {
        data.avatar = {
            url:data.avatarUrl,
            alt: `${data.name}'s avatar`
            
        };
        delete data.avatarUrl;
    }

    console.log(data);
    try {
       await register(data);
       document.querySelector("#message").innerHTML = `<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">Successfully registered.</div>`
       
    }
    catch(error) {
        console.log(error);
        document.querySelector("#message").innerHTML = `<div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">${error.message}</div>`
    }
}


