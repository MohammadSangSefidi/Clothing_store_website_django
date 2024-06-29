function add_category_box(categories, list) {
    for (let category of categories) {
        if (category.parent === null) {
            let title = JSON.stringify(category.title)
            let count = JSON.stringify(category.count)
            let slug = JSON.stringify(category.slug)
            let image_url = category.image_url
            list.innerHTML = `<div class="swiper-slide">
                        <a href="http://127.0.0.1:8000/products/categories/${slug.replace(/\"/g, "")}/1">
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
                    </div>` + list.innerHTML
        }
    }
}

async function checkFavorite(slug, userId) {
    let checkFavoriteEndpoint = `http://127.0.0.1:8000/products/detail/${slug}/checkFavorite/${userId}`
    let checkFavoriteOption = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
        }
    }

    try {
        const response = await fetch(checkFavoriteEndpoint, checkFavoriteOption);
        const data = await response.json();

        if (data.message === "accept") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}


async function add_products(data, list, userId) {
    for (let product of data) {
        let id = product.id
        let title = JSON.stringify(product.title)
        let slug = JSON.stringify(product.slug).replace(/\"/g, "")
        let heartIcon = ''
        const check = await checkFavorite(slug.replace(/\"/g, ""), userId)
        if (check) {
            heartIcon = 'bi bi-heart-fill color-red'
        } else {
            heartIcon = 'bi bi-heart color-red'
        }
        let price = JSON.stringify(product.price)
        let discount = product.discount + product.amazing
        let image1 = product.images[0].image
        let image2 = product.images[1].image
        let priceDiv
        if (product.discount + product.amazing !== 0) {
            let newPrice = product.price - (product.price * (product.discount + product.amazing) / 100)
            priceDiv = `<p class="old-price">${price.replace(/\"/g, "")} <span class="danger-label rounded-3 ms-2">${discount}%</span></p> <p class="new-price">${newPrice} <span class="font-12">تومان</span></p>`
        } else {
            priceDiv = `<p class="old-price"><span class="white-label rounded-3 ms-2">0</span></p><p class="new-price">${price.replace(/\"/g, "")} <span class="font-12">تومان</span></p>`
        }
        list.innerHTML = `<div class="col-md-6 col-xl-4 col-xxl-3">
                                <div class="product-box">
                                    <a href="http://127.0.0.1:8000/products/detail/${slug.replace(/\"/g, "")}/">
                                        <div class="product-image">
                                            <img src='${image1}' loading="lazy" alt=""
                                                 class="img-fluid one-image">
                                            <img src='${image2}' loading="lazy" alt=""
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
                                                    <li class="nav-item" id="f${id}" onclick="add_favorite('${slug}', 'f${id}', '${userId}')">
                                                        <i class="${heartIcon}"></i></li>
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


function add_products_slider(data, list, needTimer) {
    for (let product of data) {
        let id = product.id
        let title = JSON.stringify(product.title)
        let slug = JSON.stringify(product.slug).replace(/\"/g, "")
        let price = JSON.stringify(product.price)
        let discount = product.discount + product.amazing
        let image1 = product.images[0].image
        let image2 = product.images[1].image

        let timer_div = ''
        if (needTimer === true) {
            timer_div = `<div class="product-timer justify-content-center border-top pt-2 mb-0">
                                                <div class="timer">
                                                    <div class='countdown' data-date="${product.amazing_date_str}" data-time="${product.amazing_time_str}">
                                                    </div>
                                                </div>
                                            </div>`
        }
        let priceDiv
        if (product.discount + product.amazing !== 0) {
            let newPrice = product.price - (product.price * (product.discount + product.amazing) / 100)
            priceDiv = `<p class="old-price">${price.replace(/\"/g, "")} <span class="danger-label rounded-3 ms-2">${discount}%</span></p> <p class="new-price">${newPrice} <span class="font-12">تومان</span></p>`
        } else {
            priceDiv = `<p class="old-price"><span class="white-label rounded-3 ms-2">0</span></p><p class="new-price">${price.replace(/\"/g, "")} <span class="font-12">تومان</span></p>`
        }
        list.innerHTML = `<div class="swiper-slide">
                                <div class="product-box">
                                    <a href="http://127.0.0.1:8000/products/detail/${slug.replace(/\"/g, "")}/">
                                        <div class="product-image">
                                            <img src='${image1}' loading="lazy" alt=""
                                                 class="img-fluid one-image">
                                            <img src='${image2}' loading="lazy" alt=""
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
                                                </ul>
                                            </nav>
                                            <div class="product-rating">
                                                <div class="number"><span class="text-muted font-12">(${product.commentsCount}+) ${product.score}</span>
                                                </div>
                                                <div class="icon"><i class="bi bi-star-fill"></i></div>
                                                </div>
                                            </div>
                                            ${timer_div}
                                    </div>
                                </div>
                        </div>` + list.innerHTML
    }
}


function add_pagination(data, pagination_div, num_input, url, length) {
    if (data.previous === null) {
        pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item disabled hover_pagination"><a class="page-link rounded-3"><i class="bi bi-chevron-right"></i></a></li>`
    } else {
        let previous_num = Number(num_input.value) - 1
        pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item hover_pagination" id="next-page" onclick="change_page(${previous_num}, '${url}')"><a class="page-link rounded-3"><i class="bi bi-chevron-right"></i></a></li>`
    }

    let page_count = data.count / length

    if (!Number.isInteger(page_count)) {
        if (page_count < 1) {
            page_count = 1
        } else {
            page_count += 1
        }
    }
    for (let num of range(1, page_count)) {
        if (num === Number(num_input.value)) {
            pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item active hover_pagination" onclick="change_page(${num}, '${url}')"><a class="page-link rounded-3">${num}</a></li>`
        } else {
            pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item hover_pagination" onclick="change_page(${num}, '${url}')"><a class="page-link rounded-3">${num}</a></li>`
        }
    }
    // } else {
    //     for (let num of range(1, 3)) {
    //         pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item"><a class="page-link rounded-3" href="#">${num}</a></li>`
    //     }
    //     pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item disabled"><a class="page-link rounded-3" href="#">...</a></li>`
    //     pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item"><a class="page-link rounded-3" href="#">${data.count - 2}</a></li>`
    //     pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item"><a class="page-link rounded-3" href="#">${data.count - 1}</a></li>`
    //     pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item"><a class="page-link rounded-3" href="#">${data.count - 0}</a></li>`
    // }
    if (data.next === null) {
        pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item disabled hover_pagination"><a class="page-link rounded-3" href="#"><i class="bi bi-chevron-left"></i></a></li>`
    } else {
        let next_num = Number(num_input.value) + 1
        pagination_div.innerHTML = pagination_div.innerHTML + `<li class="page-item" id="next-page hover_pagination" onclick="change_page(${next_num}, '${url}')"><a class="page-link rounded-3"><i class="bi bi-chevron-left"></i></a></li>`
    }
}

function change_page(num, url) {
    document.location.href = url + num
}

function range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

function add_favorite(slug, buttonId, userId) {
    let button = document.getElementById(buttonId)
    if (userId !== 'None') {
        let addFavoriteEndpoint = `http://127.0.0.1:8000/products/detail/${slug}/addFavorite/${userId}/`
        let addFavoriteOption = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
            }
        }
        fetch(addFavoriteEndpoint, addFavoriteOption)
            .then(respone => respone.json())
            .then(data => {
                if (data.message === 'accept add') {
                    button.firstElementChild.classList.remove('bi-heart')
                    button.firstElementChild.classList.add('bi-heart-fill')
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "محصول به لیست علاقه مندی ها اضافه شد",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (data.message === 'accept remove') {
                    button.firstElementChild.classList.add('bi-heart')
                    button.firstElementChild.classList.remove('bi-heart-fill')
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "محصول از لیست علاقه مندی ها حذف شد",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (data.message === 'login is required') {
                    button.firstElementChild.classList.add('bi-heart')
                    button.firstElementChild.classList.remove('bi-heart-fill')
                    Swal.fire({
                        position: "center",
                        icon: "info",
                        title: "اول باید وارد حساب کاربری خود بشید",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    } else {
        button.firstElementChild.classList.add('bi-heart')
        button.firstElementChild.classList.remove('bi-heart-fill')
        Swal.fire({
            position: "center",
            icon: "info",
            title: "اول باید وارد حساب کاربری خود بشید",
            showConfirmButton: false,
            timer: 1500
        });
    }
}