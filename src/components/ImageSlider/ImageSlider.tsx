import { useEffect, useState } from 'react';

import { Box, Slide } from '@mui/material';

type Prop = {
  images: string[];
};

function ImageSlider(props: Prop) {
  const [currentItem, setCurrentItem] = useState(0);

  let slideInterval: NodeJS.Timeout;
  const slide = (itemNumber: number) => {
    setCurrentItem(itemNumber);
    clearInterval(slideInterval);
  };
  useEffect(() => {
    if (currentItem !== props.images.length - 1) {
      slideInterval = setInterval(() => {
        slide(currentItem + 1);
      }, 5000);
    } else {
      slideInterval = setInterval(() => {
        slide(0);
      }, 5000);
    }
    return () => clearInterval(slideInterval);
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        paddingTop: '1rem',
        height: { xs: 100, md: 200 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {props.images.map((item, i) => (
        <Slide
          in={currentItem === i}
          direction={currentItem === i ? 'left' : 'right'}
          key={i}
        >
          <Box
            component='img'
            sx={{
              position: 'absolute',
              width: { xs: 150, md: 300 },
              height: { xs: 75, md: 150 },
              objectFit: 'contain',
            }}
            src={item}
          />
        </Slide>
      ))}
    </Box>
  );
}

export default ImageSlider;
