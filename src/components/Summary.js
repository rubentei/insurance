import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { capital } from '../helper';

const SummaryContainer = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Summary = ( { data }) => {

    // Extract from data
    const { brand, year, plan } = data;

    if (brand === '' || year === '' || plan === '') return null;

    return (
        <SummaryContainer>
            <h2>Resumen de cotización</h2>
            <ul>
                <li>Marca: {capital(brand)} </li>
                <li>Año del coche: {year} </li>
                <li>Plan: {capital(plan)} </li>
            </ul>
        </SummaryContainer>
     );
}

Summary.propTypes = {
    data: PropTypes.object.isRequired
}
 
export default Summary;