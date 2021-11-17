import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Loader from './components/Loader/Loader';

let persistor = persistStore(store);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            retryDelay: 1500,
        },
        mutations: {
            onError: (error, _, rollback: Function) => {
                console.log(`Current error is: ${error.toString()}`);
                if (rollback) {
                    rollback();
                }
            }
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();