import express from "express";
import mongoose from "mongoose";

import moment from "moment";
import Complaint from "../models/complaint.js";


export const createComplaint = async (req, res) => {
  const { name, email, action, citizen,complaint_des,problem,pic } = req.body;
  console.log(req.body);

  const newCp = new Complaint({
    name: name,
    email: email,
    action: action,
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    citizen: citizen,
    complaint_des:complaint_des,
    problem:problem,
    pic:pic
   
  });

  try {
    await newCp.save();
    res.status(201).json(newCp);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const getComplaints = async (req, res) => {
  try {
    const Cp = await Complaint.find().sort({Date:-1});
    res.status(200).json(Cp);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteComplaint=async(request,response)=>{
    try{
        await Complaint.deleteOne({_id:request.params.id});
        response.status(201).json("User Deleted Successfully");
    }catch(error){
        response.status(409).json({message:error.message});
    }
}

export const updateComplaint = async (req, res) => {
  const cmp = req.body;
  const { id } = req.params;
  const { name, email, problem } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No complaint with id: ${id}`);

  const updatedCt = {
    ...cmp,
    problem,
    name,
    email,
    updatedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    _id: id,
  };

  const newCt = await Complaint.findByIdAndUpdate(id, updatedCt, { new: true });
  
  res.json(newCt);
};

export const getCmpById = async(request,response)=>{
  
  console.log(request.params)
  try{
      const c=await Complaint.findById(request.params.id);
      response.status(200).json(c);
      
  }catch(error){
      response.status(404).json({message:error.message})
  }
  
}



