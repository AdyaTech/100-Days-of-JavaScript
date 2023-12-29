document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--x', e.clientX / window.innerWidth);
    document.body.style.setProperty('--y', 1 - e.clientY / window.innerHeight);
  });