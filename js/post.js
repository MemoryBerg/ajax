(function () {
    let postId = 0;
    window.addEventListener('hashchange', () => {
        location.reload();
    });

    renderPostFromServer();

    //get data to render
    function renderPostFromServer() {
        getPostId();
        const urlGetPost = `http://localhost:3000/api/list/${postId}`;

        fetch(urlGetPost, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(response => {
                return response.json();
            })
            .then(res => {
                renderPost(res);
            })
            .catch(error => {
                alert(`Error: ${error} ${error.message}`);
            })
    }

    //render post info on Post Page
    function renderPost(data) {
        let post = document.getElementById('post-head');
        let userName = document.getElementById('post-username');
        let userPic = document.getElementById('post-userpic');
        let postDate = document.getElementById('post-date');
        let postRead = document.getElementById('post-read');
        let postComment = document.getElementById('post-comment')
        let postPic = document.getElementById('post-pic');
        let postBody = document.getElementById('post-body');
        userName.innerText = data.author;
        postDate.innerText = data.postDate;

        postRead.innerText = data.min ?
            `${data.min} min read`
            : 'a few min read';

        postComment.innerText = data.comment || 0;
        if (data.pic) {
            userPic.setAttribute('src', data.pic)
        } else {
            userPic.setAttribute('src', './img/post/uncknown.png')
        }
        if (data.image === '') {
            postPic.remove();
        }
        post.innerText = data.title;
        postPic.setAttribute('src', data.image);
        postBody.innerText = data.post;

        if (data.quote) {
            let quote = document.createElement('blockquote');
            quote.innerText = data.quote;
            quote.classList = 'post__blockquote';
            postBody.append(quote);
        }
    }

    function getPostId() {
        postId = location.hash.substr(1);
    }
}());