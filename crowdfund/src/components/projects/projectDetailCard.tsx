import { NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputField, FormControl, FormLabel, Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Input, Center, Stack, Box, Flex, Grid, VStack } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import React, { useEffect } from "react";
import { ethers } from 'ethers';
import { projectsFactory, RVLToken, signer } from '../../helpers/initweb3';
import { projectFundingABI } from '../../contracts/projectFunding';
export const ProjectDetailCard: React.FC<{projectName: string, setLatestTransaction: Function}> =
    ({projectName, setLatestTransaction}) => {
    const [amount, setAmount] = React.useState<number>(0);
    const [projectInitialBudget, setProjectInitialBudget] = React.useState<string>('');
    const [projectRemainingBudget, setProjectRemainingBudget] = React.useState<string>('');
    const [project, setProject] = React.useState<any>(null);
    const toast = useToast();
    useEffect(() => {
        setProjectElements();
    })

    const setProjectElements = async () => {
        const projectAddress = await projectsFactory.getProjectAddress(projectName);
        const project = new ethers.Contract(projectAddress, projectFundingABI, signer);
        setProject(project);
        const initialBudget = await project.getBudget();
        setProjectInitialBudget(ethers.utils.formatEther(initialBudget));
        const remainingBudget = await project.getRemainingBudget();
        setProjectRemainingBudget(ethers.utils.formatEther(remainingBudget));
    }

    const fundProject = async () => {
        console.log('Creating a new project');
        const approval = await RVLToken.approve(project.address, ethers.utils.parseUnits(amount.toString(),"ether"));
        console.log('Approved:', approval);
        try {
            const response = await project.fundProject(ethers.utils.parseUnits(amount.toString(),"ether"));
            setLatestTransaction(response.hash);
            toast({
                title: `Successfully Funded ${projectName}`,
                description: `Check the process of your transaction on Etherscan ${response.hash}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
        } catch(error: any) {
            console.log(error.reason);
            toast({
                title: `Something Went Wrong`,
                description: error.reason,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const refundAccount = async () => {
        try {
            const response = await project.refund(ethers.utils.parseUnits(amount.toString(), "ether"));
            setLatestTransaction(response.hash);
            toast({
                title: `You Got Refunds, Congrats!`,
                description: `Check the process of your transaction on Etherscan ${response.hash}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
        } catch(error: any) {
            toast({
                title: `Something Went Wrong`,
                description: error.reason,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const updateBudget = async () => {
        try {
            const response = await project.updateBudget(ethers.utils.parseUnits(amount.toString(), "ether"));
            setLatestTransaction(response.hash);
            toast({
                title: `You updated the project: ${projectName}`,
                description: `Check the process of your transaction on Etherscan ${response.hash}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
        } catch(error: any) {
            console.log(error.reason);
            toast({
                title: `Something Went Wrong`,
                description: error.reason,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const handleAmountChange = (e: any) => {
        setAmount(e.target.value);
    }
    
    return (
        <Center>
            <Card maxW='lg' borderWidth='1px' borderRadius='lg' borderColor='teal' align='center'>
                <CardHeader>
                    <Heading size='md'> Fetch Project Details</Heading>
                </CardHeader>
                <CardBody>
                    <Card mb={3}>
                        <CardBody>
                            <Stack spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                Project Name
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {projectName}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                Project Initial Budget
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {projectInitialBudget} <strong>RVL</strong>
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                Project Remaining Budget
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {projectRemainingBudget} <strong>RVL</strong>
                                </Text>
                            </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                    <FormControl isRequired>
                        <FormLabel>Amount</FormLabel>
                        <NumberInput value={amount} max={50} min={0.1}>
                            <NumberInputField onChange={handleAmountChange}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <VStack my={5}>
                        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                            <Button colorScheme='green' mr={2} onClick={() => fundProject()}>Fund Project</Button>
                            <Button colorScheme='red' onClick={() => refundAccount()}>Request Refund</Button>
                        </Grid>
                    </VStack>
                    <VStack>
                        <Button width="100%" colorScheme='blue' onClick={() => updateBudget()}>Update Project Budget</Button>
                    </VStack>
                </CardBody>
            </Card>
        </Center>
    )
}