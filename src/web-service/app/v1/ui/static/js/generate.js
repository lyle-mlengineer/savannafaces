const API_KEY = 'vk-CD2KSDwkRTpKjZ2x36bPsYqnWOv4soF5Fg2s6BIjkYEBLkF'; // Paste your API Key
const API_URL = 'https://api.vyro.ai/v2/image/generations';

const imageContainer = document.getElementById('imageContainer');
const imageResultElement = document.getElementById('imageResult');

// SHOW MENU
const showMenu = (toggleId, navbarId,bodyId) =>{
    const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId)

    if(toggle && navbar){
        toggle.addEventListener('click', ()=>{
            // APARECER MENU
            navbar.classList.toggle('show')
            // ROTATE TOGGLE
            toggle.classList.toggle('rotate')
            // PADDING BODY
            bodypadding.classList.toggle('expander')
        })
    }
}
showMenu('nav-toggle','navbar','body')

// LINK ACTIVE COLOR
const linkColor = document.querySelectorAll('.nav__link');   
function colorLink(){
    linkColor.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
}

linkColor.forEach(l => l.addEventListener('click', colorLink));

/*=============== DROPDOWN JS ===============*/
const showDropdown = (content, button) =>{
   const dropdownContent = document.getElementById(content),
         dropdownButton = document.getElementById(button)

   dropdownButton.addEventListener('click', () =>{
      // We add the show-dropdown class, so that the menu is displayed
      dropdownContent.classList.toggle('show-dropdown')
   })
}

showDropdown('dropdown-content','dropdown-button')

// Function to generate the image
function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    const style = document.getElementById('styleSelect').value;
    const ratio = document.getElementById('ratioSelect').value;

    const formData = {
        prompt: prompt,
        style: 'anime',
        ratio: ratio
    };
    setErrorState(false);
    setLoadingState(true);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);

    const myFormData = new FormData();
    myFormData.append('prompt', prompt);
    myFormData.append('style', style);
    myFormData.append('aspect_ratio', ratio);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: myFormData,
        redirect: 'follow'
    };

    fetch("https://api.vyro.ai/v2/image/generations", requestOptions)
        .then(response => response.blob())
        .then(blob => {
            // Create a local URL of that image
            const imageObjectURL = URL.createObjectURL(blob);
            imageResultElement.src = imageObjectURL;
        })
        .catch(error => {
            console.log('error', error);
            setErrorState(true);
        })
        .finally(() => {
            setLoadingState(false);
        });
}

function setLoadingState(isLoading) {
    if (isLoading) {
        imageResultElement.style.display = 'none';
        imageContainer.classList.add('loading');
    } else {
        imageResultElement.style.display = 'block';
        imageContainer.classList.remove('loading');
    }
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = imageResultElement.src;
    link.click();

}

function setErrorState(isError) {
    if (isError) {
        imageResultElement.style.display = 'none';
        imageContainer.classList.add('error');
    } else {
        imageResultElement.style.display = 'block';
        imageContainer.classList.remove('error');
    }
}
