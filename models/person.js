const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true
  },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  salary: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// ✅ PRE-SAVE HOOK (FIXED)
personSchema.pre('save', async function () {
  // Only hash if password is new or modified
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ✅ PASSWORD COMPARISON
personSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
