let categorySlider = document.getElementById('category-slider')
let productsList = document.getElementById('products-list')
let pagination_div = document.getElementById('pagination-div')

let userId = document.getElementById('is-login').value


fetch(endpoint, option)
    .then(response => response.json())
    .then(data => {
        add_category_box(data, categorySlider)
    })

let num_input = document.getElementById('num-input')

let productsEndpoint = baseURL + `/products/gotProducts/?page=${num_input.value}`
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
            document.location.href= baseURL + '/404_page/'
        }
        add_pagination(data, pagination_div, num_input,  baseURL + '/products/categories/', 5)
        add_products(data.results, productsList, userId)
    })


