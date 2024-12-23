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
            resetAlert()
            
        } else {
            // Show the error alert here
            showError = true
            resetAlert()
        }

        // Clearing form fields after submission
        name = ''
        email = ''
        message = ''
    }

    // Navbar hide on scroll
    let y = $state(0)

</script>

<svelte:window bind:scrollY="{y}" />

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
<div id="date-time" class="fixed-bottom-right m-[1.67vw] tracking-custom58 font-sen text-[16px] font-regular text-[#FFFFFF] pr-[1.67vw] custom-selection "> 
    {date.getHours()}:{pad(date.getMinutes())}:{pad(date.getSeconds())}
</div>

<!-- ---------- NAVBAR ---------- -->
<div id="navbar" class="top-0 left-1/2 transform -translate-x-1/2 min-w-[90lvw] px-[1.5vw] py-[0.835vw] mx-auto my-[0.835vw] fixed z-40 flex justify-between items-center backdrop-blur-2xl rounded-full border-[0.5px] border-[#c9c9c9]">
    <!-- Assam India SVG -->
    <div>
        <img src="/assamIndia.svg" alt="Assam India" class="w-[5.365vw] h-[2.917vw] select-none" draggable="false" style="pointer-events: none; -webkit-user-drag: none;">
    </div>

    <!-- Navlinks -->
    <div id="navLinks" class="flex font-sen font-regular">
        <a href="#home" class="hover-underline-animation  font-thin center m-[16px] text-[#FFFFFF] custom-selection"
            >Home</a>
        <a href="#about" class="hover-underline-animation  font-regular center m-[16px] text-[#FFFFFF] custom-selection" >About</a>
        <a href="#contact" class="font-regular px-[16px] py-[4px] bg-[#3872f0] text-[#FFFFFF] rounded-full custom-selection flex justify-center items-center border-[1px] border-transparent hover:bg-[#2a2a5f] hover:text-[#FFFFFF] hover:border-[#3872f0] transition duration-300 ease-in-out">Contact</a>
    </div>
</div>

<!-- --------------- HOME SECTION ----------------  -->
<section id="home" class="min-h-screen flex flex-col relative">
    
    <div class="flex flex-col gap-0 items-center justify-center flex-grow">
        <div transition:fly={{y:50, duration: 2000, delay: 500, easing: t => t * t}}>
            <h1 class="text-[2.578vw] text-white font-charm leading-[97%] select-none">
                Surajit <br/> Sutradhar
            </h1>
            <p class="text-[0.833vw] font-sen text-[#CABBFF] select-none">DESIGNER <span class="font-charm lg:text-[0.9vw]">&</span> DEVELOPER</p>
        </div>
        
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
    <div class="h-[1px] bg-[#3872f0] mx-[15vw]"></div>
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
    width: 5px; /* Scrollbar width */
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

/* Gradient border */
@media (min-width: 768px) {
    :global(body) {
        background-attachment: fixed;
    }
}

</style>
