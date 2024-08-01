// import {useHttp} from '../../hooks/http.hook';
            // useEffect,
import { useCallback, useMemo } from 'react';
    // useDispatch,
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
// import { createSelector } from 'reselect';
// import { createSelector } from '@reduxjs/toolkit';
    // heroesFetching, heroesFetched, heroesFetchingError
// import { fetchHeroes } from '../../actions';
    // heroDeleted,
// import { fetchHeroes } from './heroesSlice';
import { useGetHeroesQuery, usedeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    // // получение функ-ии селектор (функ-ии которые получают кусочек стейта)
    // const filteredHeroesSelector = createSelector(
    //     (state) => state.filters.activeFilter,
    //     selectAll,
    //     // (state) => state.heroes.entities, // heroes
    //     (filters, heroes) => {
    //         if (filters === "all") {
    //             console.log('render');
    //             return heroes;
    //         }
    //         else {
    //             return heroes.filter(item => item.element === filters)
    //         }
    //     }
    // );

    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === "all") {
    //         return state.heroes.heroes;
    //     }
    //     else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
    //     }
    // });

    const {
        data: heroes = [],
        // isFetching,
        isLoading,
        // isSuccess,
        isError,
        // error
    } = useGetHeroesQuery();

    const [deleteHero] = usedeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        if (activeFilter === "all") {
            // console.log('render');
            return filteredHeroes;
        }
        else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroes, activeFilter]);

    // const filteredHeroes = useSelector(filteredHeroesSelector);
    // const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    // const dispatch = useDispatch();
    // const {request} = useHttp();

    // useEffect(() => {   // request
    //     dispatch(fetchHeroes());
    //     // eslint-disable-next-line
    // }, []);

    const onDelete = useCallback((id) => {
        // request(`http://localhost:3001/heroes/${id}`, "DELETE")
        //     .then(data => console.log(data, 'Deleted'))
        //     .then(dispatch(heroDeleted(id)))
        //     .catch(err => console.log(err));

        deleteHero(id);

        
        // request 
        // eslint-disable-next-line 
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }
        
        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;