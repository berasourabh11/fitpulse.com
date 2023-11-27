import React from 'react'
import { SelectedPage } from '../../shared/types'
import ActionButton from '../../shared/ActionButton'
import title from '../../assets/title.png'
import useMediaQuery from '../../hooks/useMediaQuery '
import AnchorLink from 'react-anchor-link-smooth-scroll'


type Props = {
  setSelectedPage: (value:SelectedPage) => void;
}

const index = ({setSelectedPage}: Props) => {
  const isAboveMediumScreen = useMediaQuery("(min-width:1060px")

  return (
    <section id='home' className='gap-16 bg-gray-20 py-10 md:h-full md:pb-0'>
        {/* Image and Main Header */}
        <div>
          {/* MAIN HEADER */}
          <div>
            {/* Headings */}
            <div>
              <div>
                <div>
                  <img src={title} alt="home-page-title" />
                </div>
              </div>
              <p>
              At FitPulse, we believe in cultivating strength both physically and mentally. Join us for a unique fusion of gym workouts and self-defense classes, making every visit a step towards a healthier, more confident you. 
              </p>
            </div>
            {/* actons */}
            <div>
              <ActionButton setSelectedPage={setSelectedPage} page={SelectedPage.OurClasses}>
                Join Now
              </ActionButton>
            </div>
          </div>
        </div>
    </section>
  )
}

export default index