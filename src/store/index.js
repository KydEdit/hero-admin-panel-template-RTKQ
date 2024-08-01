// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import reducer from '../reducers';
import { configureStore } from '@reduxjs/toolkit';
// import { thunk } from 'redux-thunk';
// import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';
                                // dispatch
const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
};

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action);
//     }
//     return store;   
// }

// const store = createStore(      // heroes: heroes
//                     combineReducers({heroes, filters}),
//                     compose(
//                         applyMiddleware(thunk, stringMiddleware),
//                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
                    
//                     // compose(
//                     //     enhancer,
//                     //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                     // )
//                     );

const store = configureStore({
            // heroes,
    reducer: {filters, 
                [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;

// const store = createStore(combineReducers({heroes, filters}), 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());