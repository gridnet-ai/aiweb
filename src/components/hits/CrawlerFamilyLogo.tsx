import type { CrawlerFamilyBrandMeta } from '@/lib/hits/crawlerFamilyBrand';

type Props = {
  meta: CrawlerFamilyBrandMeta;
  size?: number;
  className?: string;
};

export function CrawlerFamilyLogo({ meta, size = 28, className = '' }: Props) {
  const shared = `shrink-0 rounded object-contain ${className}`.trim();
  if (!meta.logo) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded bg-neutral-100 text-[10px] font-semibold text-neutral-400 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        ?
      </span>
    );
  }
  if (!meta.logoDark) {
    return (
      <img src={meta.logo} alt="" width={size} height={size} loading="lazy" className={shared} aria-hidden />
    );
  }
  return (
    <>
      <img
        src={meta.logo}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className={`${shared} dark:hidden`}
        aria-hidden
      />
      <img
        src={meta.logoDark}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className={`${shared} hidden dark:block`}
        aria-hidden
      />
    </>
  );
}
