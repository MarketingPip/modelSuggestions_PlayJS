export function ModelSuggestions(){

function splitData(originalArray) {
  const resultArrays = []; // Start with an initial empty array

  // Iterate through each string in the original array
  originalArray.forEach((str, index) => {
    // Split the string by the first occurrence of "---"
    const match = str.match(/^(.*?)---(.*)$/);

    if (match) {
      // Extract title and description from the match groups
      const title = match[1].trim();
      const description = match[2].trim();

      // Push an object with title and description to the last array in resultArrays
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
        // Handle errors here
        //console.error('Error fetching JSON:', error.message);
        throw error;
    }
}

  
  async function loadModal(url){
    
    try{
     const fetchModal =  await fetchJSON(url)
     return splitData(fetchModal)
    }catch(err){
      throw err
    }
    
  }
  
  
  
  return{
    loadModal,
    pickSuggestions:pickRandomItems
  }
  
  
  
}
