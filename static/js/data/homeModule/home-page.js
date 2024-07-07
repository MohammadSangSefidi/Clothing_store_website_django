let categorySlider = document.getElementById('category-slider')
let categoryEndpoint = baseURL + '/products/categories/gotCategory/'
let categoryoption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}

let userId = document.getElementById('is-login').value

fetch(categoryEndpoint, categoryoption)
    .then(response => response.json())
    .then(data => {
        add_category_box(data, categorySlider)
    })


let best_sellingEndpoint = baseURL + '/products/gotProducts/bestSelling/'
let best_sellingSellOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}

fetch(best_sellingEndpoint, best_sellingSellOption)
    .then(response => response.json())
    .then(data => {
        let best_selling_slider = document.getElementById('best_selling_slider')
        add_products_slider(data, best_selling_slider, false)
    })


let newestEndpoint = baseURL + '/products/gotProducts/newest/'
let newestOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}
fetch(newestEndpoint, newestOption)
    .then(response => response.json())
    .then(data => {
        let newest_slider = document.getElementById('newest_slider')
        add_products_slider(data, newest_slider, false)
    })
