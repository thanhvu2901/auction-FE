import { Provider } from 'react-redux';
import store from 'redux/store';
import RootRouter from 'routers/RootRouter';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
}

export default App;
