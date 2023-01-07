import React, { useEffect, useState } from 'react';
import { Link, VStack } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { provider, RVLToken } from '../../helpers/initweb3';
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
import { CheckIcon, CopyIcon, AtSignIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react'

export const Header: React.FC<{}> = () => {
  const [defaultAccount, setDefaultAccount] = useState<string|null>(null);
  const [userBalance, setUserBalance] = useState<string|null>(null);
  const [RVLBalance, setRVLBalance] = useState<string|null>(null);

  const [copied, setCopied] = useState(false);

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
  });

  const copyAddress = () => {
      navigator.clipboard.writeText(defaultAccount ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  }

  const accountChangedHandler = async (newAccount: any) => {
      const address = await newAccount.getAddress();
      setDefaultAccount(address);
      localStorage.setItem('isConnected', true.toString());
      const balance = await newAccount.getBalance();
      setUserBalance(ethers.utils.formatEther(balance));
      const RVLBalance = await RVLToken.balanceOf(address);
      setRVLBalance(ethers.utils.formatEther(RVLBalance));
  }
  return (
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          
          <HStack spacing={8} alignItems={'center'}>
            <Box>Crowd Fund me</Box>
            <Link href={'http://rvl-faucet.s3-website-us-east-1.amazonaws.com/'} isExternal>
                Get Some RVL <ExternalLinkIcon mx='2px' />
            </Link>
          </HStack>

          <Flex alignItems={'center'}>
            { localStorage['isConnected'] && JSON.parse(localStorage['isConnected']) ?
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
                            <strong>Your Address is :</strong>
                            <Box>{defaultAccount?.slice(0, 17)}...
                                <IconButton variant={"link"} aria-label="Copy" onClick={copyAddress}
                                            icon={
                                                copied ? <CheckIcon/> : <CopyIcon/>
                                            }/>
                            </Box>
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
            :
              <Button onClick={() => connectwalletHandler()} colorScheme={'teal'}>Connect With Metamask</Button>
            }
          </Flex>
        </Flex>
      </Box>
  );
}