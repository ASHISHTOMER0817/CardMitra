import type { Config } from "@netlify/functions";
import axios from 'axios';

export default async () => {
    
    try{

        const response = await axios.post(
            `https://cardmitra.netlify.com/api/orders/unlockExpiredQuantity`
        ); 
    
        // Return a successful response to Netlify
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Unlock expired quantity request sent successfully",
                response: response.data,
            }),
        };

    }catch (error) {
        // Handle any errors that occurred during the axios call
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error in unlocking expired quantity",
                error: error.message,
            }),
        };
    }

}

export const config: Config = {
    schedule: "* * * * *"
}