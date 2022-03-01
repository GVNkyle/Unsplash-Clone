const access_key = 'iUU_CmKEP5f6Ngs-S_5rMRMSjd6JRFRGijeGNHhZvVw';
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const gallerry = document.querySelector('.gallery');
let popup = document.querySelector('.image-popup');
const downloadBtn = document.querySelector('.download-btn');
const closeBtn = document.querySelector('.close-btn');
const largeImage = document.querySelector('.large-img');
let currentImage = 0;
let allImages;
const preBtns = document.querySelector('.pre-btn');
const nxtBtns = document.querySelector('.nxt-btn');
let searchParam = location.search.split('=').pop(); // this will give extract the search keyword from URL
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`; // this is search image URL


const getImages = () => {
    fetch(random_photo_url)
        .then(response => response.json())
        .then(data => {
            allImages = data;
            displayImages(allImages);
        });
};

const searchImages = () => {
    fetch(search_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        displayImages(allImages);
    });
}

const displayImages = (images) => {
    // popup.classList.add('hide');
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.urls.regular;
        img.alt = image.alt_description;
        img.className = 'gallery-img'
        gallerry.appendChild(img);

        img.addEventListener('click', () => {
            currentImage = index;
            showPopup(image);
        })
    });
};

const showPopup = (image) => {
    popup.classList.add('show');
    downloadBtn.href = image.links.html;
    largeImage.src = image.urls.regular;

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
    })

};

preBtns.addEventListener('click', () => {
    if (currentImage > 0) {
        currentImage--;
        showPopup(allImages[currentImage]);
    }
})

nxtBtns.addEventListener('click', () => {
    if (currentImage < allImages.length - 1) {
        currentImage++;
        showPopup(allImages[currentImage]);
    }
})

if(searchParam == ''){
    getImages();
} else{
    searchImages();
}

