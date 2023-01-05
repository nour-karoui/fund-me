import { Center, FormLabel, Input, FormControl, Box, InputRightElement, InputGroup } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import {projectFundingABI} from '../../contracts/projectFunding';
import { signer } from '../../helpers/initweb3';
import { ProjectDetailCard } from './projectDetailCard';
import { SearchIcon } from '@chakra-ui/icons';

export const ProjectsList: React.FC<{projectsFactory: any, handleProjectChange: any}> = ({projectsFactory, handleProjectChange}) => {

    const [availableProjects, setAvailableProjects] = React.useState<string[]|null>(null);

    useEffect(() => {
        fetchAvailableProjects();
    }, [projectsFactory]);
    const fetchAvailableProjects = async () => {
        if (projectsFactory) {
            const response = await projectsFactory.projectsCount();
            const projectsCount = response.toNumber();
            let projects = [];
            for(let i = 0; i < projectsCount; i++) {
                const projectName = await projectsFactory.projectsNames(i);
                projects.push(projectName);
            }
            setAvailableProjects(projects);
        }
    }

    return (
        <Box 
            maxW='lg' 
            borderWidth='1px'
            borderRadius='lg'
            borderColor='teal'
        >
            <InputGroup>
                <Input placeholder='Project Name' />
                <InputRightElement children={<SearchIcon color='teal.500' />} />
            </InputGroup>
            {availableProjects?.map((project, i) => <Box onClick={() => handleProjectChange(project)} key={i} borderRadius='lg' p={4} _hover={{ color: "#F8F4EA", background: "#439A97", fontWeight: 'semibold', cursor: "pointer"}}>{project}</Box>)}
        </Box>
        // <Center mt={3} pt={10}>
        //     <FormControl isRequired>
        //         <FormLabel>Project Name</FormLabel>
        //         <Input onChange={handleNameChange} value={projectName} placeholder='Project Name' />
        //     </FormControl>
        //     <Button colorScheme='teal' onClick={() => fetchProject()}>Click Me</Button>
        // </Center>
    )
}