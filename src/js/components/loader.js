const displayLoading = (display = false) => {

  const loadingDiv = document.querySelector("#loading");
  
  display ? loadingDiv.style.display = "block" : loadingDiv.style.display = "none";
}

export default displayLoading;