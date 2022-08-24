import axios from 'axios';

export default async function fetchImages(value, page) {
  const baseUrl = 'https://pixabay.com/api/';
  const key = '29463027-4abcfc2db99f2732a8383a5f8';
  const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  const response = await axios.get(`${baseUrl}${filter}`);
  console.log(response.data);
}
