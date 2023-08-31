/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express, { Response } from "express";
import calculateBmi from "./calculateBmi";
import calculateExcercise from "./exerciseCalculator";
import { array } from "./utils";

const app = express();

app.use(express.json());

app.get('/hello',(_req,res)=>{
    res.send("Hello full stack");
});

type bmiResponse = {
    height: number,
    weight: number,
    bmi: string
};

app.get('/bmi',(req,res):Response=>{
    const {height, weight} =req.query;
    if(!height || !weight){
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }
    const bmi: string = calculateBmi(Number(height),Number(weight));
    const response: bmiResponse = {
        height: Number(height),
        weight: Number(weight),
        bmi
    };
    return res.status(200).json(response);
});

app.post('/exercises',(req,res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    if(!daily_exercises|| !target){
        res.status(400).json({
            error: "parameter missing"
        }).end();
    }
    const dailyExcerciseArray = daily_exercises as array;
    if(!(isNaN(Number(target)) || Array.isArray(daily_exercises))){
        res.status(400).json({
            error: "malformatted parameter"
        });
    }
    
    const response = calculateExcercise(dailyExcerciseArray,Number(target));
    res.status(200).json(response);
});
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("server listning at "+PORT);
});