import axios from 'axios';

export async function getDiscount(code) {
    const response = await axios.get("/discount", {
        params: {
            code: code,
        }
    });
    return response;
}
