const displayError = (display = false) => {

  const errorDiv = document.querySelector("#error-msg");
  
  display ? errorDiv.style.display = "block" : errorDiv.style.display = "none";
}

export default displayError;