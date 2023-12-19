import { motion } from "framer-motion";
import { Activity } from "../../shared/types";

type Props = Activity
const childVariants ={
    hidden : {opacity :0 , scale : 0.9},
    visible : {opacity : 1, scale : 1}
}

const Session = ({imageurl,activityName}: Props) => {
    return (
        <motion.div variants={childVariants}className='relative group cursor-pointer'>
            <img src={imageurl} alt={activityName} className='w-full h-auto' />
            <div className='absolute inset-0 bg-opacity-30 group-hover:bg-opacity-50 bg-gray-900 flex items-center justify-center transition duration-300'>
                <p className='text-white text-2xl font-semibold shadow-lg text-shadow-lg'>{activityName}</p>
            </div>
        </motion.div>
    )
}

export default Session;
