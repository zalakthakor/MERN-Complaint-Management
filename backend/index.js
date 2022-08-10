import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from "./routes/user.js";
import complaintRouter from "./routes/complaint.js";

import 'dotenv/config';
const app = express();
const options ={
  origin: 'http://localhost:3000',
  useSuccessStatus:200,
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors(options));
app.use("/user", userRouter);
app.use("/complaints",complaintRouter)



const PORT = process.env.PORT|| 5000;
const url =process.env.URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`)))
  .catch((error)=>{
    console.log('Error:',error.message)
})

