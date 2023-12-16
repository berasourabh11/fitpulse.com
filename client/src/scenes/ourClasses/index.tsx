import { SelectedPage } from '../../shared/types'
import CrossfitImage from '../../assets/Crossfit.jpg';
import WeightTraining from '../../assets/WeightTraining.jpg';
import Boxing from '../../assets/Boxing.jpg';
import MuaiThai from '../../assets/muaiThai.jpg';
import Jujutsu from '../../assets/Jujutsu.jpg';
import MMA from '../../assets/MMA.jpg';
import { motion } from 'framer-motion';
import HText from '../../shared/HText';
import Session from './Session';
import ClassModal from "../../shared/modals/ClassModal"
import useMediaQuery from '../../hooks/useMediaQuery ';

type ImageType = {
  image: string;
  name: string;
};


const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  },
};

const images: ImageType[] = [
  { image: CrossfitImage, name: "Crossfit" },
  { image: WeightTraining, name: "Weight Training" },
  { image: Boxing, name: "Boxing" },
  { image: MuaiThai, name: "Muai Thai" },
  { image: Jujutsu, name: "Jujutsu" },
  { image: MMA, name: "Mixed Martial Arts" },
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}
const OurClasses = ({ setSelectedPage }: Props) => {
  
  return (
    <section id='ourclasses' className='w-full bg-primary-100 py-20' >
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.OurClasses)}
      >
        <motion.div
          className='mx-auto w-5/6'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div>
            <HText>Our Classes</HText>
            <p className='py-5'>
              Explore a diverse range of fitness classes at FitPulse designed to cater to all levels and preferences. Whether you're into high-intensity workouts, mind-body practices, or strength training, our classes are crafted to elevate your fitness experience. Join our enthusiastic instructors and a vibrant community in a dynamic and supportive environment. Embrace the joy of movement and discover the perfect class for your fitness journey.
            </p>
          </div>
        {/* Classes  */}

          <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'> 
            {images.map(({image,name}) => (
              <Session image={image} text={name}/>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <ClassModal 
        classInfo={"selectedClass"} 
        onClose={() => console.log("close")} 
      />
    </section>
  )
}

export default OurClasses