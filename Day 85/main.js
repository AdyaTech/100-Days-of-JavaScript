function toggle(e) {
    const toggleButton = document.getElementById(e);
    if (toggleButton.getAttribute("aria-pressed") == "false") {
      toggleButton.setAttribute("aria-pressed", "true");
    } else {
      toggleButton.setAttribute("aria-pressed", "false");
    }
  }