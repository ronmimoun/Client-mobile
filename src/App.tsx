import { MainRouterProvider } from './routes/MainRouterProvider';
import { injectStore } from './utils/non-circular-injections.utils';
import store from './store';

injectStore(store)

const App = () => {
  return (
    <MainRouterProvider />
  );
}

export default App;
