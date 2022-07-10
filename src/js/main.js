import displayProductCard from './components/productCard.js';
import addCategoryOptions from './components/categoryFilter.js';
import displayLoading from './components/loader.js';
import displayError from './components/error.js';

const getCategoriesData = async () => {

  return fetch('http://localhost:5000/api/categories')
    .then(res => {
      if(!res.ok){
        throw Error('error');
      }
      return res.json();
    })
    .then(data => {
      addCategoryOptions(data.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const getProductsData = async (url) => {

  displayLoading(true);
  displayError(false);
  document.querySelector('#products-list').innerHTML = '';

  try {

    const response = await fetch(url);

    if(!response.ok){
      throw new Error(response.status);
    }

    const data = await response.json();

    let productsData = data.data;

    productsData.map(product => {
      displayProductCard(product);
    });

    displayLoading(false);
    productsData.length > 0 ? displayError(false) : displayError(true);

  } catch(err) {
    console.log(err); 
    displayLoading(false);
  }
    
}

const filterProducts = (e) => {

  e.preventDefault();

  const categoryFilter = document.querySelector('#categories-filter');
  const selectedCategory = categoryFilter.options[categoryFilter.selectedIndex].value;

  const searchInputValue = document.querySelector('#search-input').value.trim();

  const sortSelect = document.querySelector('#sort-name');
  const sortField = sortSelect.options[sortSelect.selectedIndex].dataset.field;
  const sortOrder = sortSelect.options[sortSelect.selectedIndex].dataset.order;

  let url = `http://localhost:5000/api/products?`
  
  if(selectedCategory){
    url += `category=${selectedCategory}&`;
  }

  if(searchInputValue && searchInputValue.length > 0){
    url += `name=${searchInputValue}&`;
  }

  url += `orderField=${sortField}&orderType=${sortOrder}`;

  getProductsData(url);
}

const addListeners = () => {

  // select
  const selectFilter = document.querySelector('#categories-filter');
  selectFilter.addEventListener('change', filterProducts);

  // search
  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', filterProducts);

  // sort
  const sortSelect = document.querySelector('#sort-name');
  sortSelect.addEventListener('change', filterProducts);
}


const load = async () => {

  // load categories options
  await getCategoriesData();
  // add event listeners
  addListeners();

  let url = "http://localhost:5000/api/products";
  getProductsData(url);

}

load();

