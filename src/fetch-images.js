import axios from 'axios';

export default async function fetchImages(name, page, perPage) {
  const baseUrl = 'https://pixabay.com/api/';
  const apiKey = '29463027-4abcfc2db99f2732a8383a5f8';
  const apiFilter = `?key=${apiKey}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
  try {
    const response = await axios.get(`${baseUrl}${apiFilter}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
