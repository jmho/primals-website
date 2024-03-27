const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import cors package

const app = express();
const PORT = 4000; // Use a different port from the React development server

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Route to save JSON data
// Route to save JSON data
app.post('/save', (req, res) => {
  const jsonData = req.body;
  
  try {
    let existingData = []; // Initialize as an empty array
    
    // Check if data.json exists and read its content. If not, use an empty array
    if (fs.existsSync('data.json')) {
      const fileContent = fs.readFileSync('data.json', 'utf8');
      existingData = JSON.parse(fileContent);
    }

    if (!Array.isArray(existingData)) { // Make sure it's an array
      console.warn('Existing data.json is not an array, initializing to an empty array.');
      existingData = [];
    }
    
    // Find the index of the existing entry for the current page
    const existingIndex = existingData.findIndex(entry => entry.page === jsonData.page);

    if (existingIndex !== -1) {
      // Update the existing entry
      existingData[existingIndex] = jsonData;
    } else {
      // Add a new entry
      existingData.push(jsonData);
    }

    // Write the updated array back to data.json
    fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
    
    console.log('Data saved successfully:', jsonData);
    res.send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

// Route to retrieve JSON data
app.get('/data', (req, res) => {
  try {
    // Read JSON data from the file
    const jsonData = JSON.parse(fs.readFileSync('data.json'));
    res.json(jsonData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});

// Route to retrieve data by ID (pageID)
app.get('/getByID/:pageID', (req, res) => {
  const pageID = parseInt(req.params.pageID);
  try {
    const jsonData = JSON.parse(fs.readFileSync('data.json'));
    const dataByID = jsonData.find(entry => entry.page === pageID);
    if (dataByID) {
      res.json(dataByID);
    } else {
      res.status(404).send('Data not found for the specified ID');
    }
    console.log(res);
  } catch (error) {
    console.error('Error retrieving data by ID:', error);
    res.status(500).send('Error retrieving data by ID');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
