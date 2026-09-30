import { ChatGptCateringQuoteReplay } from '@/demo/ChatGptGetQuoteReplay';
import { ChatGptPlumbingQuoteReplay } from '@/demo/ChatGptPlumbingQuoteReplay';
import { ChatGptAlbumMakeReplay } from '@/demo/ChatGptAlbumMakeReplay';
import { ChatGptDressFollowUpReplay } from '@/demo/ChatGptDressFollowUpReplay';
import { ChatGptDressShopReplay } from '@/demo/ChatGptDressShopReplay';
import { publisherStoryMeta, type PublisherStoryId } from '@/demo/quoteReplayStories';

type PublisherStoryPanelProps = {
  story: PublisherStoryId;
};

export function PublisherStoryPanel({ story }: PublisherStoryPanelProps) {
  const meta = publisherStoryMeta(story);

  return (
    <div className="publisher-story-panel" key={story}>
      <div className="mx-auto mb-8 max-w-[720px] text-center">
        <p className="mx-auto max-w-[40rem] font-display text-[clamp(1.2rem,3.6vw,1.65rem)] font-extrabold leading-snug tracking-[-0.03em] text-[#f4f1ec]">
          {meta.intro}
        </p>
      </div>

      {story === 'shopper' ? (
        <>
          <ChatGptDressShopReplay />
          <ChatGptDressFollowUpReplay />
        </>
      ) : null}

      {story === 'catering' ? <ChatGptCateringQuoteReplay /> : null}

      {story === 'plumbing' ? <ChatGptPlumbingQuoteReplay /> : null}

      {story === 'album' ? <ChatGptAlbumMakeReplay /> : null}
    </div>
  );
}
