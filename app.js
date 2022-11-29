console.log("Let's get this party started!");

const form = document.querySelector('form')
const text = document.querySelector('input')
const imgBox = document.querySelector('.gif_window')
const deleteBtn = document.querySelector('.delete')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchItem = text.value
    text.value = ''
    addImage(searchItem)
})

deleteBtn.addEventListener('click', () => {
    imgBox.removeChild(imgBox.lastChild)
})

async function getGif(prompt){
    try{
        const res = await axios.get("http://api.giphy.com/v1/gifs/search", 
        { params: {
            q : prompt,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }}
        )
        return res.data.data[randomIndex()].embed_url
    }catch(e){
        return 
    }
}

async function addImage(prompt) {
    const newImage = document.createElement('iframe')
    const url = await getGif(prompt)
    if (url){
        newImage.setAttribute('src', url)
        newImage.setAttribute('height', 150)
        imgBox.append(newImage)
    }
} 

function randomIndex(){
    return Math.floor(Math.random() * 50)
}
