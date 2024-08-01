/* eslint-disable no-restricted-globals */

// import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
    // useDispatch,
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';

import { selectAll } from '../heroesFilters/filtersSlice';
// import { heroCreated } from '../heroesList/heroesSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElem, setHeroElem] = useState('');

    const [createHero, {isLoading, isError}] = useCreateHeroMutation();

    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    // const dispatch = useDispatch();
    // const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElem
        }
                                    
        // request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        // .then(res => console.log(res, 'Sending successful!'))
        // .then(dispatch(heroCreated(newHero)))
        // .catch(err => console.log(err));

        createHero(newHero).unwrap();

        setHeroName('');
        setHeroDescr('');
        setHeroElem('');
    }
 
    const renderFilters = (filters, status) => {
        if (isLoading) {
            return <option>Загрузка элементов</option>
        } else if (isError) {
            return <option>Ошибка загрузки</option>
        }

        if (Array.isArray(filters) && filters.length > 0) {
            return filters.map(({name, label}) => {
                
                // eslint-disable-next-line
                if (name === 'all') return null;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElem}
                    onChange={(e) => setHeroElem(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;