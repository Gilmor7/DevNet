// function that gets a string as a paremeter and return a capitilized version of the string 
// (capitalize every word if the string is a sentence)
const capitalize = str => {
    const wordsArr = str.trim().split(' ');

    //check if the string contains one word 
    if (wordsArr.length === 1) return wordsArr[0].charAt(0).toUpperCase() + wordsArr[0].slice(1);

    else {
        return wordsArr
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}



export default capitalize;