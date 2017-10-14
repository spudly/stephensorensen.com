import React from 'react';

const Hero = ({children, className, ...rest}) => (
  <section {...rest} className={`${className} hero`}>
    {children}
  </section>
);

export default Hero;
