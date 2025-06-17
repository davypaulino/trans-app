import {
    GlobeAltIcon,
    TrophyIcon,
    PaintBrushIcon,
    PlayIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline';
import {NextResponse} from "next/server";

interface INavOptionSideItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ 'aria-hidden'?: boolean; className?: string }>;
}

interface INavOptionItem {
    name: string;
    description?: string;
    href: string;
    icon: React.ComponentType<{ 'aria-hidden'?: boolean; className?: string }>;
}

interface INavItem {
    name: string,
    href?: string | null,
    onclick?: () => void,
    options?: INavOptionItem[] | null
    sideOptions?: INavOptionSideItem[] | null
}

const GameOptionsItems: INavOptionItem[] = [
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

const GameOptionsSideItems = [
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

export const NavItems: INavItem[] = [
    {
        name: "Game Section",
        href: null,
        options: GameOptionsItems,
        sideOptions: GameOptionsSideItems
    },
    {
        name: "Perfil",
        href: "/perfil",
        options: null,
        sideOptions: null
    },
    {
        name: "Ranking",
        href: "/ranking",
        options: null,
        sideOptions: null
    },
    {
        name: "Logout",
        onclick: async () => {
            await fetch("/apim/logout", {
                method: "GET",
            })
            window.location.reload()
        },
        options: null,
        sideOptions: null
    }
]

export type { INavItem, INavOptionSideItem, INavOptionItem };