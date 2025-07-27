import Stack from '@components/stack';
import { Product } from '@utils/dtos';

export default function ImageList({ images }: { images: Product['images'] }) {
  return (
    <Stack direction="row" fullWidth>
      {images &&
        images.map((image) => (
          <img
            key={image.id}
            src={image.image_url}
            alt={'Product Image'}
            style={{
              width: '150px',
              height: '200px',
              borderRadius: 'var(--lds-radius)',
              objectFit: 'cover',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 25%)',
            }}
          />
        ))}
    </Stack>
  );
}
