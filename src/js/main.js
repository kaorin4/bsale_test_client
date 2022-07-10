import displayProductCard from './components/productCard.js';

const getCategoriesData = async () => {

  return fetch('http://localhost:5000/api/categories')
    .then(res => {
      if(!res.ok){
        throw Error('error');
      }
      return res.json();
    })
    .then(data => {
      addCategories(data.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const getProductsData = async (url) => {

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

  } catch(err) {
    console.log(err); 
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

const addCategories = (categories) => {

  const selectFilter = document.querySelector('#categories-filter');

  categories.map(category => {

    const option = new Option(category.name, category.id);
    selectFilter.appendChild(option);
  });

}

const addListeners = () => {

  // select
  const selectFilter = document.querySelector('#categories-filter');
  selectFilter.addEventListener('change', filterProductsByCategory);
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

