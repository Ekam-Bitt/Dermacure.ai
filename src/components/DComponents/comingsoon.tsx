import React from 'react';

type Props = {};

import Image from 'next/image';

const ComingSoon = (props: Props) => {
  return (
    <div className="justify-center items-center h-screen">
      <Image src="/comingsoon.png" alt="comingsoon"/>
      <h1 className="text-center text-2xl">Coming Soon</h1>
    </div>
  );
};

export default ComingSoon;
