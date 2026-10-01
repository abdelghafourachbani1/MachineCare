import mongoose from 'mongoose';

const connectdb = async () => {
    try {
        let cnct = await mongoose.connect(process.env.MONGO_URI);
        console.log(`${cnct.conection.host}`);
    }catch(error) {
        console.error(`database error ${error.message}`);
        process.exit(1);
    }
};

export default connectdb;