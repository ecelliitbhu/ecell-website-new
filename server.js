const express = require('express');
const app = express();
const dotenv = require('dotenv'); 
// Require routes
const routeFirst = require('./pages/api/CampusAmbass/routefirst.js');




dotenv.config(); 
const PORT = process.env.PORT || 3000;
app.use(express.json());


// Use the defined routes
app.use('/campusambassador',routeFirst);




// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
