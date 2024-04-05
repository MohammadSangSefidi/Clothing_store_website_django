let productsList = document.getElementById('products-list')
let productsEndpoint = document.location.href + 'gotProducts/'
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
        add_products(data, productsList)
    })