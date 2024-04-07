import Card from "../Card"
import data from "./data"


export default function Home(){
    const card = data.map((item) => {
        return <Card image = {item.img} name={item.name} des={item.des} />;
      });

    return (
        <div>
          <div className="banner-container">
            <div className="text-center">
              <h1 className="text-6xl">Welcome to MyNUDashboard!</h1>
              <h2 className="text-4xl">MyNUDashboard is an innovative platform designed to simplify college students' academic journey. 
              By providing a concise overview of their degree progress and a comprehensive list of potential courses aligned with their majors, 
              MyNUDashboard empowers students to make informed decisions about their education. 
                </h2>
            </div>
            <div className="wrapper">{card}</div>
          </div>
          
        </div>
      )
}