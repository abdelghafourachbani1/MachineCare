import mongoose, { mongo } from "mongoose";

const machinschema = new mongoose.Schema({
    name : {type : String , required: [true,'machine name requied']},
    serialNumber: {type: String,required: [true, 'serial number required'],unique: true,trim: true},
    status: {type: String,enum: ['Operational', 'Under Maintenance', 'Broken'],default: 'Operational'},
    location: {type: String,required: [true, 'factory location is required'],trim: true}
},{timestamps: true}
);

const machine = mongoose.model('machine',machinschema);
export default machine