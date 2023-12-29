import React from 'react';

type ButtonEnableDisableProps = {
    isEnabled: boolean;
    onClick: () => Promise<void>;
};

const ButtonEnableDisable: React.FC<ButtonEnableDisableProps> = ({ isEnabled,onClick}) => {
    const buttonStyle = isEnabled
        ? 'bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md'
        : 'bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed';

    return <button onClick={()=>{
        if(!isEnabled)return;
        onClick();
    }}className={buttonStyle}>{'Book Now'}</button>;
};

export default ButtonEnableDisable;
