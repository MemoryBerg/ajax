(function () {
    const userPicsList = document.getElementsByClassName('author__userpic');
    let main = document.getElementById('main');
    const urlGetAll = 'http://localhost:3000/api/list';

    renderPostPage();

    function getPostsListFromServer() {
        const serverResponse = fetch(urlGetAll, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                alert(`Error: ${error} ${error.message}`);
            });

        return serverResponse;
    }

    function renderPostPage() {
        const serverData = getPostsListFromServer();
        serverData
            .then(res => {
                let dataToRender = res;
                if (res.length >= 5) {
                    dataToRender = res.slice(1, 5);
                }
                dataToRender.forEach(element => {
                    renderPost(element)
                });
            })
            .then(() => {
                const postsArray = Array.from(document.getElementsByClassName('post'));
                postsArray.forEach(post => {
                    post.addEventListener('click', postButtonClick)
                })
            })

    }

    function parseData(data) {
        const dataToPost = {
            title: data.title,
            type: data.type.toLowerCase(),
            image: data.image,
            author: data.author,
            text: data.post,
            quote: data.quote,
            date: data.postDate,
            id: data.id,
            min: data.min || 'some',
            comment: data.comment || '0',
            likes: data.likes || 0,
            read: data.read || 'more',
            pic: data.pic || './img/post/uncknown.png',
            rate: data.rate,
        }
        switch (dataToPost.type) {
            case 'music':
                dataToPost.icon = 'melody';
                break;
            case 'video':
                dataToPost.icon = 'playmini';
                break;
            case 'picture':
                dataToPost.icon = 'picture';
                break;
            case 'text':
                dataToPost.icon = 'text';
                break;
            default:
                dataToPost.icon = 'no type';
        }

        return dataToPost;
    }

    function renderPost(postData) {
        let section = document.getElementById('main');
        const data = parseData(postData);
        let text = data.text;
        const media = createMedia(data);
        if (media) {
            text = data.text.slice(0, 260) + '...';
        }
        const postRate = createRate(data);
        let music = createMusic(data);
        const dom = {
            tagName: 'div',
            classList: ['post', 'd-flex', 'container'],
            id: `post${data.id}`,
            children: [
                {
                    tagName: 'div',
                    classList: ['post__wrapper', 'row'],
                    children: [
                        media,
                        {
                            tagName: 'div',
                            classList: ['post__info', 'col'],
                            children: [
                                {
                                    tagName: 'div',
                                    classList: ['post__type', `post__type-${data.type}`],
                                    children: [
                                        {
                                            tagName: 'object',
                                            classList: ['icon', `icon__${data.icon}`],
                                            attributes: [
                                                {
                                                    data: `./img/atom-icons/a-icon-${data.icon}.svg`,
                                                    type: 'image/svg+xml'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tagName: 'div',
                                    classList: ['post__wrapper', 'd-flex', 'author'],
                                    children: [
                                        {
                                            tagName: 'img',
                                            classList: ['post__userpic', 'author__userpic'],
                                            attributes: [
                                                {
                                                    src: data.pic,
                                                    alt: 'image'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'div',
                                            classList: ['post__wrapper'],
                                            children: [
                                                {
                                                    tagName: 'h3',
                                                    classList: ['post__username', 'author__username', 'head4'],
                                                    innerText: data.author
                                                },
                                                {
                                                    tagName: 'div',
                                                    classList: ['post__data', 'data'],
                                                    children: [
                                                        {
                                                            tagName: 'span',
                                                            classList: ['post__data', 'data'],
                                                            innerText: data.date
                                                        },
                                                        {
                                                            tagName: 'span',
                                                            classList: ['post__data', 'data', 'data-read'],
                                                            innerText: `${data.min} min read`
                                                        },
                                                        {
                                                            tagName: 'span',
                                                            classList: ['post__data', 'data', 'data-comment'],
                                                            children: [
                                                                {
                                                                    tagName: 'a',
                                                                    attributes: [
                                                                        {
                                                                            href: data.href
                                                                        }
                                                                    ],
                                                                    innerText: data.comment
                                                                }
                                                            ]
                                                        },
                                                        postRate
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tagName: 'div',
                                    classList: ['post__wrapper', 'post__wrapper-info'],
                                    children: [
                                        {
                                            tagName: 'h3',
                                            classList: ['post__title', 'head3'],
                                            innerText: data.title
                                        },
                                        music,
                                        {
                                            tagName: 'p',
                                            classList: ['post__paragraph', 'paragraph'],
                                            innerText: text
                                        }
                                    ]
                                },
                                {
                                    tagName: 'button',
                                    classList: ['btn', 'button', 'button__light', 'post__button'],
                                    innerText: `Read ${data.read}`
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        builder(dom, section, data)
    }

    function builder(domNodes, parentNode, data) {
        if (!domNodes) {
            return
        }
        let { tagName, classList, id, attributes, children, innerText } = domNodes;
        let newElement = document.createElement(tagName);
        if (classList) {
            classList.forEach(className => {
                className && newElement.classList.add(className)
            })
        }
        if (id) {
            newElement.id = id;
        }
        if (attributes) {
            attributes && attributes.forEach((attr) => {
                Object.entries(attr).forEach(prop => {
                    newElement.setAttribute(prop[0], prop[1])
                })
            });
        }
        if (innerText) {
            newElement.innerHTML = innerText || data.text;
        } else {
            newElement.innerText = '';
        }
        if (data) {
            if (data.classList && Array.from(newElement.classList).includes(data.criterionClassList)) {

                data.classList.forEach(className => {
                    className && newElement.classList.add(className)
                })
            }
            if (data.identy && Array.from(newElement.classList).includes(data.criterionIdenty)) {
                data.identy.forEach(identy => {
                    newElement.classList.add(identy)
                })
            }
        }
        if (children) {
            children && children.forEach(child => {
                builder(child, newElement, data)
            })
        }
        parentNode.append(newElement)
    }

    function createMedia(data) {
        const videoIcon = createVideoIcon(data);
        const postImage = createImage(data);
        const media = data.type === 'text'
            ? ''
            : {
                tagName: 'div',
                classList: ['post__media', 'col-6'],
                children: [
                    videoIcon,
                    postImage
                ]
            }
        return media;
    }

    function createVideoIcon(data) {
        const videoIcon = data.type !== 'video'
            ? ''
            : {
                tagName: 'button',
                classList: ['post__play'],
                children: [
                    {
                        tagName: 'object',
                        classList: ['icon'],
                        attributes: [
                            {
                                data: './img/atom-icons/a-icon-play.svg',
                                type: 'image/svg+xml'
                            }
                        ]
                    }
                ]
            }
        return videoIcon;
    }

    function createImage(data) {
        const postImage = data.type.toLowerCase() === 'text'
            ? ''
            : {
                tagName: 'img',
                classList: ['post__pic'],
                attributes: [
                    {
                        src: data.image,
                        alt: 'image'
                    }
                ]
            }
        return postImage
    }

    function createRate(data) {
        if (data.rate) {
            const rate = {
                tagName: 'div',
                classList: ['author__rate', 'post__rate'],
                children: []
            }
            if (data.rate) {
                data.rate.forEach(star => {
                    rate.children[rate.children.length] = {
                        tagName: 'object',
                        attributes: [
                            {
                                data: star,
                                type: 'image/svg+xml'
                            }
                        ]
                    }
                });
            } else {
                for (let i = 0; i <= 5; i++) {
                    rate.children[rate.children.length] = {
                        tagName: 'object',
                        attributes: [
                            {
                                data: './img/atom-icons/Star-1.svg',
                                type: 'image/svg+xml'
                            }
                        ]
                    }

                }
            }
            return rate;
        }
    }

    function createMusic(data) {
        const music = data.type !== 'music'
            ? ''
            : {
                tagName: 'audio',
                classList: ['post__audio'],
                attributes: [
                    {
                        controls: '',
                        src: data.music
                    }
                ]
            }
        return music;
    }

    function postButtonClick(e) {
        e.stopPropagation()
        if (e.target.tagName === 'BUTTON') {
            const postId = this.id.slice(4);
            goToPostPage(postId);
        }
    }

    // //search by author's name
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
