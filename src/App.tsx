import "./App.css";
import Providers from "./containers/Providers";
import Window from "./containers/Window";

function App() {
  return(
    <Providers>
      <div className="app">
        <Window title="echo(。・ω・。)">
          <div className="content">
            <div className="left-panel">

            </div>
            <div className="right-panel">
              
            </div>
          </div>
        </Window>
      </div>
    </Providers>
  )
}

export default App;
