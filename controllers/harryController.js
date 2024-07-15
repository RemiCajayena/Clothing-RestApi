const fetch = require('node-fetch');

exports.fetchData = async (req, res) => {   
    try {
        const response = await fetch('http://207.231.108.32:8009/api/registro');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // Aquí puedes procesar los datos como necesites
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
}