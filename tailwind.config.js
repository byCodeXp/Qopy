
module.exports = {
   content: ["./src/**/*.{html,tsx}"],
   theme: {
      extend: {
         colors: {
            'common-color': '#222222',
            'accent-color': '#333333',
            'primary-color': '#1b1b1b'
         },
         fontFamily: {
            mono: ['JetBrains Mono', 'monospace']
         }
      }
   },
   plugins: [],
}