import axios, { Axios } from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_ID = '33885514-439aafd248d6bcbc591d483b7';

export async function fetchSearchContent(searchVariable, page) {
   return await axios.get(`${BASE_URL}?key=${KEY_ID}&q=${searchVariable}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
        .then(response => response.data);   
}

//export async function fetchSearchContent (name) {
//    const response = await fetch(`${BASE_URL}?key=${KEY_ID}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`);
 //   const cards = await response.json();
 //   return cards;
//};