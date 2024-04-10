```js

import {ModelSuggestions} from 'https://cdn.jsdelivr.net/gh/MarketingPip/modelSuggestions_PlayJS@master/script3.js';

const getSuggestions = ModelSuggestions()

const modal = await getSuggestions.loadModal(`https://cdn.jsdelivr.net/gh/MarketingPip/modelSuggestions_PlayJS@master/instructions.min.json`)


///

let btn = document.getElementById("btn");
btn.addEventListener("click", (event) => {
 // console.log(pickRandomItem(modal))
  console.log(modal)
  console.log(getSuggestions.pickSuggestions(modal,4))
});

```
