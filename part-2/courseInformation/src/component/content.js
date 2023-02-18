import Part from "./part"

export default function Content ({prop}) {
    const[forPart1, forPart2, forPart3] = prop;
    console.log(forPart1,forPart2,forPart3)
    return (
        <>
            <Part topicName={forPart1.name} excercise={forPart1.exercises}/>
            <Part topicName={forPart2.name} excercise={forPart2.exercises}/>
            <Part topicName={forPart3.name} excercise={forPart3.exercises}/>
        </>
    )
}