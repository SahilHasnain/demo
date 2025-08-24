// Al-Barakat Islamic Store - JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Mobile Dropdowns
  const mobileDropdowns = document.querySelectorAll(".mobile-dropdown");
  mobileDropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    const content = dropdown.querySelector(".hidden");

    button.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });
  });

  // Hero Slider
  const heroSlider = document.querySelector(".hero-slider");
  if (heroSlider) {
    const slidesContainer = heroSlider.querySelector(".slides-container");
    const slides = heroSlider.querySelectorAll(".slide");
    const prevBtn = heroSlider.querySelector(".prev-btn");
    const nextBtn = heroSlider.querySelector(".next-btn");

    let currentIndex = 0;
    const slideCount = slides.length;

    function goToSlide(index) {
      if (index < 0) {
        index = slideCount - 1;
      } else if (index >= slideCount) {
        index = 0;
      }

      currentIndex = index;
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
    });

    // Auto-slide functionality
    let slideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);

    // Pause auto-slide on hover
    heroSlider.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    heroSlider.addEventListener("mouseleave", () => {
      slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    });
  }

  // Testimonial Slider
  const testimonialSlider = document.querySelector(".testimonial-slider");
  if (testimonialSlider) {
    const slidesContainer =
      testimonialSlider.querySelector(".slides-container");
    const slides = testimonialSlider.querySelectorAll(".testimonial-slide");
    const dots = testimonialSlider.querySelectorAll(".testimonial-dot");

    let currentIndex = 0;
    const slideCount = slides.length;

    // Set the active dot
    function setActiveDot(index) {
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });
      dots[index].classList.add("active");
    }

    // Initialize the first dot as active
    setActiveDot(0);

    function goToSlide(index) {
      if (index < 0) {
        index = slideCount - 1;
      } else if (index >= slideCount) {
        index = 0;
      }

      currentIndex = index;
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      setActiveDot(currentIndex);
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    // Auto-slide functionality
    let testimonialInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);

    // Pause auto-slide on hover
    testimonialSlider.addEventListener("mouseenter", () => {
      clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener("mouseleave", () => {
      testimonialInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 6000);
    });
  }

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove("hidden");
      } else {
        scrollToTopBtn.classList.add("hidden");
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Product Quantity Counter
  const quantityButtons = document.querySelectorAll(".product-quantity button");

  quantityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.parentElement.querySelector("input");
      let value = parseInt(input.value);

      if (button.classList.contains("minus") && value > 1) {
        input.value = value - 1;
      } else if (button.classList.contains("plus")) {
        input.value = value + 1;
      }
    });
  });

  // Simple Cart Functionality
  const addToCartButtons = document.querySelectorAll(
    '[data-action="add-to-cart"]'
  );
  let cartCount = 0;

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartCount++;
      updateCartCount();
      showCartNotification(button);
    });
  });

  function updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    cartCountElements.forEach((element) => {
      element.textContent = cartCount;
      element.classList.remove("hidden");
    });
  }

  function showCartNotification(button) {
    const productName = button
      .closest(".product-card")
      .querySelector("h3").textContent;

    // Create notification element
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-md shadow-lg animate-fadeIn";
    notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i> ${productName} added to cart`;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transition = "opacity 0.5s";
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 3000);
  }

  // Newsletter Form Validation
  const newsletterForm = document.querySelector("form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!email || !isValidEmail(email)) {
        showFormError(emailInput, "Please enter a valid email address");
        return;
      }

      // Show success message
      const formContainer = this.parentElement;
      const successMessage = document.createElement("div");
      successMessage.className = "text-emerald-100 mt-4 animate-fadeIn";
      successMessage.textContent =
        "Thank you for subscribing to our newsletter!";

      this.style.display = "none";
      formContainer.appendChild(successMessage);
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showFormError(input, message) {
    const errorElement = document.createElement("p");
    errorElement.className = "text-red-300 text-sm mt-1 animate-fadeIn";
    errorElement.textContent = message;

    // Remove any existing error messages
    const existingError = input.parentElement.querySelector(".text-red-300");
    if (existingError) {
      existingError.remove();
    }

    input.classList.add("border-red-500");
    input.parentElement.appendChild(errorElement);

    // Remove error after input change
    input.addEventListener(
      "input",
      function () {
        errorElement.remove();
        input.classList.remove("border-red-500");
      },
      { once: true }
    );
  }

  // Lazy Loading Images
  if ("IntersectionObserver" in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");

          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
          }

          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imgObserver.observe(img);
    });
  }
});
