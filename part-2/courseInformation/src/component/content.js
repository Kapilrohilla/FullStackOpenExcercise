import Part, {Total} from "./part"

export default function Content ({prop}) {
    return (
        <>
            <Part prop={prop} />
            <Total prop={prop} />
        </>
    )
}