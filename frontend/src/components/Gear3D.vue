<template>
    <div class="gear-container">
      <svg class="gear" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#888;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#444;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M50 10
                 L54 14 L60 11 L62 17 L68 16 L68 22 L74 23 L72 29 L77 32 L73 37 L77 41 L71 45 L74 50
                 L67 52 L68 58 L61 58 L60 64 L53 62 L50 67 L44 64 L40 67 L36 62 L29 64 L28 58 L21 58
                 L22 52 L15 50 L18 45 L12 41 L16 37 L12 32 L17 29 L15 23 L21 22 L21 16 L27 17 L29 11
                 L35 14 L39 10 L44 14 Z" fill="url(#gearGradient)" />
        <circle cx="50" cy="50" r="10" fill="#555" />
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Gear3D'
  }
  </script>
  
  <style scoped>
  .gear-container {
    width: 100px;
    height: 100px;
    margin: 20px auto;
    perspective: 1000px;
  }
  
  .gear {
    width: 100%;
    height: 100%;
    animation: spin 10s linear infinite;
    transform-style: preserve-3d;
    filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
  }
  
  @keyframes spin {
    0% { transform: rotateZ(0deg); }
    100% { transform: rotateZ(360deg); }
  }
  </style>
  