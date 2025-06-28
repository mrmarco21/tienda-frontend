import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const StyledFormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

export const ImagePreviewBox = styled(Box)({
  width: '100%',
  height: '200px',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  border: '2px dashed #ccc',
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#eee',
    borderColor: '#FE6B8B',
  },
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
});

export const FileInputBox = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
}); 