import { FormControl, FormLabel, Card, CardHeader, CardBody, CardFooter, Heading, Button, Input, Center } from '@chakra-ui/react';
import React from "react";
import { RVLFaucet } from '../helpers/initWeb3';
export const GetFunds: React.FC<{}> = () => {
    const [address, setAddress] = React.useState<string>('');

    const handleAddressChange = (e: any) => {
        setAddress(e.target.value);
    }

    const fundAccount = async () => {
        const response = await RVLFaucet.fundAccount(address);
        console.log(response); 
    }
    
    return (
        <Center>
            <Card maxW='lg' borderWidth='1px' borderRadius='lg' borderColor='teal' align='center'>
                <CardHeader>
                    <Heading size='md'> Add your address</Heading>
                </CardHeader>
                <CardBody>
                    <FormControl isRequired>
                        <FormLabel>Your Account Address</FormLabel>
                        <Input onChange={handleAddressChange} value={address} placeholder='0xc0ffee254729296a45a3885639AC7E10F9d54979' />
                    </FormControl>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='teal' onClick={() => fundAccount()}>Create New Project</Button>
                </CardFooter>
            </Card>
        </Center>
    )
}