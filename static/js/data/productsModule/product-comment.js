let comment_list = document.getElementById('comment-list')
let commentsEndpoint = `http://127.0.0.1:8000/products/detail/${slug}/gotComments/`
let commentsOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}


fetch(commentsEndpoint, commentsOption)
    .then(response => response.json())
    .then(data => {
        let commentDiv
        for (let comment of data) {
            commentDiv = `<div class="comment mb-4">
                                            <div class="title">
                                                <div class="row align-items-center">
                                                    <div class="col-sm-10">
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar p-2 bg-white shadow-box rounded-circle">
                                                                <img src="/static/img/user.png" alt=""
                                                                     class="img-fluid rounded-circle">
                                                            </div>
                                                            <div class="d-flex flex-wrap align-items-center ms-2">
                                                                <h6 class="text-muted font-14">${JSON.stringify(comment.name).replace(/\"/g, "")}</h6>
                                                                <h6 class="text-muted font-14 ms-2">${JSON.stringify(comment.createDate).replace(/\"/g, "")}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <div class="d-flex star justify-content-end" id="${JSON.stringify(comment.id).replace(/\"/g, "")}-star-box">
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="desc py-3">
                                                <p class="font-14 text-muted">
                                                    ${JSON.stringify(comment.commentText).replace(/\"/g, "")}
                                                </p>
                                            </div>
                                            <div class="foot">
                                                <div class="row align-items-center">
                                                </div>
                                            </div>
                                        </div>`
            comment_list.innerHTML = comment_list.innerHTML + commentDiv

            let starsDiv = document.getElementById(`${JSON.stringify(comment.id).replace(/\"/g, "")}-star-box`)
            let scorelist = comment.score.scoreList
            for (let score of scorelist){
                starsDiv.innerHTML = starsDiv.innerHTML + '<i class="bi bi-star-fill"></i>'
            }
            for (let num of range(1, 5 - comment.score.score)){
                starsDiv.innerHTML = '<i class="bi bi-star"></i>' + starsDiv.innerHTML
            }
        }
    })


