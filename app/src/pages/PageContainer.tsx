import React from 'react';
import Container from '@mui/material/Container';
import { SxProps } from '@mui/material';


type PageContainerProps = {
  sx?: SxProps
}

export default function PageContainer({ children, sx }: React.PropsWithChildren<PageContainerProps>) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        gap: 2,
        padding: 4,
        paddingTop: 4,
        ...sx,
      }}
    >
      {children}
    </Container>
  );
}
