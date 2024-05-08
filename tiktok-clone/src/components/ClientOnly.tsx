'use client';
// wrapper component to prevent hydration error

import React, { useEffect, useState } from 'react';
React;

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div>{isClient ? <div>{children}</div> : null}</div>;
};

export default ClientOnly;
