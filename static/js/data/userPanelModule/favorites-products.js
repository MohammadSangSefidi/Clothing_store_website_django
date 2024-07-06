let favoriteProductsList = document.getElementById('favorite-products-list')

let userId = document.getElementById('is-login').value

let num_input = document.getElementById('num-input')

function remove_favorite(slug, userId, listId, boxId) {
    if (userId !== 'None') {
        let addFavoriteEndpoint = `${baseURL}/products/detail/${slug}/addFavorite/${userId}/`
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
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "محصول به لیست علاقه مندی ها اضافه شد",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (data.message === 'accept remove') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "محصول از لیست علاقه مندی ها حذف شد",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (data.message === 'login is required') {
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
        Swal.fire({
            position: "center",
            icon: "info",
            title: "اول باید وارد حساب کاربری خود بشید",
            showConfirmButton: false,
            timer: 1500
        });
    }
    let list = document.getElementById(listId)
    let box = document.getElementById(boxId)
    list.removeChild(box)
    if (list.innerHTML.trim() === ""){
        list.innerHTML = `<div class="col-sm-6"> <h3 class="text-overflow-2 font-16"> محصولی به لیست علاقه مندی اضافه نشده. </h3></div>`
    }
}

let favoriteProductsEndpoint = `${baseURL}/userPanel/${num_input.value}/favorites/${userId}/`
let favoriteProductsOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}
fetch(favoriteProductsEndpoint, favoriteProductsOption)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0){
        for (let product of data) {
            let id = product.id
            let title = JSON.stringify(product.title)
            let slug = JSON.stringify(product.slug).replace(/\"/g, "")
            let image1 = product.images[0].image
            let price = JSON.stringify(product.price)
            let favorite_price_div = `<ins class="font-25 ms-0">${price}<span>تومان</span></ins>`
            favoriteProductsList.innerHTML = `<div class="col-sm-6" id="box-${id}">
                                    <div class="cart-canvas border rounded-3 p-3">
                                        <div class="row align-items-center">
                                            <div class="col-4 ps-0">
                                                <a href="${baseURL}/products/detail/${slug}/"><img src="${image1}" width="200" alt=""></a>
                                            </div>
                                            <div class="col-8">
                                                <h3 class="text-overflow-2 font-16">
                                                    ${title.replace(/\"/g, "")}
                                                </h3>
                                                <div class="product-box-suggest-price my-2  d-flex align-items-center justify-content-between">
                                                    ${favorite_price_div}
                                                </div>
                                                <div class="cart-canvas-foot d-flex align-items-center justify-content-between">
                                                    <div class="cart-canvas-delete" id="remove-favorite" onclick="remove_favorite('${slug}', '${userId}', 'favorite-products-list', 'box-${id}')">
                                                        <div href="" class="btn delete-button"><i class="bi bi-x"></i></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>` + favoriteProductsList.innerHTML
        }}
        else {
            favoriteProductsList.innerHTML = `<div class="col-sm-6"> <h3 class="text-overflow-2 font-16"> محصولی به لیست علاقه مندی اضافه نشده. </h3></div>`
        }
    })