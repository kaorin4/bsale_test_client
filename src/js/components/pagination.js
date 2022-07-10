const displayPagination = (pagination, totalCount) => {

  document.querySelector("#pagination").innerHTML = '';

  const {nextPage, numberOfPages, page, prevPage, limit} = pagination;

  const paginationDiv = document.querySelector("#pagination");

  let pageLinks = document.createElement('ul');
  pageLinks.classList.add('pagination', 'justify-content-center');

  pageLinks.innerHTML += `<li id="prev-item" class="page-item ${!prevPage ? 'disabled' : ''}">
          <button class="page-link" aria-label="Previous" data-offset=${prevPage?.offset} data-limit=${limit}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>`;

  for(let i=0; i<numberOfPages; i++){
    const offset = i * limit;
    pageLinks.innerHTML += `<li class="page-item ${page == (i+1) ? 'active' : ''}">
      <button class="page-link" data-offset=${offset} data-limit=${limit}>${i+1}</button>
    </li>`;
  }

  pageLinks.innerHTML += `<li id="next-item" class="page-item ${!nextPage ? 'disabled' : ''}">
          <button class="page-link" aria-label="Next" data-offset=${nextPage?.offset} data-limit=${limit}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>`;

  paginationDiv.append(pageLinks);

  let paginationInfo = document.createElement('span');
  paginationInfo.classList.add('pagination-info');
  paginationInfo.innerHTML = `Showing ${(page-1) * limit}-${((page-1) * limit) + limit} of ${totalCount} products`;
  paginationDiv.append(paginationInfo);
}

export default displayPagination;