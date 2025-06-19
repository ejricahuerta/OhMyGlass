// Accordion functionality for Services section
const accordionToggles = document.querySelectorAll('.accordion-toggle');
accordionToggles.forEach((toggle) => {
  toggle.addEventListener('click', function () {
    const index = this.getAttribute('data-accordion');
    const content = document.querySelectorAll('.accordion-content')[index];
    const isOpen = !content.classList.contains('hidden');
    // Close all
    document.querySelectorAll('.accordion-content').forEach((el) => el.classList.add('hidden'));
    document.querySelectorAll('.accordion-toggle svg').forEach((svg) => svg.classList.remove('rotate-180'));
    // Open selected if not already open
    if (!isOpen) {
      content.classList.remove('hidden');
      this.querySelector('svg').classList.add('rotate-180');
    }
  });
});

// Smooth scroll for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Form handling with photo upload and camera access
const quoteForm = document.getElementById('quote-form');
const photoUpload = document.getElementById('photo-upload');
const cameraBtn = document.getElementById('camera-btn');
const previewArea = document.getElementById('preview-area');
const formFeedback = document.getElementById('form-feedback');

// Handle file upload
if (photoUpload) {
  photoUpload.addEventListener('change', function(e) {
    handleFiles(this.files);
  });
}

// Handle camera access
if (cameraBtn) {
  cameraBtn.addEventListener('click', async function() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoModal = document.createElement('div');
      videoModal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
      videoModal.innerHTML = `
        <div class="bg-white p-6 rounded-3xl max-w-lg w-full mx-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-[#2c3a43]">Take a Photo</h3>
            <button id="close-camera" class="text-[#2c3a43] hover:text-[#d32f2f]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <video autoplay class="w-full rounded-xl mb-4"></video>
          <button id="capture-photo" class="w-full bg-[#d32f2f] text-white font-bold py-3 rounded-full">
            Capture Photo
          </button>
        </div>
      `;
      document.body.appendChild(videoModal);
      
      const video = videoModal.querySelector('video');
      video.srcObject = stream;
      
      // Handle close
      const closeBtn = videoModal.querySelector('#close-camera');
      closeBtn.onclick = () => {
        stream.getTracks().forEach(track => track.stop());
        videoModal.remove();
      };
      
      // Handle capture
      const captureBtn = videoModal.querySelector('#capture-photo');
      captureBtn.onclick = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        canvas.toBlob(blob => {
          const file = new File([blob], `camera-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
          handleFiles([file]);
        }, 'image/jpeg');
        stream.getTracks().forEach(track => track.stop());
        videoModal.remove();
      };
    } catch (err) {
      alert('Could not access camera. Please check your camera permissions.');
      console.error('Camera access error:', err);
    }
  });
}

// Handle files (both upload and camera)
function handleFiles(files) {
  if (!previewArea) return;
  
  previewArea.classList.remove('hidden');
  
  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.createElement('div');
      preview.className = 'relative group';
      preview.innerHTML = `
        <img src="${e.target.result}" alt="Preview" class="w-full h-32 object-cover rounded-xl" />
        <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      `;
      
      // Handle remove
      const removeBtn = preview.querySelector('button');
      removeBtn.onclick = () => {
        preview.remove();
        if (!previewArea.hasChildNodes()) {
          previewArea.classList.add('hidden');
        }
      };
      
      previewArea.appendChild(preview);
    };
    reader.readAsDataURL(file);
  });
}

// Form validation and submission
if (quoteForm) {
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    const requiredFields = ['name', 'phone', 'email', 'service'];
    
    // Validate required fields
    requiredFields.forEach(id => {
      const field = document.getElementById(id);
      if (!field.value.trim()) {
        field.classList.add('border-red-500');
        valid = false;
      } else {
        field.classList.remove('border-red-500');
      }
    });
    
    // Validate email format
    const email = document.getElementById('email');
    if (email.value && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      email.classList.add('border-red-500');
      valid = false;
    }
    
    if (valid) {
      // Show success message
      formFeedback.classList.remove('hidden');
      quoteForm.reset();
      previewArea.innerHTML = '';
      previewArea.classList.add('hidden');
      
      // Hide success message after 4 seconds
      setTimeout(() => {
        formFeedback.classList.add('hidden');
      }, 4000);
    }
  });
}

// Dynamic current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Mobile Navbar Toggle
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navbarBackdrop = document.getElementById('navbar-backdrop');
if (navbarToggle && navbarMenu) {
  function openMenu() {
    navbarMenu.classList.add('open');
    navbarMenu.classList.remove('hidden');
    if (navbarBackdrop) {
      navbarBackdrop.classList.add('active');
      navbarBackdrop.classList.remove('hidden');
    }
  }
  function closeMenu() {
    navbarMenu.classList.remove('open');
    if (navbarBackdrop) navbarBackdrop.classList.remove('active');
    setTimeout(() => {
      navbarMenu.classList.add('hidden');
      if (navbarBackdrop) navbarBackdrop.classList.add('hidden');
    }, 300);
  }
  navbarToggle.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      if (!navbarMenu.classList.contains('open')) {
        openMenu();
      } else {
        closeMenu();
      }
    }
  });
  // Close menu when a link is clicked (on mobile)
  navbarMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });
  // Close menu when clicking the backdrop
  if (navbarBackdrop) {
    navbarBackdrop.addEventListener('click', closeMenu);
  }
  // Optional: Close menu if clicking outside menu (extra safety)
  document.addEventListener('click', (e) => {
    if (
      window.innerWidth < 768 &&
      navbarMenu.classList.contains('open') &&
      !navbarMenu.contains(e.target) &&
      !navbarToggle.contains(e.target) &&
      (!navbarBackdrop || !navbarBackdrop.contains(e.target))
    ) {
      closeMenu();
    }
  });
}

// Handle lazy loading videos with loading indicators
document.addEventListener('DOMContentLoaded', function() {
  const lazyVideos = document.querySelectorAll('.lazy-video');
  
  const loadVideo = (video) => {
    const src = video.getAttribute('data-src');
    if (!src) return;
    
    video.src = src;
    video.removeAttribute('data-src');
    
    // Hide loading placeholder with a smooth fade when video can play
    video.addEventListener('canplay', function() {
      const loadingPlaceholder = video.parentElement.querySelector('.loading-placeholder');
      if (loadingPlaceholder) {
        // Start fade out
        loadingPlaceholder.style.opacity = '0';
        // Remove after fade completes
        setTimeout(() => {
          loadingPlaceholder.style.display = 'none';
          // Fade in the video
          video.style.opacity = '0';
          video.style.transition = 'opacity 0.5s ease-in-out';
          requestAnimationFrame(() => {
            video.style.opacity = '1';
          });
          video.play();
        }, 500);
      }
    });

    // Add error handling with retry
    video.addEventListener('error', function() {
      const loadingPlaceholder = video.parentElement.querySelector('.loading-placeholder');
      if (loadingPlaceholder) {
        const errorMessage = loadingPlaceholder.querySelector('span');
        if (errorMessage) {
          errorMessage.textContent = 'Error loading video. Retrying...';
          // Retry loading after 2 seconds
          setTimeout(() => {
            video.src = src;
          }, 2000);
        }
      }
    });
  };

  // Use Intersection Observer to load videos when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadVideo(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  lazyVideos.forEach(video => {
    observer.observe(video);
  });
}); 