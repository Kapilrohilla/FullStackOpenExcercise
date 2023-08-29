interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1|2|3,
    ratingDescription: "poor performance" | "not too bad but could be better" | "good performace",
    target: number,
    average: number
}
const calculateExcercise = (dailyExcercise: number[], target: number): result => {
    const periodLength = dailyExcercise.length;
    
    const trainingDays = dailyExcercise.filter((day)=> day!==0).length;
    
    const average = dailyExcercise.reduce((a,b)=> a+b)/dailyExcercise.length;

    let ratingDescription:  "poor performance" | "not too bad but could be better" | "good performace";
    let rating: 1|2|3;
    let success: boolean = false;
    if(average > target){
        rating = 2;
        success = true
        ratingDescription = "good performace"
        
    }else if(average < target && average > target/2){
        rating = 2;
        ratingDescription = "not too bad but could be better"
    }else{
        rating = 1;
        ratingDescription = "poor performance"
    }
    
    return {
        periodLength,
        trainingDays,
        ratingDescription,
        success,
        rating,
        target,
        average
    }
}
console.log(calculateExcercise([3, 0, 2, 4.5, 0, 3, 1],2))