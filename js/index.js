
function showPass() {
    let input = event.target.parentNode.nextElementSibling;
    console.log(input)
    input.previousElementSibling.firstElementChild.classList.toggle('show');
    console.log(input.previousElementSibling.firstElementChild.innerText)
    if (input.getAttribute('type') === 'text') {
        input.setAttribute('type', 'password');
        input.previousElementSibling.firstElementChild.innerText = 'show';
    } else {
        input.setAttribute('type', 'text');
        input.previousElementSibling.firstElementChild.innerText = 'Hide';
    }
}

function active() {
    document.getElementById('home').classList = 'header__item active';
}
