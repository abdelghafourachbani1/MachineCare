import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userSchema.methods.matchPassword = async function (entredPassword) {
    return await bcrypt.compare(entredPassword,this.password);
}

export default mongoose.model('User', userSchema);