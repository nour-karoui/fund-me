import React, {useEffect} from "react";
import {Center, Link} from '@chakra-ui/react';
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const Footer: React.FC<{}> = () => {
    const [lastTransactionHash, setLastTransactionHash] = React.useState<string|null>(null);
    useEffect(() => {
        if (localStorage['lastTransactionHash']) {
            setLastTransactionHash(`https://goerli.etherscan.io/tx/${localStorage['lastTransactionHash']}`);
        }
    });
    return(
        <Center fontSize='2xl' pos="fixed" bottom={0} w="100%" bgColor={'teal'} color={'white'} h='50' zIndex={2} alignContent='center'>
          {lastTransactionHash ?
            <Link href={lastTransactionHash} isExternal>
                Follow your latest transaction on Etherscan <ExternalLinkIcon mx='2px' />
            </Link>
            : null
          }        
        </Center>
    );
}