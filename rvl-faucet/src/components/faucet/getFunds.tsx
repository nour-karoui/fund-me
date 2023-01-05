import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, Card, CardHeader, CardBody, CardFooter, Heading, Button, Input, Center, useToast, Alert, AlertIcon, Link, VStack } from '@chakra-ui/react';
import React from "react";
import { RVLFaucet } from '../../helpers/initWeb3';
export const GetFunds: React.FC<{}> = () => {
    const [address, setAddress] = React.useState<string>('');
    const [lastTransactionHash, setLastTransactionHash] = React.useState<string>('');
    const toast = useToast();
    const handleAddressChange = (e: any) => {
        setAddress(e.target.value);
    }

    const fundAccount = async () => {
        try {
            const response = await RVLFaucet.fundAccount(address);
            setLastTransactionHash('https://goerli.etherscan.io/tx/' + response.hash);
            toast({
                title: `Successfully Funded ${address.slice(0, 7)}... With 1 RVL !`,
                description: `Check the process of your transaction on Etherscan ${response.hash}`,
                status: 'success',
                duration: 7000,
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
            })
        }
    }
    
    return (
        <Center m={5}>
            <VStack>
                <Card maxW='lg' borderWidth='1px' borderRadius='lg' borderColor='teal' align='center'>
                    <CardHeader>
                        <Heading size='md'>Fund Your Account With RVL</Heading>
                    </CardHeader>
                    <CardBody>
                        <FormControl isRequired>
                            <FormLabel>Your Account Address</FormLabel>
                            <Input onChange={handleAddressChange} value={address} placeholder='0xc0ffee254729296a45a3885639AC7E10F9d54979' />
                        </FormControl>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme='teal' onClick={() => fundAccount()}>Send Me RVL Please!</Button>
                    </CardFooter>
                </Card>
                {lastTransactionHash ?
                <Alert borderRadius={'lg'} status='success'>
                    <AlertIcon />
                        <Link href={lastTransactionHash} isExternal>
                            Follow your latest transaction on Etherscan <ExternalLinkIcon mx='2px' />
                        </Link>      
                </Alert>
                : null
                }
            </VStack>
        </Center>
    )
}