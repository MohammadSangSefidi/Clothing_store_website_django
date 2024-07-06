let menu = document.getElementById('category-menu')
let mobileMenu = document.getElementById('category-menu-mobile')

let endpoint = baseURL + '/products/categories/gotCategory/'
let option = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}

fetch(endpoint, option)
    .then(response => response.json())
    .then(data => {
        let parents = []
        let childs = []
        for (let category of data) {
            if (category.parent === null) {
                parents.push(category)
            }
            else {
                childs.push(category)
            }
        }
        for (let parent of parents){
            let title = JSON.stringify(parent.title)
            let id = JSON.stringify(parent.id)
            let slug = JSON.stringify(parent.slug)
            menu.innerHTML = menu.innerHTML + `<li id="${id}parent"><a href="${baseURL}/products/categories/${slug.replace(/\"/g, "")}/1"><i class="bi bi-chevron-left"> </i>${title.replace(/\"/g, "")}</a><ul class="level-two" id="${id}"> </ul> </li>`
            mobileMenu.innerHTML = mobileMenu.innerHTML + `<li><a href="${baseURL}/products/categories/${slug.replace(/\"/g, "")}/1">${title.replace(/\"/g, "")}</a></li>`
        }
        for (let child of childs){
            let parentStr = JSON.stringify(child.parent.id)
            let parentSlug = JSON.stringify(child.parent.slug)
            let slug = JSON.stringify(child.slug)
            let parent = document.getElementById(parentStr)
            let name = JSON.stringify(child.title)
            parent.innerHTML = parent.innerHTML + `<li><a href="${baseURL}/products/categories/${parentSlug.replace(/\"/g, "")}/${slug.replace(/\"/g, "")}/1">${name.replace(/\"/g, "")}</a></li>`
        }
        for (let parent of parents){
            let parentStr = JSON.stringify(parent.id)
            let title = JSON.stringify(parent.title)
            let slug = JSON.stringify(parent.slug)
            let parentDiv = document.getElementById(parentStr)
            if (parentDiv.innerHTML === ' '){
                let div = document.getElementById(`${parentStr}parent`)
                let div_mobile = document.getElementById(`${parentStr}parent-mobile`)
                div.parentNode.removeChild(div)
                menu.innerHTML = menu.innerHTML + `<li><a href="${baseURL}/products/categories/${slug.replace(/\"/g, "")}/1">${title.replace(/\"/g, "")}</a></li>`
            }
        }
    })

let search_button = document.getElementById('search-button')
let search_input_header = document.getElementById('search-input-header')

search_button.addEventListener('click', function (event) {
    event.preventDefault();
    if (search_input_header.value !== ''){
        document.location.href = `${baseURL}/products/search/${search_input_header.value}/1`
    }
    else {
        document.location.href = `${baseURL}/products/categories/1`
    }
})


let search_button_mobile = document.getElementById('search-button-mobile')
let search_input_header_mobile = document.getElementById('search-input-header-mobile')

search_button_mobile.addEventListener('click', function (event) {
    event.preventDefault();
    if (search_input_header_mobile.value !== null){
        document.location.href = `${baseURL}/products/search/${search_input_header_mobile.value}/1`
    }
    else {
        document.location.href = `${baseURL}/products/categories/1`
    }
})