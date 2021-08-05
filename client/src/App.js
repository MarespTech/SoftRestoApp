import React from 'react'
import { HashRouter  as Router, Route, Switch  } from 'react-router-dom';

import AuthState from './context/auth/authState';
import OrderState from './context/order/orderState';
import CategoryState from './context/category/categoryState';
import IngredientState from './context/ingredient/ingredientState';
import MealState from './context/meal/mealState';
import AlertState from './context/alerts/alertsState';
import UserState from './context/user/userState';

import PrivateRoute from './components/routes/PrivateRoute';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddOrder from './components/AddOrder';
import Categories from "./components/Categories";
import Ingredients from "./components/Ingredients";
import Meals from "./components/Meals";
import Historial from './components/Historial';
import SellsCharts from './components/SellsCharts';
import Messages from './components/Messages';
import UserForm from './components/users/UserForm';
import UserList from './components/users/UsersList';

import tokenAuth from './config/tokenAuth';

const token = localStorage.getItem('token');
if(token) tokenAuth(token);

function App() {
  return (
    <AuthState>

      <UserState>
        <AlertState>
          <OrderState>
            <CategoryState>
              <IngredientState>
                <MealState>
                  <Router>
                    <Switch>
                      <Route exact path={"/"} component={Login}/>
                      <PrivateRoute exact path={"/dashboard"} component={Dashboard}/>
                      <PrivateRoute exact path={"/add-order"} component={AddOrder}/>
                      <PrivateRoute exact path={"/categories"} component={Categories}/>
                      <PrivateRoute exact path={"/ingredients"} component={Ingredients}/>
                      <PrivateRoute exact path={"/meals"} component={Meals}/>
                      <PrivateRoute exact path={"/sells-historial"} component={Historial}/>
                      <PrivateRoute exact path={"/sells-report"} component={SellsCharts}/>
                      <PrivateRoute exact path={"/messages"} component={Messages}/>
                      <PrivateRoute exact path={"/add-user"} component={UserForm}/>
                      <PrivateRoute exact path={"/edit-user"} component={UserForm}/>
                      <PrivateRoute exact path={"/user-list"} component={UserList}/>
                    </Switch>
                  </Router>
                </MealState>
              </IngredientState>
            </CategoryState>
          </OrderState>
        </AlertState>
      </UserState>
    </AuthState>
  );
}

export default App;
