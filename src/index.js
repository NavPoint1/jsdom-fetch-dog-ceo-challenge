console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
let breedData = {};

document.addEventListener('DOMContentLoaded', () => {
    fetch(imgUrl)
        .then(response => response.json())
        .then(imageData => addPixToDOM(imageData.message));

    fetch(breedUrl)
        .then(response => response.json())
        .then(breedData => addBreedsToUl(breedData.message));

    document.querySelector('#breed-dropdown').addEventListener("change", filterResults);
});

function addPixToDOM(imagesJSON) {
    imagesJSON.forEach(breedURL => renderPic(breedURL));
}

function renderPic(breedURL) {
    let img = document.createElement('img');
    img.src = breedURL;
    document.querySelector('#dog-image-container').appendChild(img);
}

function addBreedsToUl(breedsJSON) {
    breedData = breedsJSON;
    renderBreeds(breedsJSON);
}

function renderBreeds(breedsJSON) {
    let mommaUl = document.querySelector('#dog-breeds');
    for(const breed in breedsJSON) {
        let li = renderBreed(breed, mommaUl);
        if(breedsJSON[breed] != []) {
            let babyUl = document.createElement('ul');
            li.appendChild(babyUl);
            breedsJSON[breed].forEach(subBreed => renderBreed(subBreed, babyUl));
        }
    }
}

function renderBreed(breed, ul) {
    let li = document.createElement('ul');
    li.innerText = breed;
    ul.appendChild(li);
    li.addEventListener("click", () => {
        changeColor(li);
    });
    return li;
}

function changeColor(li) {
    li.style.color == "red" ? li.style.color = "black" : li.style.color = "red";
}

function filterResults() {
    filterValue = document.querySelector('#breed-dropdown').value;
    let mommaUl = document.querySelector('#dog-breeds');
    mommaUl.innerHTML = "";

    filteredBreeds = {...breedData};
    for(const breed in filteredBreeds) {
        if(breed[0] != filterValue) {
            delete filteredBreeds[breed];
        }
    }
    renderBreeds(filteredBreeds);
}