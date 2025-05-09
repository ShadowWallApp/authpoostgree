// src/theme.js
import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        white: { value: '#FFFFFF' },
        gray: {
          50: { value: '#F7FAFC' },
          200: { value: '#EDF2F7' },
          500: { value: '#6B7280' },
          600: { value: '#4A5568' },
          700: { value: '#2D3748' },
          800: { value: '#1A202C' },
          900: { value: '#171923' },
        },
        blue: {
          500: { value: '#3B82F6' },
        },
        teal: {
          500: { value: '#319795' },
        },
      },
    },
  },
});