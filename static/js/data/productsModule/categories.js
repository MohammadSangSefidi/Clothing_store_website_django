let categorySlider = document.getElementById('category-slider')
let productsList = document.getElementById('products-list')


fetch(endpoint, option)
    .then(response => response.json())
    .then(data => {
        for (let category of data) {
            if (category.parent === null) {
                let title = JSON.stringify(category.title)
                let count = JSON.stringify(category.count)
                let slug = JSON.stringify(category.slug)
                let image_url = category.image_url
                categorySlider.innerHTML = `<div class="swiper-slide">
                        <a href="http://127.0.0.1:8000/products/categories/${slug.replace(/\"/g, "")}">
                            <div class="slider-category-item">
                                <div class="slider-category-item-title">
                                    <h6>${title.replace(/\"/g, "")}</h6>
                                    <span>${count.replace(/\"/g, "")} محصول</span>
                                </div>
                                <div class="slider-category-item-image">
                                    <img src="${image_url}" alt="">
                                </div>
                            </div>
                        </a>
                    </div>` + categorySlider.innerHTML
            }
        }
    })


let productsEndpoint = 'http://127.0.0.1:8000/products/gotProducts/'
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
    })