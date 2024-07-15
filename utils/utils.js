function formateorun(number) {
    let numStr = number.toString();
    let formattedStr = `${numStr.slice(0, 2)}.${numStr.slice(2, 5)}.${numStr.slice(5, numStr.length - 1)}-${numStr.slice(numStr.length - 1)}`;
    return formattedStr;
  };
  
module.exports = formateorun;