import { IconButton, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { useState } from 'react';

import ArrowCircleDown from '@/components/icons/arrow';
import { data } from './data';
import s from './frequentaskedquestions.module.scss';
import { LayoutGroup, motion } from 'framer-motion';

const FrequentAskedQuestions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number>();

  return (
    <LayoutGroup>
      <motion.div className={s.container} layout>
        <motion.div layout>
          <Typography variant="h4">Frequently Asked Questions</Typography>
        </motion.div>

        <motion.div className={s.content} layout>
          {data.map((item, index) => (
            <motion.div className={s.item} key={index} layout>
              <motion.header
                // className={clsx([s.item])}
                layout
                onClick={() => {
                  setSelectedQuestion((prevIdx) => (prevIdx === index ? undefined : index));
                }}
              >
                <Typography className={s.question} variant="h6" fontWeight={300}>
                  {item.title}
                </Typography>
                <IconButton className={clsx([s.arrow, selectedQuestion === index ? s.open : ''])}>
                  <ArrowCircleDown />
                </IconButton>
              </motion.header>

              {selectedQuestion === index && (
                <motion.div
                  // key={index}
                  // layout="size"
                  layout
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20 }}
                  transition={
                    {
                      // ease: 'easeIn',
                    }
                  }
                >
                  <motion.div className={clsx(s.answer)}>
                    <Typography color="gray" className={s.answerText}>
                      {item.content}
                    </Typography>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};

export default FrequentAskedQuestions;
