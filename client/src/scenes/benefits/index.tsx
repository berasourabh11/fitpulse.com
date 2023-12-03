import { HomeModernIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/solid'
import { BenefitType, SelectedPage } from '../../shared/types'
import { motion } from 'framer-motion'
import HText from '../../shared/HText';
import Benefit from './benefit';
import ActionButton from '../../shared/ActionButton';
import BenefitsHero from "../../assets/benfitsHero.png"

const benefits: Array<BenefitType> = [
  {
    icon: <HomeModernIcon className="h-6 w-6" />,
    title: "State of the Art Facilities",
    description: "Experience fitness at its finest with our state-of-the-art facilities at FitPulse. Elevate your workouts with cutting-edge equipment and thoughtfully designed spaces."
  },
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: "Community Support",
    description: "Join a vibrant community at FitPulse, fostering motivation and support. Connect with like-minded individuals on your fitness journey, making every workout enjoyable."
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6" />,
    title: "Expert-Led Training",
    description: "Benefit from expert guidance with our certified trainers. Personalized fitness plans and tailored routines ensure your journey to a healthier you is both efficient and safe."
  }
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  },
};


type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

const index = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='benefits'
      className='mx-auto min-h-full w-5/6 py-20'
    >
      {/* HEADER */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
        onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}>

        <div className="md:my-5 md:w-3/5">
          <HText>MORE THAN JUST A GYM </HText>
          <p className="my-5 text-sm">
            Unlock a world of benefits at FitPulse that go beyond the ordinary. With state-of-the-art gym facilities, our members enjoy personalized workout plans, top-notch equipment, and a motivating atmosphere that fuels progress. Delve into our self-defense training, where you'll gain practical skills to navigate life with confidence and resilience.
          </p>
        </div>
        {/* BENEFITS  */}
        <motion.div
          className="md:flex item-center justify-between gap-8 mt-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}

        >
          {benefits.map((benefit: BenefitType) => (<Benefit key={benefit.title} icon={benefit.icon} title={benefit.title} description={benefit.description} setSelectedPage={setSelectedPage} />))}
        </motion.div>

        {/* GRAPHICS AND DESCRIPTION */}
        <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          {/* GRAPHIC */}
          <img
            className="mx-auto"
            alt="benefits-page-graphic"
            src={BenefitsHero}
          />
          <div>
            {/* TITLE */}
            <div className='relative'>
              <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ delay:0.2,duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <HText>
                    MILLIONS OF HAPPY MEMBERS GETTING <span className='text-primary-500'>STRONG</span>
                  </HText>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay:0.25,duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}>
              <p className="my-5">
                We have a global movement where millions have chosen to redefine their well-being. Our state-of-the-art facilities transcend traditional gyms, providing an immersive environment meticulously designed to elevate every aspect of your fitness journey.Experience expert-led training with our certified instructors who create personalized fitness plans tailored to your goals. It's not just about getting fit; it's about gaining the confidence and resilience to navigate life with a strong and healthy mindset.
              </p>
              <p className="mb-5">
                At FitPulse, it's more than just fitness; it's a commitment to holistic well-being. Immerse yourself in personalized fitness plans crafted by our certified trainers, ensuring your path to a healthier lifestyle is both enjoyable and safe. Expert-led training goes beyond physical strength – it instills confidence and resilience for a balanced and empowered life.Join FitPulse and be part of a movement that celebrates strength, well-being, and the joy of achieving your fitness aspirations. It's not just a gym; it's your path to a healthier, more empowered life.
              </p>
            </motion.div>

            {/* BUTTON */}
            <div className='relative mt-16'>
              <div className='before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles'>
                <ActionButton setSelectedPage={setSelectedPage} page={SelectedPage.OurClasses}>
                  Join Now
                </ActionButton>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </section>
  )
}

export default index