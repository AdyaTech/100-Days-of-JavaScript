document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelector(".twinkling-stars");
  
    // Function to generate random number within a range
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    // Function to create a star
    function createStar() {
      const star = document.createElement("div");
      star.className = "star";
  
      // Set random position
      star.style.left = `${random(0, 100)}%`;
      star.style.top = `${random(0, 100)}%`;
  
      // Set random animation duration
      star.style.animationDuration = `${random(1, 3)}s`;
  
      // Append star to the container
      stars.appendChild(star);
    }
  
    // Create 100 stars
    for (let i = 0; i < 100; i++) {
      createStar();
    }
  });
  