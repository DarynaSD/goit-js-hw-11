// import axios from "axios";

// // const API_KEY = '38678153-9f2a8d4533b12670e8b2dc2f4';
// // const BASE_URL = 'https://pixabay.com/api/';

// // // const searchQuery = document.querySelector('input').value.trim();
// // // q = searchQuery;

// // //Список параметрів рядка запиту
// // let page = 6;

// // const searchQuery = document.querySelector('input').value.trim();
// // q = searchQuery;

// // const params = new URLSearchParams({
// //     key: API_KEY,
// //     q: searchQuery,
// //     image_type: 'photo',
// //     orientation: 'horizontal',
// //     safesearch: true,
// //     page: page,
// //     per_page: 40,
// // })

// // //функція, яка виконує http запит і повертає проміс з масивом картинок
// // function fetchPtotos() {
// //     return axios.get(`${BASE_URL}?${params}`);
// // }

// // export { fetchPtotos }




// export class PixabayAPIClass {
//     #API_KEY = '38678153-9f2a8d4533b12670e8b2dc2f4';
//     #BASE_URL = 'https://pixabay.com/api/';
    
//     baseSearchParams = {
//         key: this.API_KEY,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         per_page: 40,
//     };

//     page = 1;

//     query = null;
    
//     fetchPtotos() {
//     const params = new URLSearchParams({
//     ...this.baseSearchParams,
//     q: this.query,
//     page: this.page,
// })
//     return axios.get(`${this.BASE_URL}?${params}`);
// }
// }