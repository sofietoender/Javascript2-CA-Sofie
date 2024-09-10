import { API_KEY, BASE_URL } from "./constants/api.js";
import { registerHandler } from "./events/auth/registerHandler.js";

function router() {
    const pathName = window.location.pathname;

    console.log(pathName);
    
    switch (pathName) {
        case "/":
        case "/index.html":
            console.log("Home");
            break;
    
        case "/register/":
        case "/register/index.html":
            registerHandler();
            break;
    
    }
}

router();


// async function getAPIkey() {
//     const response = await fetch(BASE_URL + API_KEY);
//     if(response.ok) {
//         return await response.json()
//     }

//     console.error(await response.json())
//     throw new Error("Could not register api key");
// }

// getAPIkey().then(console.log);