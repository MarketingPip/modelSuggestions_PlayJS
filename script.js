export function ModelSuggestions(){

function splitData(originalArray) {
  const resultArrays = [];

  // Iterate through each string in the original array
  originalArray.forEach((str, index) => {
    if (index % 4 === 0) {
      // Start a new group for every 4 items
      resultArrays.push([]);
    }

    // Split the string by the first occurrence of "---"
    const match = str.match(/^(.*?)---(.*)$/);

    if (match) {
      // Extract title and description from the match groups
      const title = match[1].trim();
      const description = match[2].trim();

      // Push an object with title and description to the last array in resultArrays
      resultArrays[resultArrays.length - 1].push({ title, description });
    } else {
      // If no match is found, push the entire string as description
      resultArrays[resultArrays.length - 1].push({ title: '', description: str.trim() });
    }
  });

  return resultArrays;
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
     const fetchModal =  fetchJSON(url)
     return splitData(fetchModal)
    }catch(err){
      throw err
    }
    
  }
  
  
  
  return{
    loadModal
  }
  
  
  
}
