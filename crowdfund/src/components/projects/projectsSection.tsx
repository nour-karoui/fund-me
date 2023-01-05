import {
    Button,
    Center,
    Flex,
    Grid,
    GridItem, Modal,
    ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack
} from "@chakra-ui/react";
import React, {Fragment, useEffect} from "react";
import { CreateProjectCard } from './createProjectCard';
import { ProjectsList } from './projectsList';
import { projectsFactory } from '../../helpers/initweb3';
import { ProjectDetailCard } from "./projectDetailCard";
import { AddIcon } from "@chakra-ui/icons";
import { create } from "domain";


export const ProjectsSection: React.FC<{setLatestTransaction: Function}> = ({setLatestTransaction}) => {
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

    const closeModal = () => {
        setShowCard(false);
    }

    return (
        <Fragment>
            <Stack mt={6}>
                <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                    <GridItem p={4} w='100%'>

                        <Flex my={3}>
                            <Center>
                                <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' onClick={() => toggleCard()}>
                                    Create New Project
                                </Button>
                            </Center>
                        </Flex>

                        <ProjectsList projectsFactory={projectsFactoryContract} handleProjectChange={handleProjectChange}></ProjectsList>
                    </GridItem>
                    <GridItem p={4} w='100%'>
                        {currentProject != ''
                            ? <ProjectDetailCard projectName={currentProject}
                                                 setLatestTransaction={setLatestTransaction}/>
                            : null
                        }
                    </GridItem>
                </Grid>
            </Stack>
            <Modal isOpen={showCard} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex my={3} width="100%" >
                            <CreateProjectCard createProjectCallback={closeModal}
                                               setLatestTransaction={setLatestTransaction}/>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Fragment>
    );
}