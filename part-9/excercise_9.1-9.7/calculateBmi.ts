import { processArgv } from "./utils";

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const bmi: number = weightInKg / ((heightInCm * heightInCm) / 10000);
  if (bmi < 16.0) {
    return "Underwieght (sever thinness)";
  } else if (bmi >= 16.0 && bmi < 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17.0 && bmi < 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25.0 && bmi < 29.9) {
    return "Overwieght (Pre-obese);";
  } else if (bmi >= 30.0 && bmi < 34.9) {
    return "Obese (Class 1)";
  } else if (bmi >= 35.0 && bmi < 39.9) {
    return "Obese (Class 2)";
  } else {
    return "Obese (Class 3)";
  }
};

try {
  const { heightInCm, weightInKg } = processArgv(process.argv);
  console.log(calculateBmi(heightInCm, weightInKg));
} catch (err: unknown) {
  let errMsg = "Something bad happened";
  if (errMsg) {
    let errMsg = "Something bad hapened";
    if (err instanceof Error) {
      errMsg += "Error: " + err.message;
    }
  }
  console.log(errMsg);
}

export default calculateBmi;