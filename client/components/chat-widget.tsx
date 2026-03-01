import React, {useCallback, useState} from 'react';

import '../styles/tailwind.css';
import {useSparkleEffect} from './sparkle-button';
import {MobileChat} from './chat-mobile';
import {DesktopChat} from './chat-desktop';
import {useCancelChallenge} from '../state/chat-runtime';

// All sparkle timings derive from this one value
const SPARKLE_DURATION_MS = 10_000;

// Module-level so the regex runs once synchronously — avoids a first-render flicker
const isMobile = /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent);

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sparkle = useSparkleEffect(SPARKLE_DURATION_MS, isOpen);
  const cancelChallenge = useCancelChallenge();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) cancelChallenge();
    },
    [cancelChallenge],
  );

  return isMobile ? (
    <MobileChat sparkle={sparkle} onOpenChange={handleOpenChange} />
  ) : (
    <DesktopChat sparkle={sparkle} onOpenChange={handleOpenChange} />
  );
};

export default ChatWidget;
