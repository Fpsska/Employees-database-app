import React from 'react';

import FindForm from 'components/layout/FindForm/FindForm';

import Table from 'components/layout/Table/Table';

import './App.css';
import 'assets/styles/style.scss';

// /. imports

const App: React.FC = () => {
    return (
        <section className="App">
            <div className="page">
                <h1 className="page__title">Общая база сотрудников</h1>
                <div className="search-section">
                    <div className="search-section__group">
                        <div className="search-section__info">
                            <span className="search-section__counter">
                                2345
                            </span>
                            <span className="search-section__text">
                                Контактов
                            </span>
                        </div>
                        <FindForm />
                    </div>
                    <button
                        className="search-section__button"
                        type="button"
                    >
                        Режим редактирования
                    </button>
                </div>
                <Table />
            </div>
        </section>
    );
};
export default App;
