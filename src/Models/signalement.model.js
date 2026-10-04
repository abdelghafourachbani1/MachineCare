import mongoose, { Schema } from "mongoose";
import machine from "./machine.model.js";

let signalementshema = new mongoose.Schema({
    machine : {type : Schema.Types.ObjectId , ref : 'machine' , required : [true,'cette feild est required']},
    description : {type : String , required : [true,'description est obligatiore']},
    status : {type : String ,enum:['ouvert', 'en cours', 'résolu'],default :'ouvert'},
    resolutionNote : {type :String , default : null},
    resolutionDate : {type : Date , default : null}
},
{
    timestamps : true
});

export default mongoose.model('signalement',signalementshema)