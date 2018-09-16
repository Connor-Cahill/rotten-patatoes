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

// current issue is that the event listener isnt adding onto the newly appended comment
// but it sets up all other event listeners
//
// function setupDelListeners() {
//     const deleteBtn = document.querySelector('.deleteComment');
//     console.log('function is starting...' + deleteBtn)
//         console.log('adding event listeners');
//             deleteBtn.addEventListener('click', (e) => {
//                 console.log('delete button was clicked');
//                 let commentId = deleteBtn.getAttribute('data-comment-id');
//                 let reviewId = deleteBtn.getAttribute('data-review-id');
//
//                 axios.delete(`/reviews/${reviewId}/comments/${commentId}`).then((res) => {
//                     let comment = document.getElementById(commentId)
//                     console.log('>>>>>> ' + commentId)
//                     comment.parentNode.removeChild(comment);
//
//                 }).catch((err) => {
//                     console.log(err);
//                     alert('There was an issue deleting your comment.');
//             })
//         })
//     }
