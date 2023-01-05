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
        <Box
            maxW='lg'
            borderWidth='1px'
            borderRadius='lg'
            borderColor='teal'
        >
            <InputGroup>
                <Input value={value} onChange={handleInput} placeholder='Project Name' />
                <InputRightElement children={<SearchIcon color='teal.500' />} />
            </InputGroup>
            {
                filteredProjects?.map(
                    (project, i) =>
                        <Box onClick={() => handleProjectChange(project)} key={i}
                             borderRadius='lg' p={4}
                             _hover={{ color: "#F8F4EA", background: "#439A97", fontWeight: 'semibold', cursor: "pointer"}}>
                            {project}
                        </Box>
                )
            }
        </Box>
    )
}