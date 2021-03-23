const input = document.querySelector('#shortly-input');
const button = document.querySelector('#shortly-btn');
const errorMes = document.querySelector('.input-section--error');

button.addEventListener('click', function(){
    // Form validation
    if(!input.value){
        input.classList.add('error');
        errorMes.style.display = 'block';
        return;
    }
    input.classList.remove('error');
    errorMes.style.display = 'none';
    let domain = input.value;
    input.value = '';
});

function copyToClipboard(e) {
    // Save the text content of the previous element to a variable and pass into sepearte function
    let copied = e.previousSibling.previousSibling.textContent;
    textToClipboard(copied);

    // Add 'copied' styles to button
    e.textContent = 'Copied!';
    e.style.backgroundColor = '#3b3054';
}

function textToClipboard (copied) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = copied;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

let res = '';
let data = '';

fetch('https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html')
        .then(res => res.json())
        .then(data => console.log(data.result.full_short_link));