```js
import {ModelSuggestions} from 'https://cdn.jsdelivr.net/gh/MarketingPip/modelSuggestions_PlayJS@master/script2.js';

const modal = await ModelSuggestions().loadModal(`https://cdn.jsdelivr.net/gh/MarketingPip/modelSuggestions_PlayJS@master/instructions.min.json`)


function pickRandomItem(array) {
    // Generate a random index within the bounds of the array length
    const randomIndex = Math.floor(Math.random() * array.length);

    // Return the item at the random index
    return array[randomIndex];
}

let btn = document.getElementById("btn");
btn.addEventListener("click", (event) => {
  console.log(pickRandomItem(modal))
});


```
