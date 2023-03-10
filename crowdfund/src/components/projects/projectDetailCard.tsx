import { NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputField, FormControl, FormLabel, Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Input, Center, Stack, Box, Flex, Grid, VStack, Alert, AlertIcon, Link, Spinner, AlertTitle, AlertDescription, HStack, IconButton } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import React, { useEffect } from "react";
import { ethers } from 'ethers';
import { projectsFactory, provider, RVLToken, signer } from '../../helpers/initweb3';
import { projectFundingABI } from '../../contracts/projectFunding';
import { CheckIcon, CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
export const ProjectDetailCard: React.FC<{projectName: string, setLatestTransaction: Function}> =
    ({projectName, setLatestTransaction}) => {
    const etherscanUrl = 'https://goerli.etherscan.io/tx/';
    const [amount, setAmount] = React.useState<number>(0);
    const [projectInitialBudget, setProjectInitialBudget] = React.useState<string>('');
    const [projectRemainingBudget, setProjectRemainingBudget] = React.useState<string>('');
    const [projectAddress, setProjectAddress] = React.useState<string>('');
    const [project, setProject] = React.useState<any>(null);
    const [budgetReached, setBudgetReached] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [lastTransactionHash, setLastTransactionHash] = React.useState<string>('');
    const [copied, setCopied] = React.useState<boolean>(false);
    const [lastFunder, setLastFunder] = React.useState<string>('');
    const [miner, setMiner] = React.useState<string>('');
    const toast = useToast();

    useEffect(() => {
        setProjectElements();
    }, [projectName]);

    const setProjectElements = async () => {
        const projectAddress = await projectsFactory.getProjectAddress(projectName);
        setProjectAddress(projectAddress);
        const project = new ethers.Contract(projectAddress, projectFundingABI, signer);
        setProject(project);
        const initialBudget = await project.getBudget();
        setProjectInitialBudget(ethers.utils.formatEther(initialBudget));
        const remainingBudget = await project.getRemainingBudget();
        setProjectRemainingBudget(ethers.utils.formatEther(remainingBudget));
        project
            .on('BudgetReached', async (budget: string, funder: string, miner: string) => {
                console.log('budget is reached');
                console.log(funder);
                console.log(miner);
                setBudgetReached(true);
                setLastFunder(funder);
                setMiner(miner);
                toast({
                    title: `Project ${projectName.toUpperCase()} Reached Budget`,
                    description: `Congrats PEEPS !`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
            })
            .on('error', console.error);
    }

    const fundProject = async () => {
        console.log('Funding a project');
        try {
            setIsLoading(true);
            const approval = await RVLToken.approve(project.address, ethers.utils.parseUnits(amount.toString(),"ether"));
            setLatestTransaction(approval.hash);
            setLastTransactionHash(etherscanUrl + approval.hash);
            await provider?.waitForTransaction(approval.hash);
            const response = await project.fundProject(ethers.utils.parseUnits(amount.toString(),"ether"));
            setLatestTransaction(response.hash);
            setLastTransactionHash(etherscanUrl + response.hash);
            await provider?.waitForTransaction(response.hash);
            setIsLoading(false);
            toast({
                title: `Successfully Funded ${projectName}`,
                description: `Check the process of your transaction on Etherscan ${response.hash}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
        } catch(error: any) {
            setIsLoading(false);
            console.log(error.reason);
            toast({
                title: `Something Went Wrong`,
                description: error.reason,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const refundAccount = async () => {
        try {
            setIsLoading(true);
            const response = await project.refund(ethers.utils.parseUnits(amount.toString(), "ether"));
            setLatestTransaction(response.hash);
            setLastTransactionHash(etherscanUrl + response.hash);
            await provider?.waitForTransaction(response.hash);
            setIsLoading(false);
            toast({
                title: `You Got Refunds, Congrats!`,
                description: `Check the process of your transaction on Etherscan ${response.hash}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
        } catch(error: any) {
            setIsLoading(false);
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
            setIsLoading(true);
            const response = await project.updateBudget(ethers.utils.parseUnits(amount.toString(), "ether"));
            setLatestTransaction(response.hash);
            setLastTransactionHash(etherscanUrl + response.hash);
            await provider?.waitForTransaction(response.hash);
            setIsLoading(false);
            toast({
                title: `You updated the project: ${projectName}`,
                description: `Check the process of your transaction on Etherscan ${response.hash}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
        } catch(error: any) {
            setIsLoading(false);
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

    const copyAddress = () => {
        navigator.clipboard.writeText(projectAddress ?? '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  

    const handleAmountChange = (e: any) => {
        setAmount(e.target.value);
    }
    
    return (
        <Center>
            {isLoading?
            <Alert
                status='success'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'
                >
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='teal'
                    size='xl'
                />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Transactions take some time to be validated !
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    <Link href={lastTransactionHash} isExternal>
                        Follow your latest transaction on Etherscan <ExternalLinkIcon mx='2px' />
                    </Link>
                </AlertDescription>
            </Alert>
            :
                <Card maxW='lg' borderWidth='1px' borderRadius='lg' borderColor='teal' align='center'>
                    <CardHeader>
                        <Heading size='md'>{projectName}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Card mb={3}>
                            <CardBody>
                                <Stack spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Project Address
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {projectAddress?.slice(0, 17)}...
                                        <IconButton variant={"link"} aria-label="Copy" onClick={copyAddress}
                                            icon={
                                                copied ? <CheckIcon/> : <CopyIcon/>
                                            }/>
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
                    { budgetReached?
                        <CardFooter>
                            <Alert
                            status='success'
                            variant='subtle'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            height='200px'
                            >
                                <AlertTitle mt={4} mb={1} fontSize='lg'>
                                    Projet Reached The Budget !!!
                                </AlertTitle>
                                <AlertDescription maxWidth='sm'>
                                    <Stack><strong>Last Funder:</strong> <Text>{lastFunder.slice(0,10)}...</Text></Stack>
                                    <Stack><strong>Block Miner:</strong> <Text>{miner.slice(0,10)}...</Text></Stack>
                                </AlertDescription>
                            </Alert>
                        </CardFooter>
                    :
                        null
                    }
                </Card>
            }
        </Center>
    )
}