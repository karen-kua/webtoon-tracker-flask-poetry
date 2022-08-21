import React from 'react';
import './Table.css';

const renderHeadings = pairs => pairs.map(([heading, _]) => <th>{heading}</th>);

const normalizeData = data => typeof data === 'string' ? <p>{data}</p> : <p>data.toString()</p>;

const renderCells = (pairs, entry) => {
    return pairs.map(([_, key]) => {
        const data = entry[key]
        let content = '';
        if (typeof data !== 'undefined') {
            if (Array.isArray(data)) {
                content = data.map(item => normalizeData(item))
            } else if (typeof data === 'boolean') {
                content = data === true ? '✓' : '✗'
            } else {
                content = normalizeData(data);
            }
        }
        return <td>{content}</td>
    })
}
const Table = ({ data, headingAndCellPairs }) => {
    return (
        <table>
            <thead>
                <tr>
                    {renderHeadings(headingAndCellPairs)}
                </tr>
            </thead>
            <tbody>
            {data.map(entry => (
                <>
                <tr>
                   {renderCells(headingAndCellPairs, entry)}
                </tr>
                </>
    ))}
    </tbody>
        </table>
    )
}

export default Table;