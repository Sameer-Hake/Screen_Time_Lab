import './App.css';
import AppLayout from './AppLayout/AppLayout';
import  appStore  from './ReduxStore/store'
import { Provider } from 'react-redux'

function App() {
    return (
    <Provider store={appStore}>
        <div className="App">
            <AppLayout />
        </div>
    </Provider>
    );
}

export default App;
