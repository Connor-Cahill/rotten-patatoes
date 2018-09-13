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
///////using reponse returns undefined while using data. returns content'    ${response.data.comment._id}
        $(comments).prepend(`
            <div class="card" id="${response._id}">
                <div class="card-block">
                    <h4 class="card-title">${response.data.comment.title}</h4>
                    <p class="card-text">${response.data.comment.content}</p>
                    <p>
                        <form action="/reviews/${response.data.comment.reviewId}/comments/${response.data.comment._id}?_method=DELETE" method="post">
                            <button type="submit" class="btn btn-link">Delete</button>
                        </form>
                    </p>

                </div>

            </div>
            `)
            // deleteCommentListener();


    }).catch((err) => {
        // handle any errors
        console.log(err);
        alert('There was a problem saving your comment. Please try again');
        console.log(err);


    });



});

function setupDeleteListeners() {
    console.log('function is starting...')
    const deleteBtn = document.querySelectorAll('.deleteComment');
    deleteBtn.forEach((el) => {
        console.log('adding event listeners')
        el.addEventListener('click', (e) => {
            console.log('delete button was clicked');
            let commentId = el.getAttribute('data-comment-id');
            let reviewId = el.getAttribute('data-review-id');
            axios.delete(`/reviews/${reviewId}/comments/${commentId}`).then((res) => {
                console.log('delete comment ', JSON.stringify(res))
                let comment = document.getElementById(commentId)
                comment.style.display = "none";
            }).catch((err) => {
                console.log(err.message);
                alert('There was an issue deleting your comment.');
            })
        })
    })




}





// function deleteCommentListener() {
//     const deleteBtn = document.querySelectorAll('#deleteComment');
//     deleteBtn.forEach(el => {
//         console.log('adding event listener');
//             el.addEventListener('click', (e) => {
//             console.log('click!');
//             let commentId = el.getAttribute('data-comment-id');
//             let reviewId = el.getAttribute('data-review-id');
//             axios.delete(`/reviews/${reviewId}/comments/${commentId}`)
//             .then(res => {
//                 let comment = document.getElementById('commentId');
//                 comment.style.display = none;
//             }).catch((err) => {
//                 alert('There was an error deleting your comment.');
//             })
//         });
//     });
//
// }
