import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchSearchContent } from './fetchSearchContent';

import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector('#search-form'),
    searchList: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="LoadMore"]'),
    endMessage: document.querySelector('.end-message')
};

let searchVariable = '';
let currentPage = 1; 
let currentHits = 0;

// console.log(refs.serchForm);
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

//var lightbox = $('.gallery a').simpleLightbox({ /* options */ });

//let lightbox = $('.photo-card a',).simpleLightbox({
 // captions: true,
 // captionsData: 'alt',
 // captionDelay: 250,
//});

let lightbox = new SimpleLightbox('.photo-card a', {
captions: true,
captionsData: 'alt',
captionDelay: 250,
});

async function onSearchFormSubmit(e) {
    e.preventDefault();
    searchVariable = e.currentTarget.elements.searchQuery.value.trim();
    

    if (searchVariable === '') {
        return;
    }
    
    const response = await fetchSearchContent(searchVariable, currentPage);
    console.log(response);
    currentHits = response.hits.length;

    if (response.totalHits > 40) {
        refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
        refs.loadMoreBtn.classList.add('is-hidden');
    }

    if (response.totalHits === 0) {
        refs.searchList.innerHTML = '';
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        
        };
    try {            
        if (response.totalHits > 0) {
                
        refs.endMessage.classList.add('is-hidden');
        Notify.success(`Hooray! We found ${response.totalHits} images.`);
        refs.endMessage.classList.add('is-hidden');
        refs.searchList.innerHTML = '';
        renderCard(response);
        lightbox.refresh();
    }
    } catch (error) {
        console.log(error);
    }   
}

async function onLoadMoreBtnClick() {
    currentPage += 1;
    const response = await fetchSearchContent(searchVariable, currentPage);
    renderCard(response);
    lightbox.refresh();
    currentHits += response.hits.length;

    if (currentHits === response.totalHits) {
        refs.loadMoreBtn.classList.add('is-hidden');
        refs.endMessage.classList.remove('is-hidden');
    }
}

function renderCard(response) {
    const markup = response.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
    <div class="photo-card">
        <a href="${largeImageURL}">
        <img height="250"; src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
    <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`
    }).join('');

    refs.searchList.insertAdjacentHTML('beforeend', markup);
    }

