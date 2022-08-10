import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema({
    complaint_des:{type:String},
    name:{type:String},
    email:{type:String},
    creator: String,
    action:{type:String},
    citizen:{ type:Boolean,},
    problem:{type:String},
    createdAt: {
        type: String,
       },
    pic:{type:String},
    Date:{
      type: String,
      } ,
    Resolved:{
      type:Boolean,
      default:false,
    }
})
var Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;