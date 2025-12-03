import { Container, Flex, Text, Image, Overlay, CloseButton } from "@mantine/core"
import { type LaunchType } from "../types"
import style from './modal.module.css'
import { useEffect } from "react"

type ModalType = {
    onClose: () => void
    launch: LaunchType | null
}

export default function Modal({ onClose, launch }: ModalType) {

    if (!launch) {
        return null;
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key == 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keydown', handleEscape);

        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose])


    return (
        <>
        <Overlay 
            color="#000" 
            opacity={0.75}
            zIndex={10}
            onClick={onClose}
            style={{ position: 'fixed' }}
         />
        
        <Container className={style['modal-container']}>
            <Flex className={style.modal} direction={'column'} p={'25px'}>
                <Flex justify={'space-between'}>
                    <Text size={'xl'} fw={500} pb={'md'}>{launch?.missionName}</Text>
                    <CloseButton size={'lg'} onClick={onClose}/>
                </Flex>
                
                <Image 
                    src={launch?.missionPatchSmall}
                    w={190}
                    mx="auto"
                    pb={'lg'}
                />

                <Text size="lg" fw={600}>Mission name:</Text>
                <Text c={'grey'} pb={'md'}>{launch?.missionName}</Text>
                <Text size="lg" fw={600}>Rocket name:</Text>
                <Text c={'grey'} pb={'md'}>{launch?.rocketName}</Text>
                <Text size="lg" fw={600}>Details:</Text>
                <Text c={'grey'}>{launch?.details}</Text>
            </Flex>
            
        </Container>
    </>
    )
}