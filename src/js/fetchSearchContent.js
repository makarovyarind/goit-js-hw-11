import axios, { Axios } from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_ID = '33885514-439aafd248d6bcbc591d483b7';

export async function fetchSearchContent(searchVariable, page) {
        const response = await axios.get(`${BASE_URL}?key=${KEY_ID}&q=${searchVariable}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
        const cards = await response.data;
        return cards;
}
