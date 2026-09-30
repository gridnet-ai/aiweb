import { useEffect, useState } from 'react';
import type { PublisherStoryId } from '@/demo/quoteReplayStories';
import { AiwebOsMailScene } from './AiwebOsMailScene';
import { aiwebOsStoryConfig } from './aiwebOsStoryConfigs';

type Phase =
  | 'hold'
  | 'page-call'
  | 'incoming'
  | 'select'
  | 'type-callback'
  | 'send'
  | 'done';

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

type AiwebOsMailAnimationProps = {
  storyId?: PublisherStoryId;
};

/** AIWEB Mail — incoming calls from the published page and owner callbacks. */
export function AiwebOsMailAnimation({ storyId = 'shopper' }: AiwebOsMailAnimationProps) {
  const mailConfig = aiwebOsStoryConfig(storyId).mail;
  const featuredLeadId = mailConfig.featuredLeadId;

  const [phase, setPhase] = useState<Phase>('hold');
  const [needsYou, setNeedsYou] = useState(14);
  const [showFeaturedLead, setShowFeaturedLead] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showIncoming, setShowIncoming] = useState(false);
  const [callbackText, setCallbackText] = useState('');
  const [sentCallback, setSentCallback] = useState(false);
  const [pagePhone, setPagePhone] = useState('');
  const [showPageCard, setShowPageCard] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const callback = mailConfig.callbackMessage;

    const run = async () => {
      while (!cancelled) {
        setPhase('hold');
        setNeedsYou(14);
        setShowFeaturedLead(false);
        setSelectedId(null);
        setShowIncoming(false);
        setCallbackText('');
        setSentCallback(false);
        setPagePhone('');
        setShowPageCard(false);
        await sleep(1200);
        if (cancelled) return;

        setPhase('page-call');
        setShowPageCard(true);
        for (let i = 1; i <= 11; i++) {
          if (cancelled) return;
          setPagePhone('87346512540'.slice(0, i));
          await sleep(55);
        }
        await sleep(700);
        if (cancelled) return;
        setShowPageCard(false);

        setPhase('incoming');
        setShowFeaturedLead(true);
        setNeedsYou(15);
        await sleep(900);
        if (cancelled) return;

        setPhase('select');
        setSelectedId(featuredLeadId);
        setShowIncoming(true);
        await sleep(1200);
        if (cancelled) return;

        setPhase('type-callback');
        for (let i = 1; i <= callback.length; i++) {
          if (cancelled) return;
          setCallbackText(callback.slice(0, i));
          await sleep(28);
        }
        await sleep(500);
        if (cancelled) return;

        setPhase('send');
        setSentCallback(true);
        setCallbackText('');
        await sleep(400);
        if (cancelled) return;

        setPhase('done');
        await sleep(4500);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [storyId, mailConfig.callbackMessage, featuredLeadId]);

  return (
    <AiwebOsMailScene
      config={mailConfig}
      phase={phase}
      needsYou={needsYou}
      showFeaturedLead={showFeaturedLead}
      selectedId={selectedId}
      showIncoming={showIncoming}
      callbackText={callbackText}
      sentCallback={sentCallback}
      showPageCard={showPageCard}
      pagePhone={pagePhone}
      isTypingCallback={phase === 'type-callback'}
    />
  );
}
