import { Chat, Signup, Login } from 'components';
import { Route, Switch } from 'react-router-dom';

export const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Chat}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
    </Switch>
  );
};
