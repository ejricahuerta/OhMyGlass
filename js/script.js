document.addEventListener("DOMContentLoaded", function () {
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