

// import { API_BASE,API_AUTH} from "../../constants/api";

// export async function login(email,password) {
    

//     const response = await fetch(API_BASE + API_AUTH, {
//         headers: {
//             "Content-Type": "application/json"
//         },
//         method:"POST",
//         body: JSON.stringify({ email, password })
//         });

//         if (response.ok) {
//             const { accessToken, ...profile } = (await response.json()).data;
//             save("token", accessToken);
//             save("profile", profile);
//             return profile;
//         }

//         throw new Error("could not login the account");
// };


// export async function onAuth(event) {
//     event.preventDefault();
//     const email = event.target.email.value;
//     const password = event.target.password.value;

//     if(event.submitter.dataset.auth === "login") {
//         await login(email,password);
//     } 
//     }


import { BASE_URL, API_AUTH } from "../../constants/api";

export async function login(email, password) {
    const response = await fetch(BASE_URL + API_AUTH, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const { accessToken, ...profile } = (await response.json()).data;
        save("token", accessToken);
        save("profile", profile);
        return profile;
    }

    throw new Error("could not login the account");
}

export async function onAuth(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (event.submitter.dataset.auth === "login") {
        try {
            await login(email, password);
            alert("Login successful!");
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    }
}

export function setAuthListener () {
    document.forms.auth.addEventListener("submit, onAuth");
}

setAuthListener();