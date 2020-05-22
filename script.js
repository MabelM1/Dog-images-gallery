const URL = 'https://dog.ceo/api/breed'

//DOM Elements
const searchButton = document.querySelector('.header__button')
const dogGalleryContainer = document.querySelector('.dog-gallery')
//searchForm
const searchForm = document.forms.search
const searchInput = searchForm.elements.searchInput

const fetchData = async (url,search) => {
   const endpoint = `${url}/${search}/images`
  try {
      const response = await fetch(endpoint)
      const data = await response.json()
      return data.message
  } catch (error) {
     throw(error)
  }
}

//TEMPLATE FOR CREATING ONE DOG IMAGE CARD
const createDogCard = (dogImage,container) => {
   const imgDiv =  document.createElement("div");
   imgDiv.style.backgroundImage = `url('${dogImage}')`
   imgDiv.style.backgroundSize = "cover"
   imgDiv.style.backgroundPosition = "center center"
   imgDiv.classList.add("dog-gallery__image");
   container.append(imgDiv)
}

//REDER MULTIPLE IMAGE CARDS
const populateGallery = dogsImageArray => {
    dogsImageArray.forEach(dogImage => createDogCard(dogImage,dogGalleryContainer))
}

const validateInput = (input) => {
    const trimmedInput = input.trim()

    if (trimmedInput.length === 0) {
        return false
    }
    return true
}

//ERROR ALERT COMPONENT
const alertNotification = type => {
  const message = type === 'info' ? `Enter valid input. Try again`:
    `Sorry, couldn't find that breed. Try again`      

  const notification = `
    <div class="notification notification_type_${type}">
      <p class="notification__text">${message}</p>
    </div>`
    dogGalleryContainer.insertAdjacentHTML('afterbegin',notification)  
}

const clearNotification  = () => {
    dogGalleryContainer.innerHTML = ''
}

const handleSearch = async (e) => {
    e.preventDefault()

    //CLEAR PREVIOUS ITEMS/ALERTS
    clearNotification()

    const searchValue = searchInput.value
    const valid = validateInput(searchValue)

    if (!valid) {
      return alertNotification('info')
    }

    try {
        const dogsArray = await fetchData(URL,searchValue)

        populateGallery(dogsArray.slice(0,9))
    } catch (error) {
        return alertNotification('error')
    }
 }

searchButton.addEventListener('click', handleSearch)