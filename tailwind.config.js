module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        header: '0 0.25rem 1rem 0 rgba(26, 28, 32, 0.06)',
        cshadow: '0 0.5rem 2.5rem 0 rgba(26, 28, 32, 0.1)',
        swiper: '0 0.25rem 1.5rem 0 rgba(38, 42, 51, 0.06)'
      },
      colors: {
        bang: '#3F77FF',
        cblack: '#262A33',
        cbgray: '#F8FAFD',
        cfgray: '#575B66',
        border: '#E8EBEF',
        input: '#F5F8FF',
        'bottom-link': '#9099B4',
        tab: '#F0F4FF',
      },
      height: {
        '18': '4.5rem',
        '20': '5rem',
        '25': '6.25rem',
        '30': '7.5rem',
        '60': '15rem',
        '100': '25rem',
      },
      padding: {
        '25': '6.25rem',
        '30': '7.5rem',
        '90': '22.5rem',
      },
      margin: {
        '18': '4.5rem',
        '25': '6.25rem',
        '30': '7.5rem',
        '90': '22.5rem',
      },
      width: {
        '7.5': '1.875rem',
        '18': '4.5rem',
        '25': '6.25rem',
        '50': '12.5rem',
        '60': '15rem',
        '70': '17.5rem',
        '75': '18.75rem',
        '150': '37.5rem',
        '180': '45rem',
        '240': '60rem',
        '300': '75rem',
      },
      inset: {
        '25': '6.25rem',
        '90': '22.5rem',
      },
      fontSize: {
        '28px': '1.75rem',
        '32px': '2rem',
        'title': '3.5rem',

      }
    },
  },
  variants: {
    extend: {
      inset: ['group-hover'],
      color: ['group-hover'],
      display: ['group-hover'],
      ringColor: ['group-focus'],
      ringWidth: ['group-focus'],
      margin: ['even', 'first', 'group-hover', 'hover'],
      padding: ['even', 'first', 'group-hover', 'hover'],
    },
  },
  plugins: [],
}
