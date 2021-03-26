// DOM elements
const input = document.querySelector('#shortly-input');
const button = document.querySelector('#shortly-btn');
const errorMes = document.querySelector('.input-section--error');
const inputSection = document.querySelector('.input-section');

// Spinner SVG HTML
const svg = 'a<svg height="40" width="40" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);"><circle cx="20" cy="20" r="15" /></svg>'


// Data array
let localDataArr = [];

// Event listener
button.addEventListener('click', function(){
    // Form validation
    if(!input.value){
        input.classList.add('error');
        errorMes.style.display = 'block';
        return;
    }
    // If form was entered correctly - remove errors, get input value, load spinner, make API call
    input.classList.remove('error');
    errorMes.style.display = 'none';
    let domain = input.value;
    button.textContent = '';
    button.insertAdjacentHTML('afterbegin', svg)
    fetchLink(domain);
    input.value = '';
});


// Async API call function
const fetchLink = async function(domain) {

    // Initialise empty object where data will be stored once fetched
    const localData = {
        domain: '',
        shortLink: ''
    };

    // Make API call
    let data = await fetch(`https://api.shrtco.de/v2/shorten?url=${domain}`);
    let parsedData = await data.json();
    let shortlink = parsedData.result.full_short_link;

    // Call a generate HTML function that takes the domain and shortlink as arguments
    let html = generateHtml(domain, shortlink);
    // Load HTML onto DOM and remove spinner SVG
    inputSection.insertAdjacentHTML('afterend', html);
    button.textContent = 'Shorten it!';

    // Add domain and generated short link to 'localData' object and push into global array
    localData.domain = domain;
    localData.shortLink = shortlink;
    localDataArr.push(localData);
    // Save array in local storage
    localStorage.setItem('data', JSON.stringify(localDataArr));
}

// Generate HTML from data function
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

// Copy to clipborad functions
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


// On page load
function init() {
    // Load items from local storage and save in localDataArr
    let storage = localStorage.getItem('data');
    if(storage) localDataArr = JSON.parse(storage);
    
    // Load the objects from localDataArr onto the DOM
    for(let i=0; i<localDataArr.length; i++) {
        let domain = localDataArr[i].domain;
        let shortLink = localDataArr[i].shortLink;

        let html = generateHtml(domain, shortLink);
        inputSection.insertAdjacentHTML('afterend', html);
    }
}

init();

// Mobile nav

const burgerMenu = document.querySelector('.navigation_mobile');
const purpleBg = document.querySelector('.purple_bg');
const mobileUl = document.querySelectorAll('.mobile_ul');
let isClicked = false;

burgerMenu.addEventListener('click', function(){
    purpleBg.classList.toggle('heightjs');
    if(!isClicked) {
        setTimeout(function(){ 
            for(let i=0; i<mobileUl.length; i++){
                mobileUl[i].classList.toggle('displayjs');
            }
         }, 400);
         isClicked = true;
    } else {
        for(let i=0; i<mobileUl.length; i++){
            mobileUl[i].classList.toggle('displayjs');
        }
        isClicked = false;
    }


})