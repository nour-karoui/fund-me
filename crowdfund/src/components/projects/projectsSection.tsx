import { Button, Center, Flex, Grid, GridItem, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { CreateProjectCard } from './createProjectCard';
import { ProjectsList } from './projectsList';
import { projectsFactory } from '../../helpers/initweb3';
import { ProjectDetailCard } from "./projectDetailCard";
import { AddIcon } from "@chakra-ui/icons";
import { create } from "domain";


export const ProjectsSection: React.FC<{}> = () => {
    const [projectsFactoryContract, setProjectsFactory] = React.useState<Object|null>(null);
    const [currentProject, setCurrentProject] = React.useState<string>('');
    const [showCard, setShowCard] = React.useState<boolean>(false);

    useEffect(() => {    
      setProjectsFactory(projectsFactory);
    }, []);
  
    const handleProjectChange = (projectName: string) => {
        setCurrentProject(projectName);
    }

    const toggleCard = () => {
        setShowCard(!showCard);
    }
    return (
        <Stack mt={6}>
            <Flex alignContent={"center"} justifyContent={"center"}>
                <Center>
                    <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' onClick={() => toggleCard()}>
                        Create New Project
                    </Button>
                </Center>
            </Flex>
            { showCard ?
                <Flex alignContent={"center"} justifyContent={"center"}>
                    <Center>
                        <CreateProjectCard></CreateProjectCard>
                    </Center>
                </Flex>
            : null
            }
            
            <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                <GridItem p={4} w='100%'>
                    <ProjectsList projectsFactory={projectsFactoryContract} handleProjectChange={handleProjectChange}></ProjectsList>
                </GridItem>
                <GridItem p={4} w='100%'>
                    {currentProject != ''
                        ? <ProjectDetailCard projectName={currentProject}></ProjectDetailCard>
                        : null
                    }
                    {/* <CreateProjectCard></CreateProjectCard> */}
                </GridItem>
            </Grid>
        </Stack>
    );
}