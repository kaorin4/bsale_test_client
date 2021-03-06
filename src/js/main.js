import displayProductCard from './components/productCard.js';
import addCategoryOptions from './components/categoryFilter.js';
import displayLoading from './components/loader.js';
import displayError from './components/error.js';
import displayPagination from './components/pagination.js';

const baseUrl = 'https://bsaletestapikmura.herokuapp.com';

/** fecth list of categories */
const getCategoriesData = async () => {

  return fetch(`${baseUrl}/api/categories`)
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

/** fecth list of products */
const getProductsData = async (url) => {

  displayLoading(true);
  displayError(false);
  document.querySelector('#products-list').innerHTML = '';
  document.querySelector("#pagination").innerHTML = '';

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

    if(productsData.length > 0){
      displayError(false);
      displayPagination(data.pagination, data.totalCount);
      addPaginationListeners();
    } else {
      displayError(true);
    }

  } catch(err) {
    console.log(err); 
    displayLoading(false);
    displayError(true);
  }
    
}

/** get products filters */
const filterProducts = (offset = 0, limit = 20) => {

  const categoryFilter = document.querySelector('#categories-filter');
  const selectedCategory = categoryFilter.options[categoryFilter.selectedIndex].value;

  const searchInputValue = document.querySelector('#search-input').value.trim();

  const sortSelect = document.querySelector('#sort-name');
  const sortField = sortSelect.options[sortSelect.selectedIndex].dataset.field;
  const sortOrder = sortSelect.options[sortSelect.selectedIndex].dataset.order;

  let url = `${baseUrl}/api/products?`
  
  if(selectedCategory){
    url += `category=${selectedCategory}&`;
  }

  if(searchInputValue && searchInputValue.length > 0){
    url += `name=${searchInputValue}&`;
  }

  url += `orderField=${sortField}&orderType=${sortOrder}&offset=${offset}&limit=${limit}`;

  getProductsData(url);
}

const addListeners = () => {

  // select
  const selectFilter = document.querySelector('#categories-filter');
  selectFilter.addEventListener('change', (e) => {
    e.preventDefault();
    filterProducts();
  });

  // search
  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    filterProducts();
  });

  // sort
  const sortSelect = document.querySelector('#sort-name');
  sortSelect.addEventListener('change', (e) => {
    e.preventDefault();
    filterProducts();
  });
}

const addPaginationListeners = () => {
  const paginationUl = document.querySelector("#pagination").childNodes[0];

  for(let pageLink of [...paginationUl.childNodes]){
    const linkBtn = pageLink.querySelector('button');
    const offset = linkBtn.dataset.offset;
    const limit = linkBtn.dataset.limit;
    linkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      filterProducts(offset, limit);
    });
  }
}

const load = async () => {

  // load categories options
  await getCategoriesData();
  // add event listeners
  addListeners();

  let url = `${baseUrl}/api/products`;
  getProductsData(url);

}

load();

