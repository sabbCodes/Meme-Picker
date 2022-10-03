import catsData from "./data.js"

const wrapper = document.getElementById("wrapper")
const imgBtn = document.getElementById("img-btn")
const gifOnly = document.getElementById("gif-only")
const modal = document.getElementById("modal")


wrapper.addEventListener("change", showSelectedObject)
imgBtn.addEventListener("click", displayFinalEmotion)

function findMatchingEmotionsArray(){
    //we want to run this code only "if" user selects an emotion
    if (document.querySelector("input[type='radio']:checked")){
        //save the value of the selected emotion
        const intendedEmotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gifOnly.checked
        
        //filtering the emotionTags to get just the selected emotions
        const matchingEmotionsArray = catsData.filter(function(cat){
            //we want to check whether the user wants only GIF images
            if (isGif){
                return cat.emotionTags.includes(intendedEmotion) && cat.isGif
            } //else we just return random meme
            else{
                return cat.emotionTags.includes(intendedEmotion)
            }
        })

        return matchingEmotionsArray
    }
}

function findOneMatchingEmotion(){
    //grad the array returned by the above function
    const emotionArray = findMatchingEmotionsArray()

    //check if it's just returning an object
    if (emotionArray.length === 1){
        return emotionArray[0]
    }//if it returns more than an object, we want to grab one at random
    else{
        const randNum = Math.floor( Math.random() * emotionArray.length )

        return emotionArray[randNum]
    }
}

function displayFinalEmotion(){
    //grab the single emotion returned
    const emotion = findOneMatchingEmotion()

    //set its html
    modal.innerHTML = `
        <div class="popup" id="popup">
            <img src="./${emotion.image}" alt="${emotion.alt}">
        </div>
    `

    //pop it up
    modal.style.display = "block"
}

function showSelectedObject(e){
    //take hold of all the radio options
    const options = document.getElementsByClassName("options")

    //remove selected sign from previous selected items 
    for (let option of options){
        option.classList.remove("selected")
    }

    document.getElementById(e.target.value).parentElement.classList.add("selected")
}

function getCatsEmotions(cats){
    // save the emotions to an array
    const emotionsArr = []

    //iterate over catsData to grab every emotions
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            //make sure an emotion doesn't appear more than once
            if (!emotionsArr.includes(emotion)){
                emotionsArr.push(emotion)
            }
        }
    }

    return emotionsArr
}

function displayEmotins(){
    //concatenate the html in a const
    let emotionStuff = ""
    const emotions = getCatsEmotions(catsData)

    //loop over the returned array and add the html
    for (let emotion of emotions){
        emotionStuff += `
        <div class="options" id="options">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" value="${emotion}" name="radio">
        </div>
        `
    }

    wrapper.innerHTML +=  emotionStuff
}

modal.addEventListener("click", () => modal.style.display = "none")
displayEmotins()