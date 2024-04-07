import PieChart from "./PieChart"
import { useDegreeData } from './pieload'; 
export default function Home(){

    const data2 = useDegreeData();
    return (
        
        <div className="DegreeP">
            <header className="Degree-header">
            <PieChart data={data2} />
            </header>
        </div>

    )
}