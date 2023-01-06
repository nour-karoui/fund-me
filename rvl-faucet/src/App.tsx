import React from 'react';
import './App.css';
import { GetFunds } from './components/faucet/getFunds';
import { Alert, AlertDescription, AlertIcon, AlertTitle, ChakraProvider } from '@chakra-ui/react';
import { Header } from './components/header/header';

const App: React.FC<{}> = () => {
  return (
    <div className="App">
      {
        window.ethereum ?
        <ChakraProvider>
          <Header></Header>
          <GetFunds></GetFunds>
        </ChakraProvider>
        :
        <ChakraProvider>
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>You're Not Connected to the Blockchain</AlertTitle>
            <AlertDescription>You Need a Metamask Wallet to Access the Fund Me App.</AlertDescription>
          </Alert>
        </ChakraProvider>
      }
    </div>
  );
}

export default App;
