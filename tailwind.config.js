/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                charm: ['"Charm"', 'sans-serif'], // Add 'Charm' font
                sen: ['"Sen"', 'Arial'], // Add 'Sen' font
            },
            boxShadow: {
                textGlow: '0px 0px 10px 5px rgba(202, 187, 255, 0.6)',
            }
        },
    },
    plugins: [],
    }

