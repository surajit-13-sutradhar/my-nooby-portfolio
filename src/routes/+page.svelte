<!-- Svelte Script -->

<script>
    import {SvelteDate} from 'svelte/reactivity'
    import {onMount} from 'svelte'
    import {Spring} from 'svelte/motion'
    import { invalidate } from '$app/navigation'
    import {fly, fade} from 'svelte/transition'
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

    // Flying Transition of Heading
    let visible = true


    // Form handling Functionality
    // FIREBASE_URL: https://my-portfolio-crow-default-rtdb.asia-southeast1.firebasedatabase.app/
    let name = $state('')
    let email = $state('')
    let message = $state('')

    let showSuccess = $state(false)
    let showWarning = $state(false)
    let showError = $state(false)

    const resetAlert = () => {
        setTimeout(() => {
            showSuccess = false;
            showWarning = false;
            showError = false
        }, 5000) //hide the alert after 5 seconds
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        showSuccess = false;
        showWarning = false;
        showError = false;
        

        if (!name.trim() || !email.trim() || !message.trim()) {
            // Show the warning alert here
            showWarning = true
            alert("Please fillup all the fields before sending")
            resetAlert()
            return; // Stop execution if validation fails
        }

        // Sending Data to Firebase
        const response = await fetch('https://my-portfolio-crow-default-rtdb.asia-southeast1.firebasedatabase.app/clientDataRecords.json',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,  //using state variables
                    email,
                    message
                }),
            }
        );

        if (response){
            console.log(response)
            // Show the success alert here
            showSuccess = true
            alert("Your message was sent! I will contact you soon:)")
            resetAlert()
            
        } else {
            // Show the error alert here
            showError = true
            alert("Failed to send message :( Check your connectivity or try again later")
            resetAlert()
        }

        // Clearing form fields after submission
        name = ''
        email = ''
        message = ''
    }

    // Navbar Toggle
    let isNavOpen = $state(false)
    let isToggling = $state(false)

    // toggle function
    function toggleNav() {
        // prevent rapid toggling while the ani
        if(isToggling) return
        isNavOpen = !isNavOpen
    }

    
    

</script>


<!-- ---------- Success Alert Card ----------- -->
<div class="z-99999 left-1/2 fixed z-50 hidden">
    <p class="font-sen text-[12px] px-[1.67vw] py-[3.33vw] text-[#FFFFFF] border-[1.5px] border-green-500 rounded-[16px] backdrop-blur-2xl mt-[0.5vw]">Your message was sent successfully!<br/> I'll reach out to you soon 😊  </p>
</div>

<!-- Warning alert card -->
<div class="z-99999 left-1/2 fixed z-50 hidden">
    <p class="font-sen text-[12px] px-[1.67vw] py-[3.33vw] text-[#FFFFFF] border-[1.5px] border-yellow-500 rounded-[16px] backdrop-blur-2xl mt-[0.5vw]">Please fill out all the fields before submitting 🥺</p>
</div>

<!-- Error alert card -->
<div class="z-99999 left-1/2 fixed z-50 hidden">
    <p class="font-sen text-[12px] px-[1.67vw] py-[3.33vw] text-[#FFFFFF] border-[1.5px] border-red-500 rounded-[16px] backdrop-blur-2xl mt-[0.5vw]">Oops! There was an error 😭 <br> Check connectivity or try again later... </p>
</div>
 


<!-- ---------- DATE AND TIME ---------- -->
<div id="date-time" class="fixed-top fixed-bottom-right m-[1.67vw] tracking-custom58 font-sen text-[16px] font-regular text-[#FFFFFF] pr-[1.67vw] custom-selection "> 
    {date.getHours()}:{pad(date.getMinutes())}:{pad(date.getSeconds())}
</div>

<!-- ---------- NAVBAR ---------- -->

<!-- Assam India SVG -->
<div class="assam-svg left-1 top-1 fixed z-30">
    <img src="/assamIndia.svg" alt="Assam India" class="w-[5.365vw] h-[2.917vw] select-none " draggable="false" style="pointer-events: none; -webkit-user-drag: none;">
</div>

<!-- Toggle Button -->
<button 
    class="mobile-nav-toggle absolute" aria-controls="primary-navigation" aria-expanded={isNavOpen}
    class:close={isNavOpen}
    class:hamburger={!isNavOpen}
    onclick={toggleNav}
