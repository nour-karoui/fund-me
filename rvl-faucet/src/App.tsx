import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GetFunds } from './faucet/getFunds';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <GetFunds></GetFunds>
      </ChakraProvider>
    </div>
  );
}

export default App;
