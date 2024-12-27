<!-- Svelte Script -->

<script>
    import {SvelteDate} from 'svelte/reactivity'
    import {onMount, onDestroy} from 'svelte'
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
            alert("Please fill-up all the fields before sending ://")
            resetAlert()
            return; // Stop execution if validation fails
        }

        // Sending Data to Firebase
        const firebaseUrl = import.meta.env.VITE_FIREBASE_URL
        const response = await fetch(firebaseUrl,
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
        if(isToggling) return // Prevent rapid toggling
        isToggling = true
        isNavOpen = !isNavOpen
        setTimeout(() => (isToggling = false), 500) //Matches the animation duration
    }

    // Function to close
    function closeNav() {
        isNavOpen = false
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
    <a href="#home" class="hover-underline-animation  font-thin text-[14px] center m-[16px] text-[#FFFFFF]" onclick={closeNav}
        ><span aria-hidden="true" class="custom-selection">Home</span></a>
    <a href="#about" class="hover-underline-animation  font-regular text-[14px] center m-[16px] text-[#FFFFFF] custom-selection" onclick={closeNav}><span aria-hidden="true" class="custom-selection">About</span></a>
    <a href="#contact" class="hover-underline-animation  font-bold text-[14px] center m-[16px] text-[#93e0ff] custom-selection" onclick={closeNav}><span aria-hidden="true" class="custom-selection">Contact</span></a>
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
                <p class="about-text-mobile font-sen font-medium leading-[100%] text-[1.667vw] text-white custom-selection">Passionate about creating visually captivating and user-centric designs, I am a designer who aims to turn ideas into stunning digital experiences.</p>
                <h1 class="about-heading-mobile font-sen font-bold leading-[100%] text-white text-[9.375vw] pt-[3.333vw] select-none" draggable="false">about</h1>
            </div>

        </div>

        

        <div class="photo-mobile w-[32.292vw] pt-[7.2vw] flex flex-col justify-end items-end gap-[1.5rem]">
            <p class="photo-text-mobile font-medium text-[1.042vw] leading-[100%] text-[#CABBFF] text-right custom-selection w-[70%]">
                Combining my love for design and aesthetics with my passion for code. I love listening to music, watching movies and creating art in my free time. Ocassionally I also write blogs.
            </p>
            <div class="photo-image-mobile w-[70%] h-[22.292vw] backdrop-blur-lg rounded-sm relative overflow-hidden">
                <img src="img-self.png" alt="Profile" class="object-cover w-full h-full rounded-sm transform transition-transform duration-200 ease-in hover:duration-[800ms] hover:scale-[1.05] select-none">
            </div>
        </div>
    </div>

    <!-- About Continued -->
    <div class="cards-section-mobile w-[49.844vw] mx-auto my-[3.33vw] mt-[4rem]">


        <!-- Section 1 -->
    
        <div id="card" class="w-[13.75vw] h-[15.104vw] relative card-mobile-container">
            <a href="https://github.com/surajit-13-sutradhar" aria-label="Github" target="_blank" class="w-full h-full cursor-pointer backdrop-blur-lg border-[1px] border-[#bbbbbb] flex justify-center rounded-md relative overflow-hidden group">
                <!-- Github Logo -->
                <img src="icon-github.svg" alt="Github Logo" class="card-logo w-[3.333vw] transition-opacity duration-500 group-hover:opacity-0 select-none">
                <!-- Background image -->
                <img src="img-github.jpg" alt="" class="absolute inset-0 w-full h-full object-cover  opacity-0 object-left transition-opacity duration-500 group-hover:opacity-100">
            </a>
            <span class="font-sen text-[12px] text-[#D9D9D9] custom-selection select-none">
                My Github
            </span>
        </div>

        <!-- Section 2 Mobile -->
        <div id="card" class="w-[19.792vw] h-[15.104vw] flex-col relative card-mobile-container spotify-card-desktop">
            <a href="https://www.behance.net/surajitsutradh2" aria-label="Behance Link" target="_blank" class="w-full h-full cursor-pointer backdrop-blur-lg border-[1px] border-[#bbbbbb] flex justify-center rounded-md relative overflow-hidden group">
                <!-- Spotify Icon -->
                <img src="icon-behance.svg" alt="Behance Logo" class="card-logo w-[3.333vw] transition-opacity duration-500 group-hover:opacity-0 select-none">
                <!-- Background Image -->
                <img src="img-behance.jpg" alt="" class="absolute inset-0 w-full h-full object-cover  opacity-0 object-top transition-opacity duration-500 group-hover:opacity-100">
                
            </a>
            <span class="font-sen text-[12px] text-[#D9D9D9] custom-selection select-none">
                My Behance
            </span>
        </div>
        
        
        <!-- Section 2 -->
        <div class="card h-[18.49vw] mt-[1rem] relative spotify-card-mobile-container">
            <div class="w-[15.625vw] h-full right-0 spotify-card-mobile">
                <a href="https://www.behance.net/surajitsutradh2" aria-label="Behance" target="_blank" class="w-full h-[13.5vw] backdrop-blur-lg border-[1px] border-[#bbbbbb] flex justify-center rounded-md cursor-pointer relative overflow-hidden group">
                    <!-- Behance Icon -->
                    <img src="icon-behance.svg" alt="Hashnode Logo" class="w-[3.333vw] transition-opacity duration-500 group-hover:opacity-0 select-none">
                    <!-- Background Image -->
                    <img src="img-behance.jpg" alt="" class="absolute inset-0 w-full h-full object-cover  opacity-0 object-top transition-opacity duration-500 group-hover:opacity-100">
                        
                </a>
                <span class="font-sen text-[12px] text-[#D9D9D9] custom-selection cursor-default select-none">
                    My Behance
                </span>
            </div>
        </div>

        <!-- Section 3 -->
        <div id="card" class="w-[19.792vw] h-[15.104vw] flex-col relative card-mobile-container">
            <a href="https://frontendflow.hashnode.dev/" aria-label="Hashnode" target="_blank" class="w-full h-full cursor-pointer backdrop-blur-lg border-[1px] border-[#bbbbbb] flex justify-center rounded-md relative overflow-hidden group">
                <!-- Hashnode Logo -->
                <img src="icon-hashnode.svg" alt="Hashnode Logo" class="card-logo w-[3.333vw] transition-opacity duration-500 group-hover:opacity-0 select-none">
                <!-- Background image -->
                <img src="img-hashnode.jpg" alt="" class="absolute inset-0 w-full h-full object-cover  opacity-0 object-top transition-opacity duration-500 group-hover:opacity-100">
            </a>
            <span class="font-sen text-[12px] text-[#D9D9D9] custom-selection select-none">
                My Blogs
            </span>
        </div>

    </div>

    <!-- ---------- WORKS ---------- -->
    <!-- <div class="h-[1px] bg-slate-50 mx-[15vw]"></div> -->
    <div id="works" class="w-[49.844vw] h-[16.39vw] mx-auto my-[3.33vw]">
        <h2 class="mobile-heading font-sen font-medium text-[1.667vw] text-[#FFFFFF] select-none pt-[3.33vw] px-[3.33vw] border-b-[1.5px] border-[#FFFFFF]">Stuff I made</h2>
        <div class="project-container py-[1.667vw] px-[3.333vw] h-[6.39vw] border-b-[1.5px] border-[#FFFFFF] flex flex-row items-center justify-between">
            <div class="project-info flex items-center gap-5">
                <h3 class="font-sen font-bold text-[2.083vw] text-[#FFFFFF] select-none hover:translate-x-4 transition-all duration-300">This Portfolio</h3>
                <img src="/linklogo.svg" alt="External Link Svg" class="w-[1.406vw] scale-1 cursor-pointer select-none" /> 
            </div>
            <a href="https://github.com/surajit-13-sutradhar/my-nooby-portfolio" target="_blank"><img src="/github.svg" alt="Github link" class="w-[3.5vw] scale-1 cursor-pointer select-none"></a>
        </div>
    </div>
</section>

<!-- --------------- CONTACT SECTION ---------------- -->
<div class="h-[1px] bg-[#3872f0] mx-[15vw]"></div>
<section id="contact" class="contact-section-mobile min-h-screen pr-[25.104vw] w-full flex flex-row justify-between relative">
    <div class="links-mobile w-[33.125vw] flex flex-col justify-end">
        <div class="ml-[32px] mb-[3.333vw]">
            <p class="font-sen font-medium leading-[100%] text-[1.667vw] text-white mb-[1vw] custom-selection" >
                You can also find me on
            </p>
            <!-- Linked In -->
            <p class="font-sen font-regular leading-[100%] text-[1.5vw] text-[#c6e5ff]"><a href="https://www.linkedin.com/in/surajit-sutradhar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" alt="LinkedIn Link" target="_blank" class="custom-selection inline-block hover:text-[#ffffff] transition-all duration-300">LinkedIn</a></p>
            <!-- Behance -->
            <p class="font-sen font-regular leading-[100%] text-[1.5vw] text-[#c6e5ff]"><a href="https://open.spotify.com/user/31ksuirhm2vzvhcxc33bcr2dme5y?si=WsEd_wMdSe2M7pGhEUxZzw" alt="Spotify Link" target="_blank" class="custom-selection inline-block hover:text-[#ffffff] transition-all duration-300">Spotify</a></p>
            <!-- X -->
            <p class="font-sen font-regular leading-[100%] text-[1.5vw] text-[#c6e5ff]"><a href="https://x.com/_the_crowww?t=-PVfGMsz4Gq0Sxu6Y1b1mA&s=09" alt="Twitter Handle Link" target="_blank" class="custom-selection inline-block hover:text-[#ffffff] transition-all duration-300">X</a></p>
            <!-- Pinterest -->
            <p class="font-sen font-regular leading-[100%] text-[1.5vw] text-[#c6e5ff] "><a href="https://pin.it/VaLaQDlT6" alt="Pinterest Link" target="_blank" class="custom-selection hover:text-[#ffffff] transition-all duration-300">Pinterest</a></p>
            
            <h1 class="font-sen font-bold leading-[100%] text-white text-[9.375vw] pt-[3.333vw] select-none " draggable="false">let's chat</h1>
        </div>
    </div>
    
    <h1 class="about-heading-mobile font-sen font-bold leading-[100%] text-white text-[9.375vw] pt-[3.333vw] select-none mt-[2.5rem]" draggable="false">let's chat</h1>

    <form class="contact-form-mobile w-[23.594vw] flex flex-col justify-center">
        <div id="inputs" class="flex flex-col gap-[1.354vw] w-full">
            <div id="name">
                <label for="name" class="font-sen text-[#FFFFFF] custom-selection">Name</label>
                <input 
                required id="name" 
                type="text" 
                placeholder="Name" 
                class="w-full text-[#FFFFFF] border-none outline-none bg-transparent p-0 focus:ring-0 placeholder:text-[#CABBFF] placeholder:text-sm placeholder:font-sen placeholder:custom-selection placeholder:select-none"
                title="Your name"
                bind:value={name}
                >
            </div>
            
            <div id="email">
                <label for="Email" class="font-sen text-[#FFFFFF] custom-selection">Email</label>
                <input id="Email" 
                required 
                type="email" 
                placeholder="E-mail" 
                name="email"  
                class="w-full text-[#FFFFFF] border-none outline-none bg-transparent p-0 focus:ring-0 placeholder:text-[#CABBFF] placeholder:text-sm placeholder:font-sen placeholder:custom-selection placeholder:select-none" 
                title="Please enter a valid E-mail address"
                bind:value={email}
                >
            </div>
            
            <div id="form-group">
                <label for="Text message" class="font-sen text-[#FFFFFF] custom-selection">Details about your project in brief</label>
                <textarea id="message"
                required  
                type="text" 
                placeholder="Write your message"  class="w-full h-[12.333vh] text-[#FFFFFF] leading-[100%] border-none outline-none bg-transparent p-0 focus:ring-0 resize-none placeholder:text-[#CABBFF] placeholder:text-sm placeholder:font-sen custom-scrollbar placeholder:custom-selection placeholder:select-none"
                bind:value={message}
                maxlength="300"
                title="Write a brief explanation of your vision"
                ></textarea>
            </div>
            
        </div>
        <div class="flex items-center justify-between mt-[1rem]">
            <button type="submit" class="px-[32px] py-[10px] inline-block bg-[#3872f0] text-[#FFFFFF] text-[16px] font-sen font-medium self-start rounded-full border-[1px] border-transparent hover:bg-[#2a2a5f] hover:text-[#FFFFFF] hover:border-[#3872f0] transition duration-300 ease-in-out onclick:bg-[#3872f0] onclick:border-[#3872f0] custom-selection" onclick={handleSubmit}>
                Send
            </button>
            <span class="font-medium text-[#ffffff] custom-selection">or</span>
            <a href="mailto:surajitsutradhardes@gmail.com" target="_blank" class="px-[24px] py-[9px] inline-block bg-[#fff5f5] text-[#ff3d3d] text-[16px] font-sen font-medium self-start rounded-full border-[1px] border-transparent hover:bg-[#ff3d3d] hover:text-[#FFFFFF] hover:border-[#ffffff] transition duration-300 ease-in-out onclick:bg-[#3872f0] onclick:border-[#3872f0] custom-selection">Mail me!</a>
        </div>
        
    </form>

    <!-- Links in mobile -->
    <div class="links-mobile-icons absolute bottom-[5rem]">
        <p class="text-[2vh] custom-selection font-medium text-[#CABBFF]">You can also find me on</p>
        <div class="flex gap-2 justify-between items-center mt-[0.5rem]">
            <a href="https://www.linkedin.com/in/surajit-sutradhar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" alt="LinkedIn Link" target="_blank"><img src="icon-linkedin.svg" alt="LinkedIn Link" class="scale-1 w-[24px] select-none"/></a>

            <a href="https://www.behance.net/surajitsutradh2" alt="Spotify Link" target="_blank"><img src="icon-spotify.svg" alt="Spotify Icon" class="scale-1 w-[24px] select-none"/></a>

            <a href="https://x.com/_the_crowww?t=-PVfGMsz4Gq0Sxu6Y1b1mA&s=09" alt="Twitter Handle Link" target="_blank"><img src="icon-twitter.svg" alt="Twitter Icon" class="scale-1 w-[24px] select-none"/></a>

            <a href="https://pin.it/VaLaQDlT6" alt="Pinterest Link" target="_blank"><img src="icon-pinterest.svg" alt="Pinterest Icon" class="scale-1 w-[28px] select-none"/></a>
        </div>

        
    </div>
    
    <!-- Attribution -->
         
    <div class="attribution absolute bottom-[0.2rem] w-[100vw] px-[2rem] leading-tight text-center text-[#fcfcfc] text-[12px] custom-selection">Inspired by <a href="https://leopoldmanguette.com/" target="_blank" class="text-[#CABBFF] cursor-pointer hover:text-[#716d97] underline-offset-1 underline font-bold custom-selection">Leopold Manguette</a>'s Portfolio website. Coded in Visual Studio Code using SvelteKit, TailwindCSS and Firebase by yours truly.</div>
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

/* Custom Scrollbar for textarea */
/* Custom scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
    width: 2px; /* Width of the scrollbar */
    height: 10px; /* Height of the scrollbar */
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #3e7cda; /* Thumb color */
    border-radius: 2px; /* Round edges */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #2527b9; /* Change color on hover */
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



@media (min-width: 45em){
    .spotify-card-mobile{
        position: absolute;
    }

    .spotify-card-desktop{
        display: none;
    }

    .about-heading-mobile {
        display: none;
    }

    .links-mobile-icons {
        display: none;
    }

}

/* Navbar Responsive */
@media (max-width: 45em){
    /* Navbar responsiveness starts */
    .primary-navigation {
        position: fixed;
        inset: 0 0 0 60%;
        backdrop-filter: blur(20px);
        border-left: 1px solid;
        flex-direction: column;
        padding-top: min(30vh, 10rem);
        transform: translateX(100%); /*Initially offscreen*/
        
    }

    .primary-navigation.open {
        transform: translateX(0);
        opacity: 1;
        transition: transform 300ms ease, opacity 300ms ease; /* Slide in */
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
        flex-direction: column-reverse;
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
        width: min(30vh, 250px);
        height: 250px;
        margin-top: 0;
    }


    /* Cards section mobile */
    .cards-section-mobile{
        width: 25vh;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: relative;
    }

    .spotify-card-mobile-container{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: auto;
    }

    .card-mobile-container{
        margin: auto;
        align-items: center;
        justify-content: center;
        width: 25vh;
        height: 25vh;
    }

    .spotify-card-mobile-container{
        display: none;
    }

    .card-logo{
        width: 10vh;
    }

    /* Works */
    #works{
        width: 70%;
        height: 20vh;
    }

    .mobile-heading {
        font-size: 16px;
    }

    .project-container{
        height: 64px;
    }

    .project-container > a > img {
        width: 36px;
    }

    .project-info > h3{
        font-weight: 400;
        font-size: 20px;
        margin: 2rem 0;
    }

    .project-info > img{
        width: 16px;
    }

    /* Contact Section */
    .links-mobile{
        display: none;
    }

    /* Contact form */
    .contact-section-mobile{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        padding-right: 0;
    }



    .contact-form-mobile{
        width: min(80vw, 45vh);
        margin: 3rem 0;
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
