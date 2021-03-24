const input = document.querySelector('#shortly-input');
const button = document.querySelector('#shortly-btn');
const errorMes = document.querySelector('.input-section--error');

const inputSection = document.querySelector('.input-section');

const svg = 'a<svg height="40" width="40" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);"><circle cx="20" cy="20" r="15" /></svg>'

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
    button.textContent = '';
    button.insertAdjacentHTML('afterbegin', svg)
    fetchLink(domain);
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


const fetchLink = async function(domain) {
    let data = await fetch(`https://api.shrtco.de/v2/shorten?url=${domain}`);
    let parsedData = await data.json();
    let shortlink = parsedData.result.full_short_link;

    // Call a generate HTML function that takes the domain and shortlink as arguments
    let html = generateHtml(domain, shortlink);
    inputSection.insertAdjacentHTML('afterend', html);
    button.textContent = 'Shorten it!';
}

function generateHtml(domain, shortlink) {
    return `
        <div class="short-link">
            <h4 class="short-link--domain">${domain}</h4>
            <div>
                <h4 class="short-link--shorted">${shortlink}</h4>
                <a class="btn short-link--button" onclick="copyToClipboard(this)">Copy</a>
            </div>
        </div>
    `
}
