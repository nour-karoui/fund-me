import React, {useState} from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, ChakraProvider, useToast } from '@chakra-ui/react';
import './App.css';
import { Header } from './components/header/header';
import { ProjectsSection } from './components/projects/projectsSection';
import { Footer } from './components/footer/footer';

const App: React.FC<{}> = () => {

  const [latestTransaction, setLatestTransaction] = useState();

  return (
    <div className="App">
      {
        window.ethereum ?
        <ChakraProvider>
          <Header></Header>
          <ProjectsSection setLatestTransaction={setLatestTransaction}></ProjectsSection>
          <Footer latestTransaction={latestTransaction}></Footer>
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
