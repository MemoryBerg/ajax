const urlPost = 'http://localhost:3000/api/create-article';
const data = [
    {
        tagName: 'label',
        title: 'Type of post',
        classValue: 'add__label',
        children: [
            {
                tagName: 'select',
                classValue: 'add__type',
                attributes: [
                    {
                        name: 'type',
                        id: 'postType'
                    }
                ],
                children: [
                    {
                        tagName: 'option',
                        title: ''
                    },
                    {
                        tagName: 'option',
                        title: 'Video'
                    },
                    {
                        tagName: 'option',
                        title: 'Text'
                    },
                    {
                        tagName: 'option',
                        title: 'Audio'
                    },
                    {
                        tagName: 'option',
                        title: 'Picture'
                    }
                ]
            }
        ]
    },
    {
        tagName: 'label',
        title: `Enter image's link`,
        classValue: 'add__label',
        attributes: [
            {
                for: 'postImg'
            }
        ]
    },
    {
        tagName: 'input',
        classValue: 'add__img add__input',
        attributes: [
            {
                name: 'image',
                type: 'text',
                id: 'postImg'
            }
        ]
    },
    {
        tagName: 'label',
        title: 'Title',
        classValue: 'add__label',
        attributes: [
            {
                for: 'postTitle',
                id: 'labelTitle'
            }
        ]
    },
    {
        tagName: 'input',
        classValue: 'add__title add__input',
        attributes: [
            {
                name: 'title',
                type: 'text',
                id: 'postTitle'
            }
        ]
    },
    {
        tagName: 'label',
        title: 'Author',
        classValue: 'add__label',
        attributes: [
            {
                for: 'postAuthor'
            }
        ]
    },
    {
        tagName: 'input',
        classValue: 'add__author add__input',
        attributes: [
            {
                name: 'author',
                type: 'text',
                id: 'postAuthor'
            }
        ]
    },
    {
        tagName: 'label',
        title: 'Author',
        classValue: 'add__label',
        attributes: [
            {
                for: 'postDate'
            }
        ]
    },
    {
        tagName: 'input',
        classValue: 'add__date add__input',
        attributes: [
            {
                type: 'date',
                id: 'postDate'
            }
        ]
    },
    {
        tagName: 'label',
        title: 'Post',
        classValue: 'add__label',
        attributes: [
            {
                for: 'postBody'
            }
        ]
    },
    {
        tagName: 'textarea',
        classValue: 'add__desc add__input',
        attributes: [
            {
                name: 'post',
                rows: 20,
                type: 'text',
                id: 'postBody'
            }
        ]
    },
    {
        tagName: 'label',
        title: 'Quote',
        classValue: 'add__label',
        attributes: [
            {
                for: 'postQuote'
            }
        ]
    },
    {
        tagName: 'textarea',
        classValue: 'add__quote add__input',
        attributes: [
            {
                name: 'quote',
                rows: 5,
                type: 'text',
                id: 'postQuote'
            }
        ]
    },
    {
        tagName: 'div',
        classValue: 'add__wrapper',
        children: [{
            tagName: 'button',
            title: 'Add',
            classValue: 'add__button btn button button__dark',
            attributes: [
                {
                    id: 'postButton',
                    disabled: ''
                }
            ]
        },
        {
            tagName: 'button',
            title: 'Reset',
            classValue: 'add__button btn button button__dark',
            attributes: [
                {
                    type: 'reset',
                    id: 'resetButton',
                }
            ]
        }
        ]
    }
];

const addButton = document.getElementById('add-post');
const header = document.getElementById('header');
let lastPostId = 0;

let formWrapper = document.createElement('div');
formWrapper.classList = 'add';
formWrapper.setAttribute('id', 'add');
formWrapper.style.display = 'none';
let formPost = document.createElement('form');
formPost.setAttribute('id', 'form')
formPost.classList = 'add__form';

let closeButton = document.createElement('button');
closeButton.classList = 'add__close';
closeButton.setAttribute('id', 'postClose');
addButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm)

renderFormNewPost(data, formPost)

function render(args, parent) {
    let newElement = document.createElement(args.tagName);

    if (args.classValue) {
        newElement.classList = args.classValue;
    }
    if (args.title) {
        newElement.innerText = args.title
    }
    if (args.attributes) {
        Object.entries(args.attributes).forEach(item => {
            const attrs = item[1];
            for (const [key, value] of Object.entries(attrs)) {
                newElement.setAttribute(key, value)
            }
        })
    }
    if (args.children) {
        const children = args.children;
        children.forEach(child => render(child, newElement))
    }
    parent.appendChild(newElement);
    return newElement;
}


