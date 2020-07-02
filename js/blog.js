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
        let idCounter = 1;
        dataList.forEach(item => {
            if (item.title) {
                const postPattern = document.getElementById('post');
                let newPost = postPattern.cloneNode(true);
                const newId = newPost.id + idCounter
                newPost.setAttribute('id', newId);
                newPost.removeAttribute('hidden', '');
                idCounter++;
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
        if (pattern.className === 'post__pic') {
            pattern.setAttribute('src', data.image)
        } else if (data.type !== 'Video' && pattern.className === 'post__play') {
            pattern.remove();
        } else if (pattern.className === 'post__username author__username head4') {
            pattern.innerText = data.author;
        } else if (pattern.className === 'post__data data') {
            pattern.innerText = data.postDate;
        } else if (pattern.className === 'post__title head3') {
            pattern.innerText = data.title;
        } else if (pattern.className === 'post__paragraph paragraph') {
            let text = data.post;
            if (text.length > maxLength) {
                text = text.slice(0, maxLength);
                text = text + '...';
            }
            pattern.innerText = text;
        } else if (pattern.className === 'post__type') {
            if (data.type === 'Video') {
                pattern.firstElementChild.setAttribute('data', './img/atom-icons/a-icon-playmini.svg')
            } else if (data.type === 'Audio') {
                pattern.firstElementChild.setAttribute('data', './img/atom-icons/a-icon-melody.svg')
            } else if (data.type === 'Text') {
                pattern.firstElementChild.setAttribute('data', './img/atom-icons/a-icon-text.svg')
            } else if (data.type === 'Picture') {
                pattern.firstElementChild.setAttribute('data', './img/atom-icons/a-icon-picture.svg')
            }
        }
    }

    //search by author's name
    function search() {
        console.log(event.target.parentNode.parentNode.firstElementChild)
        console.log(this)
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
            console.log(text)
            console.log(criterion)

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
