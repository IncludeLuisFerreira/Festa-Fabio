tailwind.config = {
  theme: {
    extend: {
      colors: {
        festival: {
          bg: '#0a0a12',
          panel: '#12121f',
          neon: '#facc15',     // amarelo neon (destaque Rock in Rio)
          hot: '#fb7185',      // rosa/vermelho vibrante
          violet: '#a78bfa'    // violeta
        }
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        titling: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 24px rgba(250, 204, 21, 0.35)',
        'neon-strong': '0 0 42px rgba(250, 204, 21, 0.55)'
      }
    }
  }
};
