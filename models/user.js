const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  roomId: {
    type: String,
  },
  isActive: { type: Boolean },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  isAuthenticated: { type: Boolean },
  billPaid: { type: Boolean },
  totalBill: { type: Number, default: 0 },
  accountType: {
    type: String,
    enum: ["STUDENT", "WORKER", "ADMIN"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = this.password;
  }
  next();
});

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { id: this._id, name: this.name },
    process.env.SECRET_KEY
  );
  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

module.exports = mongoose.model("User", userSchema);