>
    <span class="sr-only">{isNavOpen ? 'CLose Menu' : 'Open Menu'}</span>
</button>

<!-- Navlinks or Primary navigation -->
<header id="navLinks" class="primary-navigation flex font-sen font-regular fixed z-30 right-[1.67vw] top-1" class:open={isNavOpen}>
    <a href="#home" class="hover-underline-animation  font-thin text-[14px] center m-[16px] text-[#FFFFFF] custom-selection"
        ><span aria-hidden="true">Home</span></a>
    <a href="#about" class="hover-underline-animation  font-regular text-[14px] center m-[16px] text-[#FFFFFF] custom-selection" >About</a>
    <a href="#contact" class="hover-underline-animation  font-bold text-[14px] center m-[16px] text-[#93e0ff] custom-selection" ><span aria-hidden="true">Contact</span></a>
</header>

<!-- --------------- HOME SECTION ----------------  -->
<section id="home" class="min-h-screen flex flex-col relative">
    
    <div class="flex flex-col gap-0 items-center justify-center flex-grow">
        <div class="intro">
            <h1 class="my-name text-[2.578vw] text-white font-charm leading-[97%] select-none">
                Surajit <br/> Sutradhar
            </h1>
            <p class="my-designnation text-[0.833vw] font-sen text-[#CABBFF] select-none">DESIGNER <span class="font-charm lg:text-[0.9vw]">&</span> DEVELOPER</p>
        </div>
        
        <div class="quote-box mx-[32px] my-[32px]  absolute left-0 bottom-0">
            <p class="quote text-[1.67vw] leading-[82%] tracking-tighter text-[#D9D9D9] font-sen custom-selection">
                Simplicity will stand out, while complexity <br class="custom-selection"/>will get lost in the crowd.<br class="custom-selection"/>
                <span class="speaker pl-[19.479vw] text-[#FFF] custom-selection">Kevin Barnett</span>
            </p>
        </div>
    </div>
</section>

<!-- --------------- ABOUT SECTION ---------------- -->
<section id="about" class="min-h-screen flex flex-col">
    <div class="h-[1px] bg-[#3872f0] mx-[15vw]"></div>
    <div class="intro-mobile pr-[25.104vw] w-full flex flex-row justify-between relative ">
        <div class="about-mobile w-[33.125vw] flex flex-col justify-end">
            <div class="top-intro-mobile pl-[32px] pb-[3.333vw]">
                <p class="about-text-mobile font-sen font-medium leading-[100%] text-[1.667vw] text-white custom-selection">"Passionate about creating visually captivating and user-centric designs, I am a designer who thrives on turning ideas into stunning digital experiences. ut the way people interact with the world."</p>
                <h1 class="about-heading-mobile font-sen font-bold leading-[100%] text-white text-[9.375vw] pt-[3.333vw] select-none" draggable="false">about</h1>
            </div>

        </div>

        

        <div class="photo-mobile w-[32.292vw] pt-[7.2vw] flex flex-col justify-end items-end gap-[1.5rem]">
            <p class="photo-text-mobile font-medium text-[1.042vw] leading-[100%] text-[#CABBFF] text-right custom-selection w-[70%]">
                "Passionate about creating visually captivating and user-centric designs, I am a designer who thrives on turning ideas into stunning dianding, I aim to tell compelling stories through visuals that leave a lasting impression. Constantly exploring trends and pushing boundaries, I believe in the power of design to transform the way people interact with the world."
            </p>
            <div class="photo-image-mobile w-[70%] h-[22.292vw] bg-gray-400">
                
            </div>
        </div>
    </div>

    <!-- About Continued -->
    <div class="w-[49.844vw] mx-auto my-[3.33vw] gap-0">
        <!-- Section 1 -->
        <div class="card h-[15.104vw] relative">
            <div id="card" class="w-[13.75vw] flex flex-col">
                <div class="w-full h-[12vw] bg-green-600 cursor-pointer">
                    <!-- Insert image here -->
                </div>
                <span class="hover-underline-animation left font-sen font-medium h-[1.67vw] text-[#D9D9D9] custom-selection">
                    My Github
                </span>
            </div>
        </div>
        
        <!-- Section 2 -->
        <div class="card h-[18.49vw] relative">
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
        <div class="card h-[15.313vw] relative">
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
        <div class="card h-[15.313vw] relative">
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
    <!-- <div class="h-[1px] bg-slate-50 mx-[15vw]"></div> -->
    <div id="works" class="w-[49.844vw] h-[16.39vw] mx-auto my-[3.33vw]">
        <div class="pt-[3.33vw] px-[3.33vw] border-b-[1.5px] border-[#FFFFFF]">
            <h2 class="font-sen font-medium text-[1.667vw] text-[#FFFFFF] select-none">Stuff I made</h2>
        </div>
        <div id="project-info" class="py-[1.667vw] px-[3.333vw] h-[6.39vw] border-b-[1.5px] border-[#FFFFFF] flex flex-row items-center justify-between">
            <div class="flex items-center gap-5">
                <h3 class="font-sen font-bold text-[2.083vw] text-[#FFFFFF] select-none hover:translate-x-4 transition-all duration-300">This Portfolio</h3>
                <img src="/linklogo.svg" alt="External Link Svg" class="w-[1.406vw] h-[1.406vw] cursor-pointer" /> 
            </div>
            <a href="https://github.com/surajit-13-sutradhar/my-nooby-portfolio" target="_blank"><img src="/github.svg" alt="Github link" class="w-[3.5vw] h-[3.5vw] cursor-pointer"></a>
            
        </div>
    </div>
