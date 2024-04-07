export default function Home(){
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
          </div>
          
        </div>
      )
}

function createBox(id, width, height, color) {
    let box = document.createElement('div');
    box.setAttribute('id', id);
    box.style.width = width;
    box.style.height = height;
    box.style.backgroundColor = color;
    return box;
}