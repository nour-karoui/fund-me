import React, { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { provider } from '../../helpers/initWeb3';
import {
  Box,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';


export const Header: React.FC<{}> = () => {
  const [defaultAccount, setDefaultAccount] = useState<string|null>(null);
  const [userBalance, setUserBalance] = useState<string|null>(null);
  const [RVLBalance, setRVLBalance] = useState<string|null>(null);
  const toast = useToast();
  const connectwalletHandler = () => {
      if (window.ethereum) {
          provider?.send("eth_requestAccounts", []).then(async () => {
              await accountChangedHandler(provider?.getSigner());
          })
      } else { 
        toast({
          title: 'Something Went Wrong',
          description: 'You need a Metamask Wallet in order to access this app !',
          status: 'error',
          duration: 3000,
          isClosable: true,
      });

      }
  }

  useEffect(() => {
      if(localStorage['isConnected'] && JSON.parse(localStorage['isConnected'])) {
          connectwalletHandler();
      }
  })
  const accountChangedHandler = async (newAccount: any) => {
      const address = await newAccount.getAddress();
      setDefaultAccount(address);
      localStorage.setItem('isConnected', true.toString());
      const balance = await newAccount.getBalance();
      setUserBalance(ethers.utils.formatEther(balance));
      const RVLBalance = await RVLToken.balanceOf(address);
      setRVLBalance(ethers.utils.formatEther(RVLBalance));
      await getuserBalance(address);
  }
  const getuserBalance = async (address: string) => {
      const balance = await provider?.getBalance(address, "latest");
      console.log(ethers.utils.formatEther(balance || '0'));
      
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          
          <HStack spacing={8} alignItems={'center'}>
            <Box>Crowd Fund me</Box>
          </HStack>

          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                
                <AtSignIcon boxSize={6}/>

              </MenuButton>
              <MenuList>
                <div>
                    <VStack p={5}>
                        <Box>
                            <strong>Your Address is :</strong> <Box>{defaultAccount?.slice(0, 17)}...</Box>
                        </Box>
                        <Box>    
                            <strong>And You Have :</strong> <Box>{userBalance} <strong>ETH</strong></Box>
                        </Box>
                        <Box>    
                            <strong>And You Have :</strong> <Box>{RVLBalance} <strong>RVL</strong></Box>
                        </Box>
                    </VStack>
                </div>
              </MenuList>
            </Menu>
          </Flex>


        </Flex>

      </Box>
    </>
  );
}