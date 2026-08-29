tailwind.config = {
  theme: {
    extend: {
      colors: {
        festival: {
          bg: '#0a0a12',
          panel: '#12121f',
          neon: '#facc15',     // amarelo vibrante (acento principal)
          cyan: '#22d3ee',     // azul ciano neon
          turquoise: '#2dd4bf', // turquesa
          hot: '#fb7185'       // rosa (estado negativo "não vou")
        }
      },
      fontFamily: {
        display: ['"Bungee"', 'cursive'],
        titling: ['"Saira Stencil One"', 'cursive'],
        brush: ['"Permanent Marker"', 'cursive'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 24px rgba(250, 204, 21, 0.35)',
        'neon-strong': '0 0 42px rgba(250, 204, 21, 0.55)'
      }
    }
  }
};
