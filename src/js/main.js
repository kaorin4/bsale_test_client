import displayProductCard from './components/productCard.js';

const getProductsData = async () => {

  try {

    const response = await fetch("http://localhost:5000/api/products");

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


getProductsData();