document.addEventListener("DOMContentLoaded", function () {
  // Lazy load videos
  const lazyVideos = document.querySelectorAll(".lazy-video");

  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target;
            const placeholder = video.previousElementSibling;

            video.src = video.dataset.src;

            video.addEventListener("loadeddata", () => {
              video.classList.remove("opacity-0");
              if(placeholder && placeholder.classList.contains('loading-placeholder')) {
                  placeholder.classList.add("opacity-0");
              }
              video.play().catch(e => console.error("Video autoplay was prevented:", e));
            });

            // Add hover to play/pause functionality
            const container = video.parentElement;
            if (container) {
              container.addEventListener("mouseover", () => {
                video.pause();
              });
              container.addEventListener("mouseout", () => {
                video.play();
              });
            }

            observer.unobserve(video);
          }
        });
      },
      {
        rootMargin: "0px 0px 200px 0px", // Start loading when 200px from viewport
      }
    );

    lazyVideos.forEach((video) => {
      videoObserver.observe(video);
    });
  } else {
    // Fallback for older browsers without IntersectionObserver
    lazyVideos.forEach((video) => {
      video.src = video.dataset.src;
    });
  }

  // Set current year in the footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Floating call button
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
    "hover:bg-[#2c3a43]",
    "transition",
    "z-50",
    "flex",
    "items-center",
    "justify-center"
  );
  callButton.innerHTML = `<i class="fas fa-phone-alt text-2xl"></i>`;
  document.body.appendChild(callButton);
}); 