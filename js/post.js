(function () {
    const urlGetAll = 'http://localhost:3000/api/list';
    window.addEventListener('hashchange', renderPostFromServer);
    let currentPost = JSON.parse(localStorage.getItem('post'));
    let dataList;

    renderPostFromServer();

    //get data to render
    function renderPostFromServer() {

        fetch(urlGetAll, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(async response => {
                dataList = await response.json();
                console.log(dataList)
                dataList.forEach(item => {
                    if (item.id.toString() === location.hash.substr(1)) {
                        currentPost = item;
                        renderPost(item);
                        console.log(currentPost)
                    }
                })
            })
            .catch(error => {
                alert(`Error: ${error} ${error.message}`);
            })
    }

    //render post info on Post Page
    function renderPost(data) {
        let post = document.getElementById('post-head');
        let userName = document.getElementById('post-username');
        let postDate = document.getElementById('post-date');
        let postPic = document.getElementById('post-pic');
        let postBody = document.getElementById('post-body');
        userName.innerText = data.author;
        postDate.innerText = data.postDate;

        if (data.image === '') {
            postPic.delete();
        }
        post.innerText = data.title;
        postPic.setAttribute('src', data.image);
        postBody.innerText = data.post;

        if (data.quote !== '') {
            let quote = document.createElement('blockquote');
            quote.innerText = data.quote;
            quote.classList = 'post__blockquote';
            postBody.append(quote);
        }
    }
}());