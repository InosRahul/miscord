import { useEffect } from 'react';
import { useAuth, useResolved } from 'hooks';
import { Chat, Signup, Login } from 'components';
import { Route, Switch, useHistory } from 'react-router-dom';

export const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? '/' : '/login');
    }
  }, [authUser, authResolved, history]);

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact component={Chat}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
    </div>
  );
};
