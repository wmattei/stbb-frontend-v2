import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './containers/Layout/App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Routes from './routes/Routes';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import { LinearProgress } from '@material-ui/core';
import { usePromiseTracker } from 'react-promise-tracker';

const LoadingInterceptor = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return promiseInProgress ? <LinearProgress /> : <></>;
};

ReactDOM.render(
    <Provider store={configureStore()}>
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            getState={(state) => state.toastr}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
        />
        <React.StrictMode>
            <LoadingInterceptor />
            <App>
                <Routes />
            </App>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
