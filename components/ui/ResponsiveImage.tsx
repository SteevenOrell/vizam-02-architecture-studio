import { getImageProps, type ImageProps } from 'next/image';

/** Use Next's optimizer, but never advertise a raster variant wider than its source. */
export default function ResponsiveImage({ placeholder: _placeholder, blurDataURL: _blur, priority, ...input }: ImageProps) {
  void _placeholder;
  void _blur;
  const { props } = getImageProps({ ...input, loading: priority ? 'eager' : input.loading, fetchPriority: priority ? 'high' : input.fetchPriority });
  const source = typeof input.src === 'object' ? ('default' in input.src ? input.src.default : input.src) : null;
  if (source && props.srcSet) {
    const candidates = props.srcSet.split(',').map(s => s.trim()).filter(s => {
      const width = s.match(/\s(\d+)w$/);
      return !width || Number(width[1]) <= source.width;
    });
    props.srcSet = candidates.length ? candidates.join(', ') : undefined;
    props.src = candidates.length ? candidates[candidates.length - 1].replace(/\s\d+w$/, '') : source.src;
  }
  // getImageProps retains Next optimization, intrinsic dimensions and responsive loading.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} />;
}
