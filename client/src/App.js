import { Route, BrowserRouter } from "react-router-dom";
import Home from "./views/home/home.comp";
import Detail from "./views/detail/detail.comp";
import Create from "./views/create/create.comp";
import Landing from "./views/landing/landing.comp";
import About from "./views/about/about.comp";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/create" component={Create} />
        <Route path="/about" component={About} />
      </div>
    </BrowserRouter>
  );
}

export default App;
