const triggers = document.querySelectorAll('.video-trigger');
const inlineVideos = document.querySelectorAll('.inline-video');
const cursorRing = document.querySelector('.cursor-ring');
const mobileVideoQuery = window.matchMedia('(max-width: 760px), (pointer: coarse)');

function stopOtherVideos(activeVideo) {
  inlineVideos.forEach((video) => {
    if (video === activeVideo) {
      return;
    }

    video.pause();
    video.closest('.video-card').classList.remove('is-playing');
  });
}

function playInlineVideo(trigger) {
  const card = trigger.closest('.video-card');
  const video = card.querySelector('.inline-video');
  const nextSrc = mobileVideoQuery.matches ? video.dataset.mobileSrc : video.dataset.src;

  stopOtherVideos(video);

  if (!video.src || !video.src.endsWith(nextSrc)) {
    video.src = nextSrc;
    video.load();
  }

  card.classList.add('is-playing');
  video.play().catch(() => {});
}

triggers.forEach((trigger) => {
  trigger.addEventListener('click', () => playInlineVideo(trigger));
});

if (cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    document.body.classList.add('has-cursor');
    cursorRing.style.transform = `translate3d(${event.clientX - 12}px, ${event.clientY - 12}px, 0)`;
  });

  window.addEventListener('pointerleave', () => {
    document.body.classList.remove('has-cursor');
  });
}
