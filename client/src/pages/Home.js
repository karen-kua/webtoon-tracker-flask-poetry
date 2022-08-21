import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWebtoons } from '../action-creators/webtoons';
import Modal from '../components/Modal';
import Table from '../components/Table';
import usePrevState from '../hooks/usePrevState';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const webtoons = useSelector(state => state.webtoons.webtoons);
    const error = useSelector(state => state.webtoons.error);
    const isAddingWebtoon = useSelector(state => state.webtoons.isAddingWebtoon);
    const prevIsAddingWebtoon = usePrevState(isAddingWebtoon);
    const dispatch = useDispatch();
    const headingAndCellPairs = [
        ['Title', 'title'],
        ['Authors', 'authors'],
        ['Days of Release', 'daysOfRelease'],
        ['Genres', 'genres'],
        ['Completed', 'completed']
    ]

    useEffect(() => {
        dispatch(fetchWebtoons())
    }, [])

    useEffect(() => {
        if (prevIsAddingWebtoon && !isAddingWebtoon && !error) {
            toggleModal();
        }
    }, [isAddingWebtoon])

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    console.log('Karen webtoons: ', webtoons)
    console.log('Karen isModalOpen: ', isModalOpen),
    console.log('Karen prevIsAddingWebtoon: ', prevIsAddingWebtoon, isAddingWebtoon, error);

    return (
        <div>
            { error && <p id="error">Error: {error}</p> }
            { webtoons.length > 0 && (
                <div id="mainContent">
                    <div>
                        <button onClick={toggleModal}>Add New Webtoon</button>
                    </div>
                    <Table
                        data={webtoons}
                        headingAndCellPairs={headingAndCellPairs}
                    />
                </div>
            )}
            { isModalOpen &&
                <Modal
                header="Add a new webtoon"
                closeModal={toggleModal}
                />
            }
        </div>
    )
}

export default Home;