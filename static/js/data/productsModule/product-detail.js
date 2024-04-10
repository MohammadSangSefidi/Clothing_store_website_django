let product_title = document.getElementById('product-title')
let remain_div = document.getElementById('remain-div')
let category_div = document.getElementById('category-div')
let pk_div = document.getElementById('pk-div')
let products_info = document.getElementById('products-info')
let colors_div = document.getElementById('colors-div')
let sizes_div = document.getElementById('sizes-div')
let price_div = document.getElementById('price-div')
let info_div = document.getElementById('info-div')
let comment_count = document.getElementById('comment-count')
let score_average = document.getElementById('score-average')
let image_slider = document.getElementById('image-slider')
let big_image_slider = document.getElementById('big-image-slider')

let productsEndpoint = `http://127.0.0.1:8000/products/detail/${slug}/gotProduct/`
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
        product_title.innerHTML = JSON.stringify(data.title).replace(/\"/g, "")
        if (data.count === 0) {
            remain_div.classList.remove('label-success')
            remain_div.classList.add('text-white')
            remain_div.classList.add('text-bg-danger')
            remain_div.innerHTML = `<i class="bi bi-dash-circle bi-dash me-1"></i>
                                            اتمام محصول`
        }
        category_div.innerHTML = `${JSON.stringify(data.category.title).replace(/\"/g, "")} - ${JSON.stringify(data.category.parent.title).replace(/\"/g, "")}`
        pk_div.innerHTML = `<span class="text-muted-two me-2" id="pk-div">کد محصول</span>
                                        <span>sku-1000${data.id}</span>`

        if (data.brand !== null) {
            products_info.innerHTML = products_info.innerHTML + `<li class="nav item"><span>برند:</span><strong>${JSON.stringify(data.brand).replace(/\"/g, "")}</strong></li>`
        } else {
            products_info.innerHTML = products_info.innerHTML + `<li class="nav item"><span>برند:</span><strong>ندارد</strong></li>`
        }
        if (data.country !== null) {
            products_info.innerHTML = products_info.innerHTML + `<li class="nav item"><span>کشور:</span><strong>${JSON.stringify(data.country).replace(/\"/g, "")}</strong></li>`
        } else {
            products_info.innerHTML = products_info.innerHTML + `<li class="nav item"><span>کشور:</span><strong>ندارد</strong></li>`
        }
        if (data.seller !== null) {
            products_info.innerHTML = products_info.innerHTML + `<li class="nav item"><span>فروشنده:</span><strong>${JSON.stringify(data.seller).replace(/\"/g, "")}</strong></li>`
        } else {
            products_info.innerHTML = products_info.innerHTML + `<li class="nav item"><span>فروشنده:</span><strong>ندارد</strong></li>`
        }
        if (data.size !== null) {
            for (let size of data.size) {
                sizes_div.innerHTML = sizes_div.innerHTML + `<input type="radio" class="btn-check" name="options" id="option4"
                                           autocomplete="off">
                                    <label class="btn " for="option4">
                                        ${JSON.stringify(size.title).replace(/\"/g, "")}
                                    </label>`
            }
        } else {
            sizes_div.innerHTML = sizes_div.innerHTML + `<input type="radio" class="btn-check" name="options" id="option4"
                                           autocomplete="off">
                                    <label class="btn " for="option4">
                                        ندارد
                                    </label>`
        }
        if (data.color !== null) {
            for (let color of data.color) {
                colors_div.innerHTML = colors_div.innerHTML + `<input type="radio" class="btn-check" name="options" id="option4"
                                           autocomplete="off">
                                    <label class="btn " for="option4">
                                        <span style="background-color: #${color.colorCode};"></span>
                                        ${JSON.stringify(color.title).replace(/\"/g, "")}
                                    </label>`
            }
        } else {
            colors_div.innerHTML = colors_div.innerHTML + `<input type="radio" class="btn-check" name="options" id="option4"
                                           autocomplete="off">
                                    <label class="btn " for="option4">
                                        ندارد
                                    </label>`
        }
        price_div.innerHTML = `${data.price - (data.price * (data.discount + data.amazing) / 100)} تومان`
        info_div.innerHTML = data.shortDes
        comment_count.innerHTML = data.commentsCount
        score_average.innerHTML = data.score

        for (let image of data.images) {
            image_slider.innerHTML = image_slider.innerHTML + `<div class="swiper-slide">
                                            <img alt="" class="img-fluid" src="${image.image}"/>
                                        </div>`
            big_image_slider.innerHTML = big_image_slider.innerHTML + `<div class="swiper-slide">
                                                <div class="swiper-zoom-container">
                                                    <img class="img-fluid" src="${image.image}"
                                                         alt=""/>
                                                </div>
                                            </div>`
        }

    })

