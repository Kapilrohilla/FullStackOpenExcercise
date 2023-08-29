import express from "express";
import calculateBmi from "./calculateBmi";
const app = express();

app.get('/hello',(_req,res)=>{
    res.send("Hello full stack");
})

type bmiResponse = {
    height: number,
    weight: number,
    bmi: string
}

app.get('/bmi',(req,res)=>{
    const {height, weight} =req.query
    if(!height || !weight){
        res.status(400).end();
    }
    const bmi: string = calculateBmi(Number(height),Number(weight));
    const response: bmiResponse = {
        height: Number(height),
        weight: Number(weight),
        bmi
    }
    res.status(200).json(response);
})
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("server listning at "+PORT);
})