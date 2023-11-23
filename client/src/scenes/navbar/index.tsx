//*Navbar component - This component is fixed and it must be in the page even with after scrolling.
//TODO: Create a smooth scroll link component 
import { useState } from "react";
import { Bars3Icon } from '@heroicons/react/24/solid'
import { XMarkIcon } from "@heroicons/react/20/solid";
import Logo from "@/assets/logo.png"
import Link from "./link";
import { SelectedPage } from "../../shared/types";
import useMediaQuery from "../../hooks/useMediaQuery ";

type Props = {
    selectedPage: string,
    setSelectedPage: (value: SelectedPage) => void
}

const Navbar = ({ selectedPage, setSelectedPage }: Props) => {
    const flexBetween = "flex items-center justify-between"
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
    const isAboveMediumScreen = useMediaQuery("(min-width:1060px)")
    return (
        <nav>
            <div className={`${flexBetween} fixed top-0 z-30 w-full py-6`} >
                <div className={`${flexBetween} mx-auto w-5/6`}>
                    <div className={`${flexBetween} w-full gap-16`}>
                        <img src={Logo} alt="logo" />
                        {isAboveMediumScreen ?
                            (<div className={`${flexBetween} w-full`}>
                                <div className={`${flexBetween} gap-8 text-sm `}>
                                    <Link
                                        page="Home"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage} />
                                    <Link
                                        page="Benefits"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage} />
                                    <Link
                                        page="Our Classes"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage} />
                                    <Link page="Contact Us"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage} />
                                </div>
                                <div className={`${flexBetween} gap-8`}>
                                    <button>Sign In</button>
                                    <button>Visit our Store</button>
                                </div>
                            </div>) :
                            (
                                <button
                                    className="rounded-full bg-secondary-500 p-2"
                                    onClick={() => setIsMenuToggled(!isMenuToggled)}
                                >
                                    <Bars3Icon className="h-6 w-6 text-white" />
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar