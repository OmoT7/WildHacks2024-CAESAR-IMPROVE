import './App.css';


function clickMe(){
  alert("You clicked me!");
}
function App() {
  return (
    <div>
    <button onClick={clickMe}>
      Button
    </button>
    
    
    </div>
  );
}

export default App;
