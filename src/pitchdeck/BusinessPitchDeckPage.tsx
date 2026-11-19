import { VerticalPitchDeckPage } from '@/pitchdeck/ProsperPitchDeckPage';
import { PROSPER_DECK_SLIDES as BUSINESS_DECK_SLIDES } from '@/pitchdeck/businessContent';

/** Business vertical deck — edit `businessContent.ts` for Business-specific copy. */
export function BusinessPitchDeckPage() {
  return (
    <VerticalPitchDeckPage
      coverAccent="For Business"
      brandName="AIWEB for Business"
      documentTitle="AIWEB — Business Pitch Deck"
      accentTone="business"
      deckSlides={BUSINESS_DECK_SLIDES}
    />
  );
}
