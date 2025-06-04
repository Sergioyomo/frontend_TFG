import React, { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImageUpload = ({ onImageSelected, initialImage = null }) => {
  const [image, setImage] = useState(initialImage);
  const [error, setError] = useState('');

  const handleImageChange = useCallback((event) => {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecciona un archivo de imagen válido');
      return;
    }
    
    // Validar tamaño (ejemplo: máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe exceder los 5MB');
      return;
    }
    
    setError('');
    
    // Crear URL para previsualización
    const imageUrl = URL.createObjectURL(file);
    
    // Convertir a Blob
    const reader = new FileReader();
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: file.type });
      const imageData = {
        name: file.name,
        type: file.type,
        size: file.size,
        blob,
        preview: imageUrl,
        file // Opcional: mantener el objeto File original
      };
      
      setImage(imageData);
      if (onImageSelected) {
        onImageSelected(imageData);
      }
    };
    reader.readAsArrayBuffer(file);
    
  }, [onImageSelected]);

  const handleRemoveImage = useCallback(() => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
    setError('');
    if (onImageSelected) {
      onImageSelected(null);
    }
  }, [image, onImageSelected]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {/* Previsualización de la imagen */}
      {image ? (
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={image.preview}
            variant="rounded"
            sx={{ 
              width: 200, 
              height: 200,
              borderRadius: 2,
              boxShadow: 3
            }}
          />
          <IconButton
            aria-label="delete"
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ) : (
        <Avatar
          variant="rounded"
          sx={{ 
            width: 200, 
            height: 200,
            bgcolor: 'action.selected',
            borderRadius: 2
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 60 }} />
        </Avatar>
      )}
      
      {/* Botón para seleccionar imagen */}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        color={image ? 'secondary' : 'primary'}
      >
        {image ? 'Cambiar imagen' : 'Seleccionar imagen'}
        <VisuallyHiddenInput 
          type="file"
          onChange={handleImageChange}
          accept="image/*" // Solo acepta imágenes
        />
      </Button>
      
      {/* Mensaje de error */}
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      
      {/* Información de la imagen */}
      {image && (
        <Typography variant="caption" color="text.secondary">
          {image.name} • {(image.size / 1024).toFixed(2)} KB
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;