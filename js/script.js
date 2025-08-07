document.addEventListener("DOMContentLoaded", function () {
  // Set current year in the footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smart navigation elements - only for mobile
  const heroSection = document.getElementById("hero");
  const navQuoteButton = document.querySelector('header a[href="#contact-form"]');
  
  // Create phone number element for nav
  const navPhoneNumber = document.createElement("a");
  navPhoneNumber.href = "tel:+16478032730";
  navPhoneNumber.classList.add(
    "inline-block",
    "text-[#1a1a1a]",
    "font-semibold",
    "text-sm",
    "md:text-base",
    "hover:text-[#d32f2f]",
    "transition-colors",
    "duration-300"
  );
  navPhoneNumber.textContent = "647-803-2730";

  // Floating call button (initially hidden)
  const phoneNumber = "+16478032730";
  const callButton = document.createElement("a");
  callButton.href = `tel:${phoneNumber}`;
  callButton.id = "floating-call-button";
  callButton.setAttribute("aria-label", "Call Us");
  callButton.classList.add(
    "fixed",
    "bottom-5",
    "right-5",
    "bg-[#d32f2f]",
    "text-white",
    "w-16",
    "h-16",
    "rounded-full",
    "shadow-lg",
    "hover:bg-[#b71c1c]",
    "transition",
    "z-40",
    "flex",
    "items-center",
    "justify-center",
    "opacity-0",
    "pointer-events-none"
  );
  callButton.innerHTML = `<i class="fas fa-phone-alt text-2xl"></i>`;
  document.body.appendChild(callButton);

  // Function to check if we're on mobile
  function isMobile() {
    return window.innerWidth < 768; // md breakpoint in Tailwind
  }

  // Function to check if hero is visible
  function isHeroVisible() {
    if (!heroSection) return false;
    const rect = heroSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Hero is visible if it's in the viewport
    return rect.top < windowHeight && rect.bottom > 0;
  }

  // Function to update navigation based on hero visibility
  function updateNavigation() {
    const heroVisible = isHeroVisible();
    
    if (isMobile()) {
      // Mobile behavior: smart navigation based on hero visibility
      const currentNavElement = document.querySelector('header a[href="tel:+16478032730"], header a[href="#contact-form"]');
      
      console.log('Mobile - Hero visible:', heroVisible, 'Current nav element:', currentNavElement?.href);
      
      if (heroVisible) {
        // Hero is visible: show quote button, hide phone number and call button
        if (currentNavElement && currentNavElement.href.includes("tel:")) {
          currentNavElement.parentNode.replaceChild(navQuoteButton, currentNavElement);
          console.log('Mobile - Replaced phone number with quote button');
        }
        callButton.classList.add("opacity-0", "pointer-events-none");
      } else {
        // Hero is not visible: show phone number and call button, hide quote button
        if (currentNavElement && currentNavElement.href.includes("#contact-form")) {
          currentNavElement.parentNode.replaceChild(navPhoneNumber, currentNavElement);
          console.log('Mobile - Replaced quote button with phone number');
        }
        callButton.classList.remove("opacity-0", "pointer-events-none");
      }
    } else {
      // Desktop behavior: always show quote button in nav and floating call button
      const currentNavElement = document.querySelector('header a[href="tel:+16478032730"], header a[href="#contact-form"]');
      if (currentNavElement && currentNavElement.href.includes("tel:")) {
        currentNavElement.parentNode.replaceChild(navQuoteButton, currentNavElement);
      }
      // Show floating call button on desktop
      callButton.classList.remove("opacity-0", "pointer-events-none");
    }
  }

  // Initial check - force immediate update
  console.log('Initial navigation setup - Mobile:', isMobile());
  
  // For mobile, immediately replace quote button with phone number on initial load
  if (isMobile()) {
    const initialNavElement = document.querySelector('header a[href="#contact-form"]');
    if (initialNavElement) {
      initialNavElement.parentNode.replaceChild(navPhoneNumber, initialNavElement);
      console.log('Mobile - Initial load: Replaced quote button with phone number');
    }
  } else {
    // For desktop, show floating call button immediately
    callButton.classList.remove("opacity-0", "pointer-events-none");
  }
  
  updateNavigation();

  // Listen for scroll events
  let ticking = false;
  window.addEventListener("scroll", function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateNavigation();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Listen for resize events
  window.addEventListener("resize", function() {
    updateNavigation();
  });
}); 