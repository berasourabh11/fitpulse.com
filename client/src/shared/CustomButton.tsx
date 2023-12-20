import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { SelectedPage } from './types';

type Props = {
    onClick: () => void;
    children: React.ReactNode;
}

const CustomButton = ({onClick,children}: Props) => {
  return (
    <button
        className='rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white'
        onClick = {onClick}
    >
        {children}
    </button>
  )
}

export default CustomButton