function add_products(data, list) {
    for (let product of data) {
        let title = JSON.stringify(product.title)
        let slug = JSON.stringify(product.slug)
        let price = JSON.stringify(product.price)
        let discount = JSON.stringify(product.discount)
        console.log(product.images[0].image)
        let image = product.images[0].image
        let priceDiv
        if (product.discount !== 0) {
            let newPrice = product.price - (product.price * product.discount / 100)
            priceDiv = `<p class="old-price">${price.replace(/\"/g, "")} <span class="danger-label rounded-3 ms-2">${discount.replace(/\"/g, "")}%</span></p> <p class="new-price">${newPrice} <span class="font-12">تومان</span></p>`
        } else {
            priceDiv = `<p class="old-price"><span class="white-label rounded-3 ms-2">0</span></p><p class="new-price">${price.replace(/\"/g, "")} <span class="font-12">تومان</span></p>`
        }
        list.innerHTML = `<div class="col-md-6 col-xl-4 col-xxl-3">
                                <div class="product-box">
                                    <a href="http://127.0.0.1:8000/products/detail/${slug.replace(/\"/g, "")}/">
                                        <div class="product-image">
                                            <img src='${image}' loading="lazy" alt=""
                                                 class="img-fluid one-image">
                                            <img src='${image}' loading="lazy" alt=""
                                                 class="img-fluid two-image">
                                        </div>
                                        <div class="product-title">
                                            <div class="title">
                                                <p class="text-overflow-1 title-font">${title.replace(/\"/g, "")}</p>
                                            </div>
                                        </div>
                                        <div class="product-action">
                                            <div class="link">
                                                <button class="btn border-0 rounded-3 main-color-one-bg" href="">
                                                    <i class="bi bi-basket text-white"></i>
                                                </button>
                                            </div>
                                            <div class="price">
                                                ${priceDiv}
                                            </div>
                                        </div>
                                    </a>
                                    <div class="product-foot mt-2 border-top border-1 pt-1">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <nav class="navbar navbar-expand">
                                                <ul class="navbar-nav align-items-center">
                                                    <li class="nav-item"><a href=""
                                                                            class="nav-item product-box-hover-item product-box-hover-item-btn"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            data-bs-title="مشاهده سریع"><i
                                                            class="bi bi-search"></i></a></li>
                                                    <li class="nav-item"><a href=""
                                                                            class="nav-item product-box-hover-item product-box-hover-item-btn mx-3"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            data-bs-title="افزودن به سبد خرید"><i
                                                            class="bi bi-basket"></i></a></li>
                                                    <li class="nav-item"><a href=""
                                                                            class="nav-item product-box-hover-item product-box-hover-item-btn"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            data-bs-title="افزودن به علاقه ها"><i
                                                            class="bi bi-heart"></i></a></li>
                                                </ul>
                                            </nav>
                                            <div class="product-rating">
                                                <div class="number"><span class="text-muted font-12">(${product.commentsCount}+) ${product.score}</span>
                                                </div>
                                                <div class="icon"><i class="bi bi-star-fill"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>` + list.innerHTML
    }
}