import Stack from '@components/stack';
import { Product } from '@utils/dtos';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';

export default function ImageList({ images }: { images: Product['images'] }) {
  return (
    <Stack direction="row" scroll="x" fullWidth>
      {images &&
        images.map((image) => (
          <div key={image.id} style={{ position: 'relative' }}>
            <img
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
            <div
              style={{
                position: 'absolute',
                right: '8px',
                bottom: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <PencilIcon
                size={16}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'var(--lds-color-pure-white)',
                  overflow: 'visible',
                  padding: '8px',
                  borderRadius: '50%',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 25%)',
                }}
              />
              <TrashIcon
                size={16}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'var(--lds-color-pure-white)',
                  overflow: 'visible',
                  padding: '8px',
                  borderRadius: '50%',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 25%)',
                }}
              />
            </div>
          </div>
        ))}
      <div
        style={{
          minWidth: 'calc(150px - 8px)',
          minHeight: 'calc(200px - 8px)',
          width: 'calc(150px - 8px)',
          height: 'calc(200px - 8px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid var(--lds-color-dark-light)',
          borderRadius: 'var(--lds-radius)',
        }}
      >
        <PlusIcon
          size={64}
          strokeWidth={1.25}
          color="var(--lds-color-dark-light)"
        />
      </div>
    </Stack>
  );
}
