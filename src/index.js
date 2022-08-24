import './css/styles.css';
import fetchImages from './fetch-images';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  searchQuery: document.querySelector('input[name="searchQuery"]'),
  closeBtn: document.querySelector('.close-btn'),
};

refs.loadMoreBtn.style.display = 'none';
refs.closeBtn.style.display = 'none';

function renderImageCard(name) {
  const markup = name.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
        <a class="gallery-item" href="${largeImageURL}">
          <img
            class="gallery__image"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
        /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>
      </div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

let perPage = 40;
let page = 0;
let name = refs.searchQuery.value;

// loadBtn.style.display = 'none';
// closeBtn.style.display = 'none';

refs.searchForm.addEventListener('submit', onSubmitSearchForm);

async function onSubmitSearchForm(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';

  page = 1;
  name = refs.searchQuery.value;

  fetchImages(name, page, perPage)
    .then(name => {
      let totalPages = name.totalHits / perPage;

      if (name.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
        renderImageCard(name);
        new SimpleLightbox('.gallery a');
        // refs.closeBtn.style.display = 'block';
        // refs.closeBtn.addEventListener('click', () => {
        //   refs.gallery.innerHTML = '';
        //   refs.closeBtn.style.display = 'none';
        // });

        if (page < totalPages) {
          refs.loadMoreBtn.style.display = 'block';
        } else {
          refs.loadMoreBtn.style.display = 'none';
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.gallery.innerHTML = '';
      }
    })
    .catch(error => console.log(error));
}

refs.loadMoreBtn.addEventListener(
  'click',
  () => {
    name = refs.searchQuery.value;
    page += 1;
    fetchImages(name, page, perPage).then(name => {
      let totalPages = name.totalHits / perPage;
      renderImageCard(name);
      new SimpleLightbox('.gallery a');
      if (page >= totalPages) {
        refs.loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    });
  },
  true
);