</section>

<!-- --------------- CONTACT SECTION ---------------- -->
<div class="h-[1px] bg-[#3872f0] mx-[15vw]"></div>
<section id="contact" class="min-h-screen pr-[25.104vw] w-full flex flex-row justify-between relative">
    <div class="w-[33.125vw] flex flex-col justify-end">
        <div class="ml-[32px] mb-[3.333vw]">
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300"><a href="https://www.linkedin.com/in/surajit-sutradhar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" alt="LinkedIn Link" target="_blank" class="custom-selection inline-block">LinkedIn</a></p>
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300"><a href="https://www.behance.net/surajitsutradh2" alt="Behance Link" target="_blank" class="custom-selection inline-block">Behance</a></p>
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300 w-"><a href="https://x.com/_the_crowww?t=-PVfGMsz4Gq0Sxu6Y1b1mA&s=09" alt="Twitter Handle Link" target="_blank" class="custom-selection inline-block">X</a></p>
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300"><a href="mailto:surajitsutradhardes@gmail.com" alt="Gmail Link"  target="_blank" class="custom-selection inline-block">Gmail</a></p>
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white hover:translate-x-2 transition-all duration-300"><a href="https://pin.it/VaLaQDlT6" alt="Pinterest Link" target="_blank" class="custom-selection inline-block">Pinterest</a></p>
            
            <h1 class="font-sen font-bold leading-[100%] text-white text-[9.375vw] pt-[3.333vw] select-none" draggable="false">let's chat</h1>
        </div>
    </div>

    <form id="contact-form" class="w-[23.594vw] flex flex-col justify-center">
        <div id="inputs" class="flex flex-col gap-[1.354vw] w-full">
            <div id="name">
                <label for="name" class="font-sen text-[#FFFFFF]">Name</label>
                <input 
                required id="name" 
                type="text" 
                placeholder="Name" 
                class="w-full text-[#FFFFFF] border-none outline-none bg-transparent p-0 focus:ring-0 placeholder:text-[#CABBFF] placeholder:text-sm placeholder:font-sen"
                bind:value={name}
                >
            </div>
            
            <div id="email">
                <label for="Email" class="font-sen text-[#FFFFFF]">Email</label>
                <input id="Email" 
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
                <label for="Text message" class="font-sen text-[#FFFFFF]">Details about your project in brief</label>
                <textarea id="message"
                required  
                type="text" 
                placeholder="Write your message"  class="w-full h-[8.333vw] text-[#FFFFFF] leading-[100%] border-none outline-none bg-transparent p-0 focus:ring-0 resize-none placeholder:text-[#CABBFF] placeholder:text-sm placeholder:font-sen overflow-hidden"
                maxlength="200"
                bind:value={message}
                ></textarea>
            </div>
            
        </div>
        <button type="submit" class="px-[32px] py-[16px] inline-block mt-[2.292vw] bg-[#3872f0] text-[#FFFFFF] text-[1.25vw] font-sen font-medium self-start rounded-full border-[1px] border-transparent hover:bg-[#2a2a5f] hover:text-[#FFFFFF] hover:border-[#3872f0] transition duration-300 ease-in-out onclick:bg-[#3872f0] onclick:border-[#3872f0]" onclick={handleSubmit}>
            Send
        </button>
    </form>
