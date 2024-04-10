let categorySlider = document.getElementById('category-slider')
let categoryEndpoint = 'http://127.0.0.1:8000/products/categories/gotCategory/'
let categoryoption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}
fetch(categoryEndpoint, categoryoption)
    .then(response => response.json())
    .then(data => {
        add_category_box(data, categorySlider)
    })


let best_sellingEndpoint = 'http://127.0.0.1:8000/products/gotProducts/bestSelling/'
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


let newestEndpoint = 'http://127.0.0.1:8000/products/gotProducts/newest/'
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

// let slider_image = document.getElementById('slider-image')
//
// let sliderEndpoint = 'http://127.0.0.1:8000/home-page/gotSliders/'
// let sliderOption = {
//     method: "GET",
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
//     }
// }
//
// fetch(sliderEndpoint, sliderOption)
//     .then(response => response.json())
//     .then(data => {
//         for (let image of data){
//             slider_image.innerHTML = slider_image.innerHTML + `
//                                 <div class="swiper-slide">
//                                     <a href="">
//                                         <img alt="" class="img-fluid" loading="lazy" src="/static/img/slider-4.webp">
//                                     </a>
//                                 </div>`
//         }
//     })