declare module '@emotion/react' {
  export interface Theme {
    colors: {
      GN50: string;
      GN500: string;
      BK50: string;
      BK500: string;
      NN950: string;
      NN300: string;
      NN200: string;
    };
    radius: string
  }
}

export const theme = {
  colors: {
    'GN50' : '#ECFEF4',
    'GN500': '#00AA5B',
    'BK50' : 'rgba(49,53,59,0.68)',
    'BK500': 'rgba(49,53,59,0.96)',
    'NN950': '#212121',
    'NN300': '#BFC9D9',
    'NN200': '#D6DFEB'
  },
  radius: '8px'
};