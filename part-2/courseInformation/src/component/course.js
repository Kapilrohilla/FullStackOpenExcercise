import Header from "./header"
import Content from "./content";
const Course = ({course}) => {
    return (
        <>
         <Header heading={course.name}/>
         <Content prop={course.parts}/>
        </>
    )
}

export default Course;