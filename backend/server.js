const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formDataDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a Mongoose schema and model
const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  street: String,
  city: String,
  state: String,
  zipCode: String,
  cardNumber: String,
  expiryDate: String,
  cvv: String,
  cardHolderName: String,
});

const FormData = mongoose.model('FormData', formSchema);

// Route to handle form submissions
app.post('/submit', async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Route to fetch all form data
app.get('/form-data', async (req, res) => {
  try {
    const formData = await FormData.find();
    res.status(200).json(formData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Route to edit form data by ID
app.put('/form-data/:id', async (req, res) => {
  try {
    const updatedData = await FormData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data updated successfully!', updatedData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update data' });
  }
});

// Route to delete form data by ID
app.delete('/form-data/:id', async (req, res) => {
  try {
    const deletedData = await FormData.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
