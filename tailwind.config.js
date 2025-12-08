import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    darkMode: "class",

    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                mono: ["var(--font-mono)", ...fontFamily.mono],
            },

            colors: {
                background: "var(--color-background)",
                foreground: "var(--color-foreground)",
                card: "var(--color-card)",
                "card-foreground": "var(--color-card-foreground)",
                popover: "var(--color-popover)",
                "popover-foreground": "var(--color-popover-foreground)",
                primary: "var(--color-primary)",
                "primary-foreground": "var(--color-primary-foreground)",
                secondary: "var(--color-secondary)",
                "secondary-foreground": "var(--color-secondary-foreground)",
                muted: "var(--color-muted)",
                "muted-foreground": "var(--color-muted-foreground)",
                accent: "var(--color-accent)",
                "accent-foreground": "var(--color-accent-foreground)",
                destructive: "var(--color-destructive)",
                border: "var(--color-border)",
                input: "var(--color-input)",
                ring: "var(--color-ring)",
                "chart-1": "var(--color-chart-1)",
                "chart-2": "var(--color-chart-2)",
                "chart-3": "var(--color-chart-3)",
                "chart-4": "var(--color-chart-4)",
                "chart-5": "var(--color-chart-5)",
            },

            borderRadius: {
                sm: "calc(var(--radius) - 4px)",
                md: "calc(var(--radius) - 2px)",
                lg: "var(--radius)",
                xl: "calc(var(--radius) + 4px)",
                "2xl": "calc(var(--radius) + 8px)",
            },
        },
    },

    plugins: [],
};
