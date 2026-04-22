export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF8F6',
          100: '#F5F3F0',
          200: '#EBE7E0',
          600: '#9B8B6D',
          700: '#8B7B5D',
          800: '#7B6B4D',
        },
        secondary: {
          50: '#F7FAF5',
          100: '#F0F5ED',
          600: '#8FAF7A',
          700: '#7A9563',
          800: '#6B8654',
        },
        accent: '#D4AF37',
        success: '#5FB878',
        warning: '#F5A623',
        error: '#E85D75',
        info: '#4A90E2',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        h1: ['48px', '1.2'],
        h2: ['36px', '1.2'],
        h3: ['28px', '1.2'],
        h4: ['24px', '1.2'],
        body: ['16px', '1.6'],
        small: ['14px', '1.5'],
        tiny: ['12px', '1.4'],
      },
      borderRadius: {
        button: '8px',
        card: '12px',
      },
      boxShadow: {
        subtle: '0 2px 4px rgba(0, 0, 0, 0.05)',
        light: '0 2px 8px rgba(0, 0, 0, 0.08)',
        medium: '0 4px 12px rgba(0, 0, 0, 0.12)',
        strong: '0 8px 24px rgba(0, 0, 0, 0.16)',
        hover: '0 12px 32px rgba(0, 0, 0, 0.2)',
      },
      transitionDuration: {
        smooth: '0.3s',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      screens: {
        xs: '0px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
