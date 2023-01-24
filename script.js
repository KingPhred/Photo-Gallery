const btnEl = document.getElementById('btn')
const errorMessage = document.getElementById('errorMessage')
const galleryEl = document.getElementById('gallery')

async function fetchImage(){
    const inputValue = document.getElementById('input').value

    if (inputValue > 10 || inputValue < 1) {
        errorMessage.style['display'] = 'block' 
        errorMessage.innerText = 'Number should be between 0 and 11'
        return
    }

    imgs = ''

    try {
        btnEl.style['display'] = 'none'
        const loading = `<img src="/spinner.svg">`
        galleryEl.innerHTML = loading
        await fetch(
            `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=pE7WYATO4AODLK3ZZxotnr8vyv0yByMO1Oi8D3Pv8N8`
        )   .then((res)=>
            res.json().then((data)=>{
            if(data){
                data.forEach(pic => {
                    imgs += `
                    <img src=${pic.urls.small} alt="image"/>
                    `
                    galleryEl.style['display'] = 'block'
                    galleryEl.innerHTML = imgs
                    btnEl.style['display'] = 'block'
                });
            }
            })
        )
        errorMessage.style['display'] = 'none'
    } catch (error) {
        errorMessage.style['display'] = 'block'
        errorMessage.innerText = "An error happened, try again later"
        btnEl.style['display'] = 'block'
        galleryEl.style['display'] = 'none'
    }
    
}

btnEl.addEventListener('click', fetchImage)