function renderFormNewPost(array, parentNode) {
    let formHeader = document.createElement('div');
    formHeader.innerText = 'New Post';
    formHeader.classList = 'add__post head2';
    formWrapper.append(formHeader, formPost, closeButton);
    header.append(formWrapper);
    array.forEach(el => render(el, parentNode));
    const title = document.getElementById('postTitle');
    title.addEventListener('blur', validateTitle.bind(title));
    document.getElementById('form').addEventListener('submit', getPostInfo.bind(parentNode))
}

let postInfo = {};

function getPostInfo() {
    event.preventDefault();
    postInfo = {
        type: event.target.postType.value,
        author: event.target.postAuthor.value,
        image: event.target.postImg.value,
        post: event.target.postBody.value,
        quote: event.target.postQuote.value,
        title: event.target.postTitle.value
    }

    const months = {
        01: 'jan',
        02: 'feb',
        03: 'mar',
        04: 'apr',
        05: 'may',
        06: 'june',
        07: 'july',
        08: 'aug',
        09: 'sept',
        10: 'oct',
        11: 'nov',
        12: 'dec'
    }
    let date = event.target.postDate.value;
    const day = date.slice(-2);
    const month = +date.slice(5, 7);
    const year = date.slice(0, 4);
    let postDate = day + ' ' + months[month] + ', ' + year;

    if (!date) {
        date = new Date();
        postDate = date.toLocaleString('en-Gb', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).toLowerCase();
        postDate = postDate.replace(new RegExp(' 2'), ',' + ' 2');
    }

    postInfo.postDate = postDate;
    sendPostToServer(JSON.stringify(postInfo))
}

function sendPostToServer(body) {
    fetch(urlPost, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: body
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(res => console.log(res.message));
            } else {
                return response.json();
            }
        })
        .then(res => {
            lastPostId = res[res.length - 1].id;
            goToPostPage(lastPostId);
        })
}

function goToPostPage(postId) {
    const currentLocation = location.href;
    const positionTochange = currentLocation.lastIndexOf('/');
    let newLocation = currentLocation.slice(0, positionTochange + 1) + 'post.html#' + postId;
    location = newLocation;

}
function validateTitle() {
    const title = document.getElementById('postTitle');
    const titleRegExp = /^(\w*\s*[ ,!:?.-]*)*$/ug;
    let postButton = document.getElementById('postButton');
    if (!postButton.getAttribute('disabled')) {
        postButton.setAttribute('disabled', '');
    }
    if (title.value.length > 0) {
        const a = title.value[0].toUpperCase();
        const b = title.value[0];

        if (a !== b || !b.match(/[a-z]/i)) {
            showErrorMessage('Title must start with an uppercase letter', 'labelTitle');
        } else if (!title.value) {
            showErrorMessage(`Can't be blank`, 'labelTitle');
        } else if (title.value.length < 2) {
            showErrorMessage(`Too short. Title length must be more than 2 characters`, 'labelTitle');
        } else if (title.value.length > 19) {
            showErrorMessage(`Too long. Title length must be less than 20 characters`, 'labelTitle');
        } else if (!titleRegExp.test(title.value)) {
            showErrorMessage(`Title can contain letters and special characters including space: [ !:-?.,]`, 'labelTitle');
        } else {
            postButton.removeAttribute('disabled', '');
        }
        title.addEventListener('focus', deleteErrorMessage)
    }
}

function showErrorMessage(errorMessage, parentId) {
    const checkError = document.getElementById('shownError');
    if (checkError) {
        checkError.remove();
    }

    let parentElement = document.getElementById(parentId);
    let errorElement = document.createElement('div');
    errorElement.innerText = errorMessage;
    errorElement.style.color = 'red';
    errorElement.setAttribute('id', 'shownError')
    parentElement.prepend(errorElement);
}

function deleteErrorMessage() {
    let errorElement = document.getElementById('shownError');
    if (errorElement) {
        errorElement.remove();
    }
}

function closeForm() {
    if (event.target === closeButton) {
        formWrapper.style.display = 'none';
    }
}

function openForm() {
    formWrapper.style.display = 'block';
}