import { BASE_URL, API_KEY } from "../../constants/api";



async function getAPIkey() {
        const response = await fetch(BASE_URL + API_KEY,
            
        );
        if(response.ok) {
            return await response.json()
        }
    
        console.error(await response.json())
        throw new Error("Could not register api key");
    };
    
    getAPIkey().then(console.log);
