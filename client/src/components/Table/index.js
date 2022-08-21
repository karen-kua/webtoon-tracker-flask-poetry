import React, { Fragment } from 'react';
import './Table.css';

const renderHeadings = pairs => pairs.map(([heading, _], index) => <th key={`heading_${index}`}>{heading}</th>);

const normalizeData = (data, index) => {
    const content = typeof data === 'string' ? data : data.toString();
    return <p key={index}>{content}</p>;
}

const renderCells = (pairs, entry) => {
    return pairs.map(([_, key], index) => {
        const data = entry[key]
        let content = '';
        if (typeof data !== 'undefined') {
            if (Array.isArray(data)) {
                content = data.map((item, index) => normalizeData(item, index))
            } else if (typeof data === 'boolean') {
                content = data === true ? '✓' : '✗'
            } else {
                content = normalizeData(data);
            }
        }
        return <td key={index}>{content}</td>
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
            {data.map((entry, index) => (
                <Fragment key={`cell_${index}`}>
                <tr>
                   {renderCells(headingAndCellPairs, entry)}
                </tr>
                </Fragment>
    ))}
    </tbody>
        </table>
    )
}

export default Table;