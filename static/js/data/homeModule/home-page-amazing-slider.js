let amazing_slider = document.getElementById('amazing_slider')
let amazing_sliderEndpoint = 'http://127.0.0.1:8000/home-page/gotAmazingProducts/'
let amazing_sliderOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}

fetch(amazing_sliderEndpoint, amazing_sliderOption)
    .then(response => response.json())
    .then(data => {
        for (let product of data){
            let discount = product.discount + product.amazing
            let image = product.images[0].image
            let new_price = product.price - (product.price * (product.discount + product.amazing) / 100)
            amazing_slider.innerHTML = amazing_slider.innerHTML + `
                           <div class="swiper-slide">
                                <div class="product-box">
                                    <div class="product-timer">
                                        <div class="timer-label">
                                            <span>${discount}%</span>
                                        </div>
                                        <div class="timer">
                                            <div class='countdown' data-date="${product.amazing_date_str}" data-time="${product.amazing_time_str}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="product-image">
                                        <img alt="" class="img-fluid" loading="lazy"
                                             src="${image}">
                                    </div>
                                    <div class="product-title">
                                        <div class="title">
                                            <p class=" title-font">${product.title}</p>
                                        </div>
                                        <div class="product-rating">
                                            <div class="number"><span class="text-muted font-12">(${product.commentsCount}+) ${product.score}</span></div>
                                            <div class="icon"><i class="bi bi-star-fill"></i></div>
                                        </div>
                                    </div>
                                    <div class="product-action">
                                        <div class="link">
                                            <a class="btn border-0 rounded-3 main-color-one-bg" href="http://127.0.0.1:8000/products/detail/${product.slug}/">
                                                <i class="bi bi-basket text-white"></i>
                                            </a>
                                        </div>
                                        <div class="price">
                                            <p class="old-price">${product.price}</p>
                                            <p class="new-price">${new_price} <span class="font-12">تومان</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        }
    })

