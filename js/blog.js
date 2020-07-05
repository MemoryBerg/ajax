(function () {
    const userPicsList = document.getElementsByClassName('author__userpic');
    let main = document.getElementById('main');
    const urlGetAll = 'http://localhost:3000/api/list';
    let dataList;

    //get posts list from server
    function getPostsList() {
        fetch(urlGetAll, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(
                async response => {
                    dataList = await response.json();
                    renderPost();
                })
            .catch(error => {
                alert(`Error: ${error} ${error.message}`);
            });
    }

    getPostsList();

    //create post's pattern
    function renderPost() {
        dataList.forEach(item => {
            if (item.title) {
                const postPattern = document.getElementById('post');
                let newPost = postPattern.cloneNode(true);
                const newId = newPost.id + item.id
                newPost.setAttribute('id', newId);
                newPost.removeAttribute('hidden', '');
                allChildren(newPost, item)
                main.append(newPost);
            }
        });
    }

    //found all elements and data to render post
    function allChildren(pattern, data) {
        Array.from(pattern.children).forEach(child => {
            renderData(child, data)
            allChildren(child, data);
        })
    }

    //render data to pattern
    function renderData(pattern, data) {
        const maxLength = 210;
        let text = data.post;
        switch (true) {
            case pattern.className === 'post__pic':
                pattern.setAttribute('src', data.image);
                if (data.image === '') {
                    pattern.parentElement.remove();
                }        
                break;
            case data.type !== 'Video' && pattern.className === 'post__play':
                pattern.remove();
                break;
            case pattern.className === 'post__username author__username head4':
                pattern.innerText = data.author;
                break;
            case pattern.className === 'post__data data':
                pattern.innerText = data.postDate;
                break;
            case pattern.className === 'post__title head3':
                pattern.innerText = data.title;
                break;
            case pattern.className === 'post__paragraph paragraph':
                if (text.length > maxLength) {
                    text = text.slice(0, maxLength);
                    text = text + '...';
                }
                pattern.innerText = text;
                break;
            case pattern.className === 'post__type':

                switch (true) {
                    case data.type === 'Video':
                        pattern.firstElementChild.setAttribute('data', './img/atom-icons/a-icon-playmini.svg');
                        break;
                    case data.type === 'Audio':
                        pattern.firstElementChild.setAttribute('data', './img/atom-icons/a-icon-melody.svg');
                        break;
                    case data.type === 'Text':
                        pattern.firstElementChild.setAttribute('data', './img/atom-icons/a-icon-text.svg');
                        break;
                    case data.type === 'Picture':
                        pattern.firstElementChild.setAttribute('data', './img/atom-icons/a-icon-picture.svg');
                        break;
                    default:
                        console.log('Something get wrong');
                    }
                break;
            case pattern.dataset.read === 'read':
                pattern.addEventListener('click', readPost);
                break;
            default:
                break;
        }
    }

    function readPost() {
        const post = this.parentNode.parentNode.parentNode;
        const currentLocation = location.href;
        const positionTochange = currentLocation.lastIndexOf('/');
        const sliceId = 4;
        let newLocation = currentLocation.slice(0, positionTochange + 1) + 'post.html#' + post.id.slice(sliceId);
        location.assign(newLocation);
    }
    //search by author's name
    function search() {
        const criterion = event.target.parentNode.parentNode.firstElementChild.value;
        let result;
        let count = 0;
        let wrapper = document.querySelector('[data-result]');
        if (wrapper) {
            wrapper.remove();
        }
        Array.from(userPicsList).forEach(user => {

            if (!result) {
                result = document.createElement('div');
                result.setAttribute('data-result', '');
            }
            const currentUser = user.cloneNode();
            currentUser.className = 'pic';
            let text = user.nextElementSibling.firstElementChild.innerText;

            if (text.includes(criterion, 0)) {

                count++;
                let searchingUser = document.createElement('div');
                searchingUser.className = 'search-pic';
                let name = document.createElement('span');
                name.innerText = user.nextElementSibling.firstElementChild.innerText;
                searchingUser.append(currentUser, name);

                result.append(searchingUser)
            }
        });
        if (count === 0) {
            result.innerText = 'Not founded';
        }

        document.getElementById('search').append(result)
    }

    let searchButton = document.getElementById('button-addon2');
    searchButton.addEventListener('click', search);
    main.addEventListener('click', () => {
        const button = Array.from(document.getElementsByClassName('button__search'))[0];
        if (event.target !== button) {
            const result = document.querySelector('[data-result]');
            if (result) {
                result.remove();
            }
        }
    })
}());
