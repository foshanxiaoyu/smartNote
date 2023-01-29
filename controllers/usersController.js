const { User } = require("../obj/User");
const Note = require("../obj/Note");
const client = require("../config/dbConn");
const collName = client.db("samrtNotes").collection("user");

const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// Get All User list
const getAllUsers = asyncHandler(async (req, res) => {
  //   const users = await client.db("samrtNotes").collection("user").find();
  const users = await collName.find().toArray();
  if (!users) {
    return res.status(400).json({ message: "No users found." });
  }
  res.send(users);
});

// Create new user POST
const createNewUser = asyncHandler(async (req, res) => {
  let newuser = new User();

  console.log("req.body：", req.body);

  newuser.username = req.body.username;
  newuser.password = req.body.password;
  newuser.roles = req.body.roles;
  console.log("newuser：", newuser);
  // confirm data
  if (
    !newuser.username ||
    !newuser.password ||
    !Array.isArray(newuser.roles) ||
    !newuser.roles.length
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check for dupicate
  const dupicate = await client
    .db("samrtNotes")
    .collection("user")
    .find({ username: newuser.username })
    .count();

  console.log("dupicate:", dupicate);
  if (dupicate) {
    return res.status(409).json({ message: "Duuplicate username" });
  }

  // Hash password
  const pwd = await bcrypt.hash(newuser.password, 10);

  // Store new user
  const resoult = await client
    .db("samrtNotes")
    .collection("user")
    .insertOne(newuser);

  if (resoult) {
    res.status(201).json({ message: `New user ${newuser.username} created.` });
  } else {
    res.status(400).json({ message: "Invalid user data received.." });
  }
});

// Update a user PATCH
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  // Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await client.db("samrtNotes").collection("user").find(id);
  if (!user) {
    return res.status(400).json({ message: "Invalid user data received." });
  }

  // Check for dupicate
  const dupicate = await client
    .db("samrtNotes")
    .collection("user")
    .find({ username });

  // Allow update
  if (dupicate && dupicate?._id.toString() != id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  const updatedUser = await user.save();
  res.json({ message: ` ${updatedUser.username} updated.` });
});

// Delete a user delete
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User Id no found" });
  }
  const notes = await client
    .db("samrtNotes")
    .collection("notes")
    .find({ user: id })
    .lean()
    .exec();
  if (notes?.length) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  const user = await client
    .db("samrtNotes")
    .collection("user")
    .findById({ id })
    .exec();
  if (!user) {
    return res.status(400).json({ message: "User no found" });
  }
  const result = await client
    .db("samrtNotes")
    .collection("users")
    .deleteOne({ id });
  const reply = `Username ${result.username} with for ID:${result._id} deleted.`;
  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