</section>
  




<style lang="postcss">
:global(:root){
    --clr-success: rgb(0, 255, 0);
    --clr-error: red;
}

:global(*) {
    box-sizing: border-box;
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
    background-image: url('/DesktopBackgroundalt.png');
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

/* For Date and Time */
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
    background-color: #3872f0;
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

/* Custom Scrollbar */
:global(::-webkit-scrollbar) {
    width: 2px; /* Scrollbar width */
}

:global(::-webkit-scrollbar-track) {
    background: #ffffff; /* Track color */
    border-radius: 10px
}

:global(::-webkit-scrollbar-thumb) {
    background: #3e7cda; /* Thumb color */
    border-radius: 10px
}

:global(::-webkit-scrollbar-thumb:hover) {
    background: #2527b9; /* Thumb hover color */
    border-radius: 10px
}

/* Navbar Responsive */
@media (max-width: 35em){
    /* Navbar responsiveness starts */
    .primary-navigation {
        position: fixed;
        inset: 0 0 0 30%;
        background: hsl(0 0% 0% / 0.0.75);
        border-left: 1px solid;
        flex-direction: column;
        padding-top: min(30vh, 10rem);
        transform: translateX(1000px);
        transition: transform 500ms linear;
    }

    .primary-navigation.open {
    transform: translateX(0); /* Slide in */
    }

    .mobile-nav-toggle{
        position: fixed;
        background-repeat: no-repeat;
        border: 0;
        width: 2rem;
        aspect-ratio: 1;
        top: 2rem;
        right: 2rem;
        z-index: 500;
    }

    .mobile-nav-toggle.hamburger {
        background: url(/icon-hamburger.svg);
        background-repeat: no-repeat;
    }

    .mobile-nav-toggle.close{
        background: url(/icon-close.svg);
        background-repeat: no-repeat;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    /* Navbar responsiveness ends */

    /* My name */
    .intro{
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .my-name{
        font-size: 36px;
    }
    .my-designnation{
        font-size: 14px;
    }

    /* Quote */
    .quote-box{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
        text-align: center;
        padding: 1rem;
        min-width: 90%;
    }

    .quote{
        font-size: 20px;
    }

    .speaker{
        padding-left: 0;
    }
    /* --------- */

    /* Date and Time */
    .fixed-top{
        position: fixed;
        top: 0;
        left: 0;
        transform: translateX(-50%);
        text-align: center;
        /* background: #000; */
        height: 14px;
        font-size: 12px;
        padding: .5rem 2rem;
        margin: 1.5rem 5rem;
    }

    /* Assam India Logo start*/
    .assam-svg{
        display: none;
    }


    /* ---------ABOUT SECTION---------- */
    .intro-mobile {
        /* background: green; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .about-mobile{
        width: 100%;
        padding: 2rem;
        display: flex;
        flex-direction: column-reverse;
    }

    /*  */
    .about-heading-mobile{
        font-size: 64px;
    }

    .about-text-mobile{
        font-size: 14px;
        text-align: center;
    }

    .top-intro-mobile {
        display: flex;
        flex-direction: column-reverse;
        gap: 1rem;
        align-items: center;
        padding: 0 2rem;
    }

    .photo-mobile{
        width: 100%;
        /* background: yellow; */
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        margin: 0;
    }

    .photo-text-mobile{
        padding: 0rem 1rem;
        padding-top: 2rem;
        border-top: 1px solid white;
        font-size: 15px;
        text-align: center;
        /* background: green; */
    }

    .photo-image-mobile{
        width: min(40vh, 250px);
        height: 250px;
        margin-top: 0;
    }

    /* About Section Continued */
    .card{
        display: flex;
        align-items: center;
        justify-content: centre;
        background: red;
    }

}

@supports (backdrop-filter: blur(1rem)){
    .primary-navigation: blur(1rem);
}

/* Gradient border */
@media (min-width: 768px) {
    :global(body) {
        background-attachment: fixed;
    }
}

</style>
