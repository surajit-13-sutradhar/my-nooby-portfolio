<!-- Svelte Script -->

<script>
    import {SvelteDate} from 'svelte/reactivity'
    import {onMount} from 'svelte'
    import {Spring} from 'svelte/motion'
    // import Rect from './Rect.svelte'

    // Date Time Functionality
    let date = new SvelteDate()

    const pad = (n) => n < 10 ? '0' + n : n

    $effect(() => {
        const interval = setInterval(() => {
            date.setTime(Date.now())
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    })

    // NavLinks functionality

    let sections = [] //array of section elements
    let activeLink = $state('home') //default active link
    // function to update the activelink based on the scroll position
    function updateActiveLink(){
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect()
            if(rect.top <= 100 && rect.bottom >= 100){
                activeLink = section.id //update active link
            }
        })
    }
    // smooth scrolling to a section when a link is clicked
    function scrollToSection(id, event) {
        event.preventDefault()
        const target = document.getElementById(id)
        if(target){
            target.scrollIntoView({behaviour: "smooth"})
        }
    }
    // Initialize sections on component mount
    onMount(() => {
        sections = Array.from(document.querySelectorAll("section"))
        window.addEventListener("scroll", updateActiveLink)

        return () => {
            window.removeEventListener("scroll", updateActiveLink)
        }
    })

    // Mouse Move functionality
    let coords = $state({x: 50, y: 50})
    let size = $state(10)

    

    // Form handling Functionality
    let name = $state('')
    let email = $state('')
    let message = $state('')


</script>


<!-- ---------- DATE AND TIME ---------- -->
<div id="date-time" class="fixed-bottom-right m-[1.67vw] tracking-custom58 font-sen text-[16px] font-regular text-[#FFFFFF] pr-[1.67vw] custom-selection"> 
    {date.getHours()}:{pad(date.getMinutes())}:{pad(date.getSeconds())}
</div>

<!-- ---------- NAVBAR ---------- -->
<div id="navbar" class="top-0 min-w-full p-[1.67vw] fixed z-50 flex justify-between">
    <!-- Assam India SVG -->
    <div>
        <img src="/assamIndia.svg" alt="Assam India" class="w-[5.365vw] h-[2.917vw] select-none" draggable="false" style="pointer-events: none; -webkit-user-drag: none;">
    </div>

    <!-- Navlinks -->
    <div id="navLinks" class="flex font-sen px-[1.67vw] ">
        <a href="#home" class="hover-underline-animation center text-[#D9D9D9] m-[16px] hover:text-[#FFFFFF] custom-selection"
            >Home</a>
        <a href="#about" class="hover-underline-animation center text-[#D9D9D9] m-[16px] hover:text-[#FFFFFF] custom-selection" >About</a>
        <a href="#contact" class="btn-grad text-[#e9dfdf] p-[16px] hover:text-[#FFFFFF] bg-[#73099D] custom-selection">Contact</a>
    </div>
</div>

<!-- --------------- HOME SECTION ----------------  -->
<section id="home" class="min-h-screen flex flex-col relative">
    <div class="flex flex-col gap-0 items-center justify-center flex-grow">
        <h1 class="text-[2.578vw] text-white font-charm leading-[97%] select-none">
            Surajit <br/> Sutradhar
        </h1>
        <p class="text-[0.833vw] font-sen text-[#CABBFF] select-none ">DESIGNER <span class="font-charm lg:text-[0.9vw]">&</span> DEVELOPER</p>
        <div class="mx-[32px] my-[32px]  absolute left-0 bottom-0">
            <p class="text-[1.67vw] leading-[82%] tracking-tighter text-[#D9D9D9] font-sen custom-selection">
                “Simplicity will stand out, while complexity <br class="custom-selection"/>will get lost in the crowd.”<br class="custom-selection"/>
                <span class="pl-[19.479vw] text-[#FFF] custom-selection">~Kevin Barnett</span>
            </p>
        </div>
    </div>
</section>

