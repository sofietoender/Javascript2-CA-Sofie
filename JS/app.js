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
