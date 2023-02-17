import axios from 'axios';
let token = 'Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo'

let axiosConfig = {
   headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "authorization": `Bearer ${token}`,
   }
};


export async function getAllProducts() {
   const url = 'https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/products';

   let data = await axios.get(url, axiosConfig);
   return data;

}

export async function getFeaturedProducts() {
   const url = 'https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/featured';

   let data = await axios.get(url, axiosConfig);
   return data;

}

export async function getMaterials() {
   const url = 'https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest/material';

   let data = await axios.get(url, axiosConfig);
   return data;

}