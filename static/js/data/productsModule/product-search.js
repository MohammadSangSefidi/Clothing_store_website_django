let productsList = document.getElementById('products-list')
let search_count = document.getElementById('search-count')
let pagination_div = document.getElementById('pagination-div')
let search_value_input = document.getElementById('search-value-input')

let userId = document.getElementById('is-login').value

let num_input = document.getElementById('num-input')
let productsEndpoint = document.location.href + `/gotResult/?page=${num_input.value}`
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
        add_pagination(data, pagination_div, num_input, baseURL +`/products/search/${search_value_input.value}/`, 5)
        add_products(data.results, productsList, userId)
        search_count.innerHTML = data.count
    })
