import React from 'react';

import '../styles/tailwind.css';
import {useSparkleEffect} from './sparkle-button';
import {MobileChat} from './chat-mobile';
import {DesktopChat} from './chat-desktop';

// All sparkle timings derive from this one value
const SPARKLE_DURATION_MS = 10_000;

// Module-level so the regex runs once synchronously — avoids a first-render flicker
const isMobile = /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent);

export const ChatWidget: React.FC = () => {
  const sparkle = useSparkleEffect(SPARKLE_DURATION_MS);
  return isMobile ? (
    <MobileChat sparkle={sparkle} />
  ) : (
    <DesktopChat sparkle={sparkle} />
  );
};

export default ChatWidget;
