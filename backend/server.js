const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Keep if needed, comment out otherwise

dotenv.config();
// connectDB(); // Comment out since stateless API

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/github', require('./routes/githubRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
