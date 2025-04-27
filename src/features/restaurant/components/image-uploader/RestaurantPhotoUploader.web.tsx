import React, { useRef, useState, useEffect } from 'react';
import { useUploadRestaurantPhoto } from '../../hooks/useUploadRestaurantPhoto';
import { ActivityIndicator } from 'react-native';

interface Props {
  restaurantId: string;
}

const RestaurantPhotoUploaderWeb: React.FC<Props> = ({ restaurantId }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutateAsync, isPending } = useUploadRestaurantPhoto(restaurantId);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_FILE_SIZE) {
      alert('El archivo debe ser menor a 5 MB');
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Solo se permiten imágenes en formato JPEG o PNG');
      return;
    }

    setPreview(URL.createObjectURL(file));

    try {
      await mutateAsync(file);
      alert('Imagen subida correctamente');
    } catch (err) {
      alert('Error al subir la imagen');
    } finally {
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: 200, height: 200, objectFit: 'cover', marginBottom: 16 }}
        />
      )}

      <button
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
        style={{
          padding: '8px 16px',
          backgroundColor: isPending ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
      >
        {isPending ? 'Subiendo...' : 'Seleccionar imagen'}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {isPending && (
        <div style={{ marginTop: 12 }}>
          <ActivityIndicator size="small" color="#007bff" />
          <span style={{ marginLeft: 8 }}>Subiendo imagen...</span>
        </div>
      )}
    </div>
  );
};

export default RestaurantPhotoUploaderWeb;