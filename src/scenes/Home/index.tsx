'use client';

import React from 'react';

import Dots from '@/public/dots.svg';
import DonationSidebar from '@/scenes/Home/donation-sidebar';
import FrequentAskedQuestions from '@/scenes/Home/frequent-asked-questions';
import Info from '@/scenes/Home/info';
import Rewards from '@/scenes/Home/rewards';
import Subscribe from '@/scenes/Home/subscribe';
import s from './home.module.scss';
import { LayoutGroup, motion } from 'framer-motion';

const Home = () => {
  return (
    <div
      className={s.container}
      style={{
        backgroundImage: `url(${Dots.src})`,
      }}
    >
      <motion.div className={s.wrapper}>
        <LayoutGroup>
          <motion.div className={s.main} layout>
            <motion.div layout>
              <Info />
            </motion.div>
            <motion.div layout>
              <Rewards />
            </motion.div>
            <motion.div layout>
              <FrequentAskedQuestions />
            </motion.div>

            <motion.div layout>
              <Subscribe />
            </motion.div>
          </motion.div>
        </LayoutGroup>

        <div className={s.sidebar}>
          <DonationSidebar />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
