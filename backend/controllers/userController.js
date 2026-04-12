const User = require('../models/User');
const user = require('../models/User');

//Get all users
const getUsers = async (req , res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};


//Create a new user

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try{
    const newUser = await User.create({name , email , password})
  }
  catch(error){
    res.status(400).json({ message: error.message });
  }

}


module.exports = { getUsers , createUser};