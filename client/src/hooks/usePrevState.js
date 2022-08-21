import React, { useEffect, useRef } from 'react';

const usePrevState = (value) => {
    const prevState = useRef();
    useEffect(() => {
        prevState.current = value;
    }, [value])
    return prevState.current;
}

export default usePrevState;