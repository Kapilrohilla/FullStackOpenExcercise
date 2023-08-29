interface argumentValues {
    heightInCm: number;
    weightInKg: number;
  }
  
  export const processArgv = (args: string[]): argumentValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    else if (args.length > 4) throw new Error("Too many arguments");
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        heightInCm: Number(args[2]),
        weightInKg: Number(args[3]),
      };
    } else {
      throw new Error("Provided values are not number!");
    }
  };

  interface argumentValuesForExcercise  {
    target: number,
    trainingDays: number[]
}

export const processArgvExcercise = (args: string[]): argumentValuesForExcercise =>{
    if(args.length <3) throw new Error('Not enought arguments');

    let target:number;
    if(!isNaN(Number(args[2]))){
        target = Number(args[2]);
    }else{
      target = 0;
    }

    args.splice(0,3)
    const trainingDays = args.map((args:string):number=>{
        return Number(args);
    })

    return {
        target,
        trainingDays
    }
}
