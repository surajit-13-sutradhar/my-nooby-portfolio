<script>
    import "../app.css";
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    injectSpeedInsights();
</script>

<main>
    <!-- This is where the child route content will be rendered -->
    <slot />
</main>
