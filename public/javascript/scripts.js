//scripts.js


let newComment = document.querySelector('#newComment')
// Listen for a form submit event
newComment.addEventListener('submit', e => {
    // prevent the default behavior (page reload?)
    e.preventDefault();
    // serialize the form data into an object
    let commentForm = new FormData(newComment)

    ///create JSON object
    let data = {};
    //create for loop
    for (let i of commentForm){
        data[i[0]] = i[1];

    }

    console.log(JSON.stringify(data))



    // use axios to initialize a post request and send in the form data
    axios.post('/reviews/comments', data)
    .then((response) => {
        // wait for the success response from the server
        console.log(response.data);
        // console.log(data);
        // remove the info from the form
        newComment.reset()
        // display data as new comment on page
        const comments = document.getElementById('comments')

        $(comments).prepend(`
            <div class="card comment-box" id="${this._id}">
                <div class="card-block">
                    <h4 class="card-title">${response.data.comment.title}</h4>
                    <p class="card-text">${response.data.comment.content}</p>
                    <p>
                        <button id="deleteComment" onClick="destroyComment()" class="btn btn-link deleteComment" data-comment-id="${response.data.comment._id}" data-review-id="${response.data.comment.reviewId}">Delete</button>
                    </p>

                </div>

            </div>
            `)



    }).catch((err) => {
        // handle any errors
        console.log(err);
        alert('There was a problem saving your comment. Please try again');
        console.log(err);


    });
 


});
function destroyComment(com) {
    let deleteBtn = document.querySelector('.deleteComment');
    let commentId = deleteBtn.getAttribute('data-comment-id');
    let reviewId = deleteBtn.getAttribute('data-review-id');
    axios.delete(`/reviews/${reviewId}/comments/${commentId}`).then(res => {
        console.log(res);
        let comment = document.querySelector('.comment-box');
        comment.style.display = 'none';
    }).catch(err => {
        console.log(err);
    })
}

function destroyReview(id) {
    let deleteReview = document.querySelector('.delete-review');
    let reviewId = deleteReview.getAttribute('data-review-id');
    axios.delete(`admin/reviews/${reviewId}`).then(res => {
        let review = document.querySelector('.review-box');
        review.style.display = 'none';
    }).catch(err => {
        console.log(err);
    })
}
