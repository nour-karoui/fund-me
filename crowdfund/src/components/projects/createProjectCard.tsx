import {
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputField,
    FormControl,
    FormLabel,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Button,
    Input,
    Center,
    Toast,
    Box
} from '@chakra-ui/react';
import React from "react";
import {useToast} from '@chakra-ui/react';
import {projectsFactory, RVLToken} from '../../helpers/initweb3';
import {ethers} from 'ethers';

export const CreateProjectCard: React.FC<{ setLatestTransaction: Function, createProjectCallback: Function }> = ({setLatestTransaction, createProjectCallback}) => {
    const [projectName, setProjectName] = React.useState<string>('');
    const [projectBudget, setProjectBudget] = React.useState<number>(0);
    const toast = useToast();
    const createNewProject = async () => {
        console.log('Creating a new project');
        try {
            const response = await projectsFactory.createNewProject(projectName, ethers.utils.parseUnits(projectBudget.toString(), "ether"), RVLToken.address);
            setLatestTransaction(response.hash);
            createProjectCallback();
            toast({
                title: `Successfully Created ${projectName}`,
                description: `Check the process of your transaction on Etherscan ${response.hash}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error: any) {
            console.log(error.reason);
            createProjectCallback();
            toast({
                title: `Something Went Wrong`,
                description: error.reason,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const handleNameChange = (e: any) => {
        setProjectName(e.target.value);
    }

    const handleBudgetChange = (e: any) => {
        setProjectBudget(e.target.value);
    }

    return (
        <Box width="100%">
            <FormControl isRequired mt={4}>
                <FormLabel>Project Name</FormLabel>
                <Input onChange={handleNameChange} value={projectName} placeholder='My Project'/>
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel>Project Budget</FormLabel>
                <NumberInput value={projectBudget} max={50} min={0.1}>
                    <NumberInputField onChange={handleBudgetChange}/>
                    <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>

            <Button mt={4} colorScheme='teal' onClick={() => createNewProject()}>Create New Project</Button>
        </Box>
    )
}