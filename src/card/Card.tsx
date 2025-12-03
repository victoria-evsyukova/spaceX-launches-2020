
import { 
    Card as MantineCard,
    Image,
    Flex,
    Text,
    Button

} from '@mantine/core';
import type { LaunchType } from '../types';


type Launch = {
    launch: LaunchType
    onOpenModal: () => void
}

export default function Card({ launch, onOpenModal }: Launch) {

    return (
        <MantineCard h={330} shadow='sm' padding='md' radius='md' withBorder> 
            <Flex direction='column' justify='center' align='center' rowGap={'15px'} h={'100%'}>
                <Image 
                    src={launch.missionPatchSmall}
                    w={100}
                />
                <Text mt={'10px'} size='md' fw={600} ta={'center'} lineClamp={1}>
                    {launch.missionName}
                </Text>
                <Text c={'grey'}>
                    {launch.rocketName}
                </Text>

                </Flex>
                <Button size='md' bdrs={'8px'} w={'100%'} onClick={onOpenModal} >See more</Button>
        </MantineCard>
    )
}