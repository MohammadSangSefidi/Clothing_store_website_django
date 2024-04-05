let productsList = document.getElementById('products-list')
let search_count = document.getElementById('search-count')

let productsEndpoint = document.location.href + 'gotResult/'
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
        add_products(data, productsList)
        search_count.innerHTML = data.length
    })
