    import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {type: String,required: [true, 'L\'adresse e-mail est obligatoire.'],unique: true,lowercase: true,trim: true},
    password: {type: String,required: [true, 'Le mot de passe est obligatoire.'],minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères.']}}, {
    timestamps: true 
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('user',userSchema);