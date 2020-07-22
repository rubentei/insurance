import React, { useState } from 'react';
import Header from './components/Header.js';
import Form from './components/Form.js';
import Summary from './components/Summary.js';
import Result from './components/Result.js';
import Spinner from './components/Spinner.js';

import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  background-color: #FFFFFF;
  padding: 3rem;
`;

function App() {

  const [ summary, saveSummary ] = useState({
    budget: 0,
    data: {
      brand: '',
      year: '',
      plan: ''
    }
  });

  const [ loading, saveLoading ] = useState(false);

  // Extract data
  const { budget, data } = summary;

  return (
    <Container>
      <Header 
        title='Cotizador de seguros'
      />

      <FormContainer>
        <Form
          saveSummary={saveSummary}
          saveLoading={saveLoading}
        />

        { loading ? <FormContainer> <Spinner /> </FormContainer>: null}

        <Summary 
          data={data}
        />

        { !loading 
          ? 
            <Result 
              budget={budget}
            /> 
          : null
        }
        
      </FormContainer>
    </Container> 
  );
}

export default App;
