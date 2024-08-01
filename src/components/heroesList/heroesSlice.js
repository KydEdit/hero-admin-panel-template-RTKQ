// import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
// import {useHttp} from '../../hooks/http.hook';

// const heroesAdapter = createEntityAdapter();

// // const initialState = {
// //     heroes: [],
// //     heroesLoadingStatus: 'idle'
// // }

// const initialState = heroesAdapter.getInitialState({
//     heroesLoadingStatus: 'idle'
// });

// export const fetchHeroes = createAsyncThunk(
//     'heroes/fetchHeroes',
//     () => {
//         const {request} = useHttp();
//         return request("http://localhost:3001/heroes");
//     }
// );

// const heroesSlice = createSlice({
//     name: 'heroes',
//     initialState,
//     reducers: {
//         // heroesFetching: state => {
//         //     state.heroesLoadingStatus = 'loading';
//         //         },
//         // heroesFetched: (state, action) => {
//         //     state.heroesLoadingStatus = 'idle';
//         //     state.heroes = action.payload;
//         //         },
//         // heroesFetchingError: state => {
//         //             state.heroesLoadingStatus = 'error';
//         //         },
//         heroCreated: (state, action) => {
//             heroesAdapter.addOne(state, action.payload);
//             // state.heroes.push(action.payload);
//         },
//         heroDeleted: (state, action) => {
//             heroesAdapter.removeOne(state, action.payload);
//             // state.heroes = state.heroes.filter(item => item.id !== action.payload);
//         }
//     }, 
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchHeroes.pending, state => {
//                 state.heroesLoadingStatus = 'loading';
//                     })
//             .addCase(fetchHeroes.fulfilled, (state, action) => {
//                 state.heroesLoadingStatus = 'idle';
//                 heroesAdapter.setAll(state, action);
//                 // state.heroes = action.payload;
//                     })
//             .addCase(fetchHeroes.rejected, state => {
//                 state.heroesLoadingStatus = 'error';
//             })
//             .addDefaultCase(() => {});
//     }
// });

// const {actions, reducer} = heroesSlice;

// export default reducer;

// const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

// // получение функ-ии селектор (функ-ии которые получают кусочек стейта)
// export const filteredHeroesSelector = createSelector(
//     (state) => state.filters.activeFilter,
//     selectAll,
//     // (state) => state.heroes.entities, // heroes
//     (filters, heroes) => {
//         if (filters === "all") {
//             // console.log('render');
//             return heroes;
//         }
//         else {
//             return heroes.filter(item => item.element === filters)
//         }
//     }
// );

// export const {
//     heroesFetching,
//     heroesFetched,
//     heroesFetchingError,
//     heroCreated,
//     heroDeleted
// } = actions;