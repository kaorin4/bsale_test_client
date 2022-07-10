const addCategoryOptions = (categories) => {

  const selectFilter = document.querySelector('#categories-filter');

  categories.map(category => {
    const option = new Option(category.name, category.id);
    selectFilter.appendChild(option);
  });

}

export default addCategoryOptions;