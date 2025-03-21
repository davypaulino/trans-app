import {
    GlobeAltIcon,
    TrophyIcon,
    PaintBrushIcon,
    PlayIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline'

const NavSectionsOptions = [
    { 
        name: 'Rooms',
        description: 'Search for rooms Play with friends or people from all over the world',
        href: '/rooms',
        icon: GlobeAltIcon
    },
    { 
        name: 'Ranking',
        description: 'Speak directly to your customers',
        href: '#',
        icon: TrophyIcon
    },
    {
        name: 'Customize Your Board',
        description: 'Your customers’ data will be safe and secure',
        href: '#',
        icon: PaintBrushIcon
    }
]

const CallsToAction = [
    {
        name: 'Tutorial',
        href: '#',
        icon: BookOpenIcon
    },
    {
        name: 'Create a Game Room',
        href: '#',
        icon: PlayIcon
    },
]

export { NavSectionsOptions, CallsToAction }