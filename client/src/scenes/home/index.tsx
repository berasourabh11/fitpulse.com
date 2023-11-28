import React from 'react'
import { SelectedPage } from '../../shared/types'
import ActionButton from '../../shared/ActionButton'
import title from '../../assets/title.png'
import useMediaQuery from '../../hooks/useMediaQuery '
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Hero from "../../assets/hero.png"
import Sponsor1 from "../../assets/monster.png"
import Sponsor2 from "../../assets/adidas.png";
import Sponsor3 from "../../assets/cultfit.png";
import { motion } from 'framer-motion'

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

const index = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreen = useMediaQuery("(min-width:1060px")

  return (
    <section id='home' className='gap-16 bg-gray-20 py-10 md:h-full md:pb-0'>
      {/* Image and Main Header */}
      <motion.div className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6"
        onViewportEnter={()=> setSelectedPage(SelectedPage.Home)}
      >
        {/* MAIN HEADER */}
        <div className='z-10 mt-32 md:basis-3/5'>
          {/* Headings */}
          <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{once:true, amount:0.5}} 
          transition={{duration:0.5}} 
          variants={{
            hidden:{opacity:0, x:-50},
            visible: {opacity: 1 , x:0},
          }} 
          className={(isAboveMediumScreen) ? "-mt-40" : "-mt-20"}>
            <div>
              <div>
                <img src={title} alt="home-page-title" />
              </div>
            </div>
            <p className='mt-8 text-sm'>
              At FitPulse, we believe in cultivating strength both physically and mentally. Join us for a unique fusion of gym workouts and <br></br> self-defense classes, making every visit a step towards a healthier, more confident you.
            </p>
          </motion.div>
          {/* actons */}
          <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{once:true, amount:0.5}} 
          transition={{delay:0.2 , duration:0.5}} 
          variants={{
            hidden:{opacity:0, x:-50},
            visible: {opacity: 1 , x:0},
          }} 
          className='mt-5 flex items-center gap-8 md:justify-start'>
            <ActionButton setSelectedPage={setSelectedPage} page={SelectedPage.OurClasses}>
              Join Now
            </ActionButton>
            <AnchorLink
              className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
              onClick={() => setSelectedPage(SelectedPage.ContactUs)}
              href={`#${SelectedPage.ContactUs}`}
            >
              <p>Learn More</p>
            </AnchorLink>
          </motion.div>
        </div>
        {/* image */}
        <div className='md:mt-15 flex items-center justify-center md:basis-2/5'>
          <img src={Hero} alt="home-page-graphic" className={(isAboveMediumScreen) ? "" : "h-96"} />
        </div>
      </motion.div>
      {/* sponsors */}
      {
        isAboveMediumScreen && (
          <div className="h-[125px] w-full bg-primary-100 py-10">
            <div className="mx-auto w-5/6">
              <div className="flex w-3/5 items-center justify-between gap-8">
                <img src={Sponsor1} alt="Sponsor1" />
                <img src={Sponsor2} alt="Sponsor2" />
                <img src={Sponsor3} alt="Sponsor3" />
              </div>
            </div>
          </div>
        )
      }
    </section>
  )
}

export default index