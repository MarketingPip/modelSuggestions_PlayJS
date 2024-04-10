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
    const randomItems = [];
    const selectedIndices = new Set();

    // Generate random items until the desired number is reached
    for (let i = 0; randomItems.length < numberOfItems; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex);
            randomItems.push(array[randomIndex]);
        }
    }

    return randomItems;
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
