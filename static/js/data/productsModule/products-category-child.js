let productsList = document.getElementById('products-list')
let pagination_div = document.getElementById('pagination-div')

let child_input = document.getElementById('child-input')
let num_input = document.getElementById('num-input')
let slug_input = document.getElementById('slug-input')

let userId = document.getElementById('is-login').value

let productsEndpoint = document.location.href + `/gotProducts/?page=${num_input.value}`
let productsOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}
console.log(productsEndpoint)
fetch(productsEndpoint, productsOption)
    .then(response => response.json())
    .then(data => {
        if (data.detail === 'صفحه نامعتبر'){
            document.location.href= 'http://127.0.0.1:8000/404_page/'
        }
        add_pagination(data, pagination_div, num_input, `http://127.0.0.1:8000/products/categories/${slug_input.value}/${child_input.value}/`, 5)
        add_products(data.results, productsList, userId)
    })