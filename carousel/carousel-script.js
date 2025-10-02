window.addEventListener('load', function() {
  // NEW: Log to confirm the script is starting
  console.log('Carousel script loaded and running.');

  const track = document.querySelector('.carousel-track');
  if (!track) {
    // NEW: Log if the main carousel element isn't found
    console.error('Carousel track not found on page.');
    return;
  }
  
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button--right');
  const prevButton = document.querySelector('.carousel-button--left');
  
  if (slides.length === 0) {
    console.error('No slides found in the carousel.');
    return;
  }
  
  const slideWidth = slides[0].getBoundingClientRect().width;

  const setSlidePosition = (slide, index) => {
    slide.style.left = (slideWidth * index) + 'px';
  };
  slides.forEach(setSlidePosition);

  const moveToSlide = (track, currentSlide, targetSlide) => {
    if (!targetSlide) {
      // NEW: Log when a move is attempted but there's no target
      console.warn('Move cancelled: No target slide.');
      return;
    }
    
    const amountToMove = '-' + targetSlide.style.left;
    // NEW: Log the calculation for the move
    console.log('Moving to slide:', targetSlide, 'Transform:', amountToMove);
    
    track.style.transform = 'translateX(' + amountToMove + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };

  const updateArrows = (targetSlide) => {
    if (!targetSlide) return;
    // NEW: Log which slide is active for updating arrows
    console.log('Updating arrows for slide:', targetSlide);

    if (targetSlide === slides[0]) {
      prevButton.classList.add('is-hidden');
      nextButton.classList.remove('is-hidden');
    } else if (targetSlide === slides[slides.length - 1]) {
      prevButton.classList.remove('is-hidden');
      nextButton.classList.add('is-hidden');
    } else {
      prevButton.classList.remove('is-hidden');
      nextButton.classList.remove('is-hidden');
    }
  };

  prevButton.addEventListener('click', e => {
    // NEW: Log button clicks
    console.log('Previous button clicked.');
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    
    moveToSlide(track, currentSlide, prevSlide);
    updateArrows(prevSlide);
  });

  nextButton.addEventListener('click', e => {
    // NEW: Log button clicks
    console.log('Next button clicked.');
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    updateArrows(nextSlide);
  });

  // Set initial state
  if (slides.length > 0) {
    slides[0].classList.add('current-slide');
    updateArrows(slides[0]);
  }
});
