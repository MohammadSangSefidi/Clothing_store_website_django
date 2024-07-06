let productsList = document.getElementById('products-list')
let num_input = document.getElementById('num-input')
let category_slug_input = document.getElementById('category-slug-input')
let pagination_div = document.getElementById('pagination-div')

let userId = document.getElementById('is-login').value

let productsEndpoint = document.location.href + `/gotProducts/?page=${num_input.value}`
let productsOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}
fetch(productsEndpoint, productsOption)
    .then(response => response.json())
    .then(data => {
        if (data.detail === 'صفحه نامعتبر'){
            document.location.href = baseURL + '/404_page/'
        }
        add_pagination(data, pagination_div, num_input, baseURL + `/products/categories/${category_slug_input.value}/`, 5)
        add_products(data.results, productsList, userId)
    })