import { Route, BrowserRouter, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Home from "./views/home/home.comp";
import Detail from "./views/detail/detail.comp";
import Create from "./views/create/create.comp";
import Landing from "./views/landing/landing.comp";
import About from "./views/about/about.comp";
import Navbar from "./components/navbar/navbar.comp";
import { getByName } from "./redux/actions/index";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const allVideogames = useSelector((state) => state.allVideogames);
  const maxPage = Math.ceil(allVideogames.length / 15)

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getByName(searchString));
  }

  function handleNextPage() {
    const maxPage = Math.ceil(allVideogames.length / 15);
    if (currentPage < maxPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function handlePreviousPage() {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route>
            <Navbar
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <Switch>
              <Route exact path="/home" render={() => <Home 
              currentPage={currentPage} 
              maxPage={maxPage}  
              handleNextPage={handleNextPage}  
              handlePreviousPage={handlePreviousPage} 
              />}/>
              <Route path="/home/:id" component={Detail} />
              <Route path="/create" component={Create} />
              <Route path="/about" component={About} />
            </Switch>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

