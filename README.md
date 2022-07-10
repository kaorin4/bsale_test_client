# BSALE Test Frontend

- Aplicación cliente desarrollada con Vanilla Javascript (no React/Angular/Vue,etc) y Bootstrap. La aplicación consume servicios desplegados en https://bsaletestapikmura.herokuapp.com

- Actualmente desplegada en https://bsaletestclientkmura.netlify.app/

- Para consumir los servicios se utiliza fetch API.
- Para obtener los valores para el filtrado de productos se utiliza query.Selector.
- Para actualizar la data en base a la interacción de los usuarios con los elementos (select de category, select de orden, search form para búsqueda de producto por nombre, botones de paginación) se utiliza event listeners.
- Los query params se van agregando en base a los filtros que agregue el usuario.

**Listado de productos**

![Product List](/documentation/img/product_list.png)

- GET /api/products retorna la lista de productos.
- Por cada elemento del listado se crea un product card con los detalles del producto: nombre, imagen, precio, precio con descuento en caso tenga descuento.
- Si el producto tiene descuento se agrega un tag de "discount" en la parte superior derecha.
- El listado de productos mostrado cambia en base a los filtros usados (filtro por categoria, búsqueda de producto por nombre, orden por nombre/precio).

**Barra de búsqueda de producto**

![Search Bar](/documentation/img/buscador.png)

- En la parte superior derecha se encuentra un buscador en la cual es usuario puede colocar un término a buscar.
- El listado se actualiza cada vez que se hace click al botón de búsqueda o enter a la barra.
- La búsqueda se realiza agregando el query param de "name" con el valor del término buscado
- Por ejemplo: El término "papas" retorna un listado de productos cuyo nombre contenga la palabra "papas" (/api/products?name=papas)

**Filtro por categoría**

![Categories](/documentation/img/categorias.png)

- Arriba del listado se encuentra un select de categorías. Cuando el usuario cambia la opción del select se actualiza el listado de productos en base a la categoría seleccionada.
- El filtrado se realiza agregando el query param de "category" con el id de la categoría.
- Por default no se filtra por categorías.
- Por ejemplo: El id de la categoría snack es "5" y retorna una lista de productos con dicha categoría (/api/products?category=5)
- NOTA: Se puede filtrar por categoría Y por nombre del producto.

**Ordenar listado de productos**

![Sort](/documentation/img/sort.png)

- Arriba del listado se encuentra un select de opciones de sorting the productos.
- Se puede ordenar los productos por nombre o por precio, de manera ascendente o descendente.
- Por default se ordena por nombre del producto de manera ascendente.
- El order se realiza agregando los query param de "orderField" el cual puede ser name or price, y "orderType" el cual puede ser "ASC" (Ascendente) o "DESC" (Descendente).

**Paginación**

![Pagination](/documentation/img/pagination_first.png)

- Debajo del listado se encuentra un nav de paginación.
- Por default el limit es 20. Es decir, se muestra máximo 20 productos.
- Si el listado de productos es largo, se mostrará una paginación con el número de las páginas y botones de "Previo" y "Siguiente".

![Pagination](/documentation/img/pagination.png)

- Hacer click on los botones de paginación mostrarán productos distintos en base al offset de la paginación. Por ejemplo, si el limit es 20, el offset de la segunda página es 20 (muestra productos del 21 al 40).

![Pagination](/documentation/img/pagination_1.png)

- Si el listado es menor al límite, solo se muestra una página y los botones de "Previo" y "Siguiente" se encuentran deshabilitados.

**No productos**

![Pagination](/documentation/img/no_found.png)

- Si no hay productos disponibles en base a la búsqueda, se muestra el mensaje de "No products found"
