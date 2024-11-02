export function ModelSuggestions(){

function splitData(originalArray) {
  const resultArrays = []; // Start with an initial empty array

  // Iterate through each string in the original array
  originalArray.forEach((str) => {
    // Find the index of the first occurrence of "---"
    const delimiterIndex = str.indexOf("---");

    if (delimiterIndex !== -1) {
      // Split the string into title and description using the delimiter index
      const title = str.substring(0, delimiterIndex).trim();
      const description = str.substring(delimiterIndex + 3).trim(); // +3 to skip past "---"

      // Push an object with title and description to the resultArrays
      resultArrays.push({ title, description });
    } 
  });

  return resultArrays;
}

function pickRandomItems(array, numberOfItems = 1) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error('Input must be a non-empty array.');
    }

    if (numberOfItems <= 0) {
        return [];
    }

        // If numberOfItems exceeds array length, set it to array length
    if (numberOfItems >= array.length) {
        numberOfItems = array.length;
    }


    
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    // Return the first numberOfItems elements
    return array.slice(0, numberOfItems);
}


  
 
  async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        return json;
    } catch (error) {
        throw error;
    }
}

  
  async function loadModal(url){
     const fetchModal =  await fetchJSON(url)
     return splitData(fetchModal)  
  }
  
  
  return{
    loadModal,
    pickSuggestions:pickRandomItems
  }
  
  
  
}
