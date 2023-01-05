import { Center, FormLabel, Input, FormControl, Box, InputRightElement, InputGroup } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import {projectFundingABI} from '../../contracts/projectFunding';
import { signer } from '../../helpers/initweb3';
import { ProjectDetailCard } from './projectDetailCard';
import { SearchIcon } from '@chakra-ui/icons';

export const ProjectsList: React.FC<{projectsFactory: any, handleProjectChange: any}> = ({projectsFactory, handleProjectChange}) => {

    const [availableProjects, setAvailableProjects] = useState<string[] | undefined>();
    const [filteredProjects, setFilteredProjects] = useState<string[] | undefined>();
    const [value, setValue] = useState('');

    useEffect(() => {
        setFilteredProjects(availableProjects);
    }, availableProjects);

    useEffect(() => {
        fetchAvailableProjects();
    }, [projectsFactory]);

    const handleInput = (event: any) => {
        const val = event.target.value;
        setFilteredProjects(availableProjects?.filter((project) => project.includes(val)));
        setValue(val);
    }

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
        <Box maxW='lg'>
            <InputGroup mb={3}>
                <Input value={value} onChange={handleInput} placeholder='Search by project Name' />
                <InputRightElement children={<SearchIcon color='teal.500' />} />
            </InputGroup>
            <Box borderWidth='1px'
                 borderRadius='lg'
                 borderColor='teal'>
                {
                    filteredProjects?.map(
                        (project, i) =>
                            <Box onClick={() => handleProjectChange(project)} key={i}
                                 borderWidth='0.1px'
                                 borderRadius='lg' p={4}
                                 _hover={{ background: "rgba(173,227,225,0.25)", fontWeight: 'semibold', cursor: "pointer"}}>
                                {project}
                            </Box>
                    )
                }
            </Box>
        </Box>
    )
}