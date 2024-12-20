<div class="flex flex-col gap-0 items-center justify-center h-full">
    <h1 class="text-[2.578vw] text-white font-charm leading-[97%] select-none">
        Surajit <br/> Sutradhar
    </h1>
    <p class="text-[0.833vw] font-sen text-[#CABBFF] select-none ">DESIGNER <span class="font-charm lg:text-[0.9vw]">&</span> DEVELOPER</p>
</div>
  













<style lang="postcss">
:global(:root){

}

:global(html, body) {
    height: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
}

:global(body) {
    background-image: url('/DesktopBackground.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
}
:global(main) {
    position: relative; /* Ensure the content scrolls over the background */
    z-index: 1;
    padding: 0 1.7vw; /* Add padding to avoid content touching the edges */
    color: #333; /* Text color for readability */
}

:global(body) {
    background-attachment: scroll; /* Fallback for mobile devices */
}

@media (min-width: 768px) {
    :global(body) {
        background-attachment: fixed;
    }
}

/* Ensure that the flex container takes up the full height */
:global(.flex) {
    display: flex;
    height: 100vh; /* Take up the full height of the viewport */
}

</style>
