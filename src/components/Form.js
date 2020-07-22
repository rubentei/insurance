import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtainYearDifference, calculateByBrand, obtainPlan } from '../helper';

const Field = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #E1E1E1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Form = ( { saveSummary, saveLoading }) => {

   const [ data, saveData ] = useState({
       brand: '',
       year: '',
       plan: ''
   });

   const [ error, saveError ] = useState(false);

   // Extract values from state
   const { brand, year, plan } = data;

   // Read form data and put the data in the state
   const getFormData = e => {
       saveData({
           ...data,
           [e.target.name] : e.target.value
       })
   }

   // When user submits form
   const handleSubmit = e => {
       e.preventDefault();

       if(brand.trim() === '' || year.trim() === '' || plan.trim() === '') {
           saveError(true);
           return;
       }

       saveError(false);

       // Obtain year difference
       const difference = obtainYearDifference(year);

       // Base price
       let result = 2000;

       // Every year substracts 3%
       result -= (( difference * 3 ) * result) / 100;

       // Brand increment American 15%, Asiatic 5%, European 30%
       result = calculateByBrand(brand) * result;

       // Increment depending on the selected plan
       const planIncrement = obtainPlan(plan);

       result = parseFloat( planIncrement * result ).toFixed(2);

       saveLoading(true);

       setTimeout(() => {
           // Remove spinner
            saveLoading(false);

            // Pass info to main component
            saveSummary({
                budget: Number(result),
                data
            });
       }, 3000);

   }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            { error ? <Field><Error>Todos los campos son obligatorios</Error></Field> : null}
            <Field>                
                <Label>Marca</Label>
                <Select
                    name="brand"
                    value={brand}
                    onChange={getFormData}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>
                </Select>
            </Field>
            
            <Field>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={getFormData}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Field>

            <Field>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico" 
                    checked={plan === "basico"}
                    onChange={getFormData}
                /> Básico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={getFormData}
                /> Completo
            </Field>

            <Button type="submit">Cotizar</Button>
        </form>

     );
}

Form.propTypes = {
    saveSummary: PropTypes.func.isRequired,
    saveLoading: PropTypes.func.isRequired
}
 
export default Form;