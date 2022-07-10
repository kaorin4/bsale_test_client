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

const filterProductsByCategory = (e) => {

  e.preventDefault();

  const selectFilter = document.querySelector('#categories-filter');
  const selectedCategory = selectFilter.options[selectFilter.selectedIndex].value;

  const url = selectedCategory ? `http://localhost:5000/api/products/category/${selectedCategory}` : `http://localhost:5000/api/products`;

  document.querySelector('#search-input').value = "";
  getProductsData(url);
}

const searchProducts = (e) => {

  e.preventDefault();

  const searchInputValue = document.querySelector('#search-input').value.trim();
  if(searchInputValue == ""){
    filterProductsByCategory(e);
    return;
  }

  const url = `http://localhost:5000/api/products/search?name=${searchInputValue}`;
  document.querySelector('#categories-filter').value = "";
  getProductsData(url);
}

const addListeners = () => {

  // select
  const selectFilter = document.querySelector('#categories-filter');
  selectFilter.addEventListener('change', filterProductsByCategory);

  // search
  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', searchProducts);
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

