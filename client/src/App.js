import React from 'react'
import { BrowserRouter  as Router, Route, Switch  } from 'react-router-dom';

import CategoryState from './context/category/categoryState';
import IngredientState from './context/ingredient/ingredientState';

import Dashboard from './components/Dashboard';
import Categories from "./components/Categories";
import Ingredients from "./components/Ingredients";
import Meals from "./components/Meals";


function App() {
  return (
    <CategoryState>
      <IngredientState>
        <Router>
          <Switch>
            <Route exact path={"/"} component={Dashboard}/>
            <Route exact path={"/categories"} component={Categories}/>
            <Route exact path={"/ingredients"} component={Ingredients}/>
            <Route exact path={"/meals"} component={Meals}/>
          </Switch>
        </Router>
      </IngredientState>
    </CategoryState>
  );
}

export default App;
