import { Activity, SelectedPage } from '../../shared/types'
import { motion } from 'framer-motion';
import HText from '../../shared/HText';
import Session from './Session';
import { useEffect, useState } from 'react';
import { getSessionsTitles } from '../../shared/api/apiCalls';




const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  },
};


type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}
const OurClasses = ({ setSelectedPage }: Props) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [renderClasses, setRenderClasses] = useState<boolean>(false);
  useEffect(() => {
    // Call getSessionsTitles when the component mounts
    const fetchData = async () => {
      try {
        const titles = await getSessionsTitles();
        setActivities(titles.activities)
        setRenderClasses(true);
        console.log('titles', titles.activities);
      } catch (error) {
        console.error('Error fetching session titles:', error);
      }
    };

    fetchData();
  }, []);
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
            variants={container}
            className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'>
            {renderClasses === true && (
              activities.map((activity) => (
                <Session key={activity.activityId} activityId={activity.activityId} activityName={activity.activityName} imageurl={activity.imageurl} />
              ))
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      {/* <ClassModal 
        classInfo={"selectedClass"} 
        onClose={() => console.log("close")} 
      /> */}
    </section>
  )
}

export default OurClasses