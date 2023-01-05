import { NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputField, FormControl, FormLabel, Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Input, Center, Toast } from '@chakra-ui/react';
import React from "react";
import { useToast } from '@chakra-ui/react';
import { projectsFactory, RVLToken } from '../../helpers/initweb3';
import { ethers } from 'ethers';
export const CreateProjectCard: React.FC<{}> = () => {
    const [projectName, setProjectName] = React.useState<string>('');
    const [projectBudget, setProjectBudget] = React.useState<number>(0);
    const toast = useToast();
    const createNewProject = async () => {
        console.log('Creating a new project');
        try {
            const response = await projectsFactory.createNewProject(projectName, ethers.utils.parseUnits(projectBudget.toString(),"ether"), RVLToken.address);
            localStorage.setItem('lastTransactionHash', response.hash);
        } catch(error: any) {
            console.log(error.reason);
            toast({
                title: `Something Went Wrong`,
                description: error.reason,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleNameChange = (e: any) => {
        setProjectName(e.target.value);
    }

    const handleBudgetChange = (e: any) => {
        setProjectBudget(e.target.value);
    }
    
    return (
        <Center>
            <Card maxW='lg' borderWidth='1px' borderRadius='lg' borderColor='teal' align='center'>
                <CardHeader>
                    <Heading size='md'> Create New Project</Heading>
                </CardHeader>
                <CardBody>
                    <FormControl isRequired>
                        <FormLabel>Project Name</FormLabel>
                        <Input onChange={handleNameChange} value={projectName} placeholder='Project Name' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Project Budget</FormLabel>
                        <NumberInput value={projectBudget} max={50} min={0.1}>
                            <NumberInputField onChange={handleBudgetChange}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>        
                </CardBody>
                <CardFooter>
                    <Button colorScheme='teal' onClick={() => createNewProject()}>Create New Project</Button>
                </CardFooter>
            </Card>
        </Center>
    )
}