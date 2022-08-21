import React, { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const Form = React.lazy(() => import('./pages/Form'));

export const App = () => (
    <Router>
        <Suspense fallback={<div>loading...</div>}>
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/form' element={<Form />} />
            <Route path='*' element={<Navigate to='' />} />
        </Routes>
        </Suspense>
    </Router>
);