<!-- --------------- ABOUT SECTION ---------------- -->
<section id="about" class="min-h-screen flex flex-col">
    <div class="pr-[25.104vw] w-full flex flex-row justify-between relative">
        <div class="w-[33.125vw] flex flex-col justify-end">
            <div class="pl-[32px] pb-[3.333vw]">
                <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white custom-selection">"Passionate about creating visually captivating and user-centric designs, I am a designer who thrives on turning ideas into stunning digital experiences. ut the way people interact with the world."</p>
                <h1 class="font-sen font-bold leading-[100%] text-white text-[9.375vw] pt-[3.333vw] select-none" draggable="false">about</h1>
            </div>
        </div>
        <div class="w-[32.292vw] py-[3.33vw] flex flex-col justify-between">
            <p class="font-medium text-[1.042vw] leading-[100%] text-[#CABBFF] text-right custom-selection">
                "Passionate about creating visually captivating and user-centric designs, I am a designer who thrives on turning ideas into stunning digital experiences. With a keen eye for detail and a love for innovation, I specialize in crafting designs that not only look beautiful but also deliver seamless functionality. Whether it's UI/UX, graphic design, or creative branding, I aim to tell compelling stories through visuals that leave a lasting impression. Constantly exploring trends and pushing boundaries, I believe in the power of design to transform the way people interact with the world."
            </p>
            <div class="w-full h-[32.292vw] bg-gray-400">
                
            </div>
        </div>
    </div>

    <!-- About Continued -->
    <div class="w-[49.844vw] mx-auto my-[3.33vw] gap-0">
        <!-- Section 1 -->
        <div class="h-[15.104vw] relative">
            <div class="w-[13.75vw] flex flex-col">
                <div class="w-full h-[12vw] bg-green-600 cursor-pointer">
                    <!-- Insert image here -->
                </div>
                <span class="hover-underline-animation left font-sen font-medium h-[1.67vw] text-[#D9D9D9] custom-selection">
                    My Github
                </span>
            </div>
        </div>
        
        <!-- Section 2 -->
        <div class="h-[18.49vw] relative">
            <div class="w-[15.625vw] flex flex-col absolute right-0">
                <div class="w-full h-[16vw] bg-blue-400 cursor-pointer">
                    <!-- Insert image here -->
                </div>
                <span class="hover-underline-animation left font-sen font-medium h-[1.67vw] text-[#D9D9D9] custom-selection">
                    My Reads
                </span>
            </div>
        </div>

        <!-- Section 3 -->
        <div class="h-[15.313vw] relative">
            <div class="w-[19.792vw] flex flex-col">
                <div class="w-full h-[13.5vw] bg-yellow-300 cursor-pointer">
                    <!-- Insert image here -->
                </div>
                <span class="hover-underline-animation left font-sen font-medium h-[1.67vw] text-[#D9D9D9] custom-selection">
                    My Blogs
                </span>
            </div>
        </div>

        <!-- Section 4 -->
        <div class="h-[15.313vw] relative">
            <div class="w-[15.625vw] flex flex-col absolute right-0">
                <div class="w-full h-[13.5vw] bg-red-700 cursor-pointer">
                    <!-- Insert image here -->
                </div>
                <span class="hover-underline-animation left font-sen font-medium h-[1.67vw] text-[#D9D9D9] custom-selection inline-block">
                    My Spotify
                </span>
            </div>
        </div>
    </div>

    <!-- ---------- WORKS ---------- -->
    <div id="works" class="w-[49.844vw] h-[16.39vw] mx-auto my-[3.33vw]">
        <div class="pt-[3.33vw] px-[3.33vw] border-b-[1.5px] border-[#FFFFFF]">
            <h2 class="font-sen font-bold text-[1.667vw] text-[#FFFFFF] select-none">Stuff I made</h2>
        </div>
        <div id="project-info" class="py-[1.667vw] px-[3.333vw] h-[6.39vw] border-b-[1.5px] border-[#FFFFFF] flex flex-row items-center justify-between">
            <h3 class="font-sen font-regular text-[2.083vw] text-[#D9D9D9] select-none hover:translate-x-4 transition-all duration-300">This Portfolio</h3>
            <div class="flex items-center gap-5">
                <img src="/linklogo.svg" alt="External Link Svg" class="w-[4.427vw] h-[3.056vw] hover:shadow-[0_0_10px_#D9D9D9] rounded-full transition-shadow duration-600 ease-in-out cursor-pointer" />
            </div>
        </div>
    </div>
</section>

<!-- --------------- CONTACT SECTION ---------------- -->
<section id="contact" class="min-h-screen pr-[25.104vw] w-full flex flex-row justify-between relative">
    <div class="w-[33.125vw] flex flex-col justify-end">
        <div class="ml-[32px] mb-[3.333vw]">
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300"><a href="https://www.linkedin.com/in/surajit-sutradhar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" alt="LinkedIn Link" target="_blank" class="custom-selection inline-block">LinkedIn</a></p>
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300"><a href="https://www.behance.net/surajitsutradh2" alt="Behance Link" target="_blank" class="custom-selection inline-block">Behance</a></p>
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300 w-"><a href="https://x.com/_the_crowww?t=-PVfGMsz4Gq0Sxu6Y1b1mA&s=09" alt="Twitter Handle Link" target="_blank" class="custom-selection inline-block">X</a></p>
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300"><a href="https://www.facebook.com/share/Rn8gVZ7AkDwHSH47/" alt="Facebook Link"  target="_blank" class="custom-selection inline-block">Facebook</a></p>
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300"><a href="https://pin.it/VaLaQDlT6" alt="Pinterest Link" target="_blank" class="custom-selection inline-block">Pinterest</a></p>
            
            <h1 class="font-sen font-bold leading-[100%] text-white text-[9.375vw] pt-[3.333vw] select-none" draggable="false">let's chat</h1>
        </div>
    </div>

    <div id="contact-form" class="w-[23.594vw] flex flex-col justify-center">
        <div id="inputs" class="flex flex-col gap-[1.354vw] w-full">
            <div id="form-group">
                <label for="name" class="font-sen text-[#FFFFFF]">Name</label>
                <input 
                required id="name" 
                type="text" 
                placeholder="Name" 
                class="w-full text-[#FFFFFF] border-none outline-none bg-transparent p-0 focus:ring-0 placeholder:text-[#CABBFF] placeholder:text-sm placeholder:font-sen"
                bind:value={name}
                >
            </div>
            
            <div id="form-group">
                <label for="Email" class="font-sen text-[#FFFFFF]">Email</label>
                <input id="email" 
                required 
                type="email" 
                placeholder="E-mail" 
                name="email"  
                class="w-full text-[#FFFFFF] border-none outline-none bg-transparent p-0 focus:ring-0 placeholder:text-[#CABBFF] placeholder:text-sm placeholder:font-sen" 
                title="Please Enter a valid email address"
                bind:value={email}
                >
            </div>
            
            <div id="form-group">
                <label for="text" class="font-sen text-[#FFFFFF]">Details about your project</label>
                <textarea id="message"
                required  
                type="text" 
                placeholder="Write your message"  class="w-full h-[8.333vw] text-[#FFFFFF] leading-[100%] border-none outline-none bg-transparent p-0 focus:ring-0 resize-none placeholder:text-[#CABBFF] placeholder:text-sm placeholder:font-sen"
                bind:value={message}
                ></textarea>
            </div>
            
        </div>
        <button class="btn-grad px-[32px] py-[16px] inline-block mt-[2.292vw] bg-[#73099D] text-[#FFFFFF] text-[1.25vw] font-sen font-medium self-start">
            Send
        </button>
    </div>
</section>
  




<style lang="postcss">
:global(:root){
    --clr-success: rgb(0, 255, 0);
    --clr-error: red;
}

:global(html, body) {
    height: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    scroll-behavior: smooth;
}

:global(body) {
    background-color: #73099D;
    background-image: url('/DesktopBackground.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
}
:global(main) {
    position: relative; /* Ensure the content scrolls over the background */
    z-index: 1; /* Add padding to avoid content touching the edges */
    color: #333; /* Text color for readability */
}

:global(body) {
    background-attachment: scroll; /* Fallback for mobile devices */
}

:global(.custom-selection::selection) {
    background-color: #D9D9D9; /* Selection background color */
    color: #73099D; /* Text color during selection */
}

.fixed-bottom-right {
    position: fixed;
    bottom: 0px; /* Distance from the bottom */
    right: 0px;  /* Distance from the right */
    z-index: 200; 
}

/* Class for navlinks */
/* .active-link {
        text-decoration: underline; 
        text-underline-offset: 4px;
} */
/* For inputs */
input{
    border-bottom: 2px solid hsl(0, 0%, 100%);
}

textarea{
    border-bottom: 2px solid hsl(0, 0%, 100%);
}

input:not(:placeholder-shown):valid {
    border-color: var(--clr-success);
}

input:not(:placeholder-shown):invalid {
    border-color: var(--clr-error);
}

textarea:not(:placeholder-shown):valid {
    border-color: var(--clr-success);
}

textarea:not(:placeholder-shown):invalid {
    border-color: var(--clr-error);
}

/* Button Animation*/
/* gradient background and hover effect */
.btn-grad {
    background-image: linear-gradient(to right, #DA22FF 0%, #9733EE 51%, #DA22FF 100%);
    transition: background-position 0.5s ease, color 0.5s ease;
    background-size: 200% auto;
    /* color: white; */
    /* text-transform: uppercase; */
}

.btn-grad:hover {
    background-position: right center;
    /* color: #fff; */
    text-decoration: none;
}

/* Hover underline animation */
/* Base Hover Underline Animation */
.hover-underline-animation {
    display: inline-block;
    position: relative;
}

.hover-underline-animation::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1.5px;
    bottom: 0;
    left: 0;
    background-color: #DA22FF;
    transition: transform 0.25s ease-out;
}

/* Center Alignment*/
.hover-underline-animation.center::after {
    transform-origin: bottom center;
}

.hover-underline-animation.center:hover::after {
    transform-origin: bottom center;
    transform: scaleX(1);
}

/* Left Alignment */
.hover-underline-animation.left::after {
    transform-origin: bottom right;
}

.hover-underline-animation.left:hover::after {
    transform-origin: bottom left;
    transform: scaleX(1);
}

@media (min-width: 768px) {
    :global(body) {
        background-attachment: fixed;
    }
}

</style>
