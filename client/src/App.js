import React from 'react'
import { BrowserRouter  as Router, Route, Switch  } from 'react-router-dom';

import OrderState from './context/order/orderState';
import CategoryState from './context/category/categoryState';
import IngredientState from './context/ingredient/ingredientState';
import MealState from './context/meal/mealState';
import AlertState from './context/alerts/alertsState';

import Dashboard from './components/Dashboard';
import Categories from "./components/Categories";
import Ingredients from "./components/Ingredients";
import Meals from "./components/Meals";
import Historial from './components/Historial';
import SellsCharts from './components/SellsCharts';


function App() {
  return (
    <AlertState>
      <OrderState>
        <CategoryState>
          <IngredientState>
            <MealState>
              <Router>
                <Switch>
                  <Route exact path={"/"} component={Dashboard}/>
                  <Route exact path={"/categories"} component={Categories}/>
                  <Route exact path={"/ingredients"} component={Ingredients}/>
                  <Route exact path={"/meals"} component={Meals}/>
                  <Route exact path={"/sells-historial"} component={Historial}/>
                  <Route exact path={"/sells-report"} component={SellsCharts}/>
                </Switch>
              </Router>
            </MealState>
          </IngredientState>
        </CategoryState>
      </OrderState>
    </AlertState>
  );
}

export default App;
