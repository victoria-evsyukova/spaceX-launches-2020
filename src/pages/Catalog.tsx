
import { Container, Title, Grid } from "@mantine/core";
import { useEffect, useReducer } from "react";
import axios from 'axios';
import Card from '../card/Card'
import { type LaunchType } from "../types";
import { launchReducer, initialStateLaunch } from "../reducers/launchReducer";
import { createPortal } from "react-dom";
import Modal from "../modal/Modal";
import { modalReducer, initialStateModal } from "../reducers/modalReducer";



export default function Catalog() {
    const [ stateLaunch, dispatchLaunch ] = useReducer(launchReducer, initialStateLaunch);
    const [ stateModal, dispatchModal ] = useReducer(modalReducer, initialStateModal);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://api.spacexdata.com/v3/launches', { 
                    params: {
                        launch_year: 2020
                    }
                });
                const transformedDate: LaunchType[] = response.data
                    .map((launch: any) => ({
                        id: launch.flight_number,
                        missionPatchSmall: launch.links?.mission_patch_small || '',
                        missionName: launch.mission_name || 'Unknown Mission',
                        rocketName: launch.rocket?.rocket_name || 'Unknown Rocket',
                        missionPatch: launch.links?.mission_patch || '',
                        details: launch.details || '',
                    }))
                    .filter((launch: LaunchType) => launch.missionPatchSmall && launch.id)

                dispatchLaunch({ type: 'SET_LAUNCHES_SUCCESS', payload: transformedDate });


            } catch(error: any) {
                console.log('Ошибка запроса', error.message);
                dispatchLaunch({ type: 'SET_LAUNCHES_ERROR', payload: error.message })
            }
        }
        
        getData();
    }, [])


    const openModal = (launch?: LaunchType) => {
        dispatchModal({ type: 'OPEN_MODAL', payload: launch })
    }

    const closeModal = () => {
        dispatchModal({ type: 'CLOSE_MODAL' })
    }

    const handleCardClick = (launch: LaunchType) => {
        openModal(launch)
    }

    return (
        <Container pb={'50px'}> 
            <Title mt='xl' mb={'xl'} ta='center'>SpaceX Launches 2020</Title>
            
            <Grid gutter={'lg'} justify="center">
                {stateLaunch.launches.map((launch) => (
                    <Grid.Col key={launch.id} span={4} style={{ maxWidth: '280px' }} >
                        <Card 
                            launch={launch} 
                            onOpenModal={() => handleCardClick(launch)}/>
                    </Grid.Col>
                ))}

            </Grid>
            
            {stateModal.isModalOpen && createPortal(
                <Modal onClose={closeModal} launch={stateModal.selectedLaunch}/>,
                document.body
            )}

        </Container>
    )
}