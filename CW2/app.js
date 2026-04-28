(function () {
  const footerYear = document.getElementById("footerYear");
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());

  document.querySelectorAll(".brand-logo").forEach((img) => {
    const mark = img.closest(".brand-mark");
    const setFallback = () => mark && mark.classList.add("logo-missing");
    img.addEventListener("error", setFallback);
    if (img.complete && img.naturalWidth === 0) setFallback();
  });

  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 },
        )
      : null;

  document.querySelectorAll(".reveal").forEach((el) => {
    if (observer) observer.observe(el);
    else el.classList.add("is-visible");
  });

  const sceneRoot = document.querySelector(".scene-page");
  if (!sceneRoot) return;

  const loader = document.querySelector(".scene-loader");
  const scene = document.querySelector("a-scene");
  const photoSphere = document.getElementById("photoSphere");
  const videoSphere = document.getElementById("videoSphere");
  const videoAsset = document.getElementById("videoAsset");
  const mediaButtons = document.querySelectorAll("[data-mode]");
  const videoButton = document.querySelector('[data-mode="video"]');

  const uiToggleButton = document.createElement("button");
  uiToggleButton.type = "button";
  uiToggleButton.className = "ui-toggle-button";
  uiToggleButton.setAttribute("aria-pressed", "false");
  uiToggleButton.setAttribute("aria-label", "Hide interface overlays");
  uiToggleButton.innerHTML = '<span class="ui-toggle-label">Hide UI</span>';
  document.body.appendChild(uiToggleButton);

  const setUiHidden = (hidden) => {
    document.body.classList.toggle("ui-hidden", hidden);
    uiToggleButton.setAttribute("aria-pressed", String(hidden));
    uiToggleButton.setAttribute(
      "aria-label",
      hidden ? "Show interface overlays" : "Hide interface overlays",
    );
    const label = uiToggleButton.querySelector(".ui-toggle-label");
    if (label) label.textContent = hidden ? "Show UI" : "Hide UI";
  };

  uiToggleButton.addEventListener("click", () => {
    setUiHidden(!document.body.classList.contains("ui-hidden"));
  });

  const playVideoWithSound = () => {
    if (!videoAsset) return;
    videoAsset.pause();
    videoAsset.muted = false;
    videoAsset.removeAttribute("muted");
    videoAsset.volume = 1;
    videoAsset.currentTime = 0;
    const playPromise = videoAsset.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        if (videoButton) videoButton.classList.add("is-disabled");
      });
    }
  };

  const setMode = (mode) => {
    const isVideo = mode === "video";
    mediaButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === mode);
    });

    if (photoSphere) photoSphere.setAttribute("visible", String(!isVideo));
    if (videoSphere) videoSphere.setAttribute("visible", String(isVideo));

    if (videoAsset) {
      if (isVideo) {
        playVideoWithSound();
      } else {
        videoAsset.pause();
        videoAsset.currentTime = 0;
      }
    }
  };

  mediaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("is-disabled")) return;
      setMode(button.dataset.mode);
    });
  });

  if (videoAsset && videoButton) {
    videoAsset.addEventListener("error", () => {
      videoButton.classList.add("is-disabled");
      if (videoButton.classList.contains("is-active")) setMode("photo");
    });
  }

  const hideLoader = () => {
    if (loader) loader.classList.add("is-hidden");
  };

  if (scene) {
    scene.addEventListener("loaded", () => window.setTimeout(hideLoader, 350), {
      once: true,
    });
    window.setTimeout(hideLoader, 1500);
  } else {
    hideLoader();
  }

  setMode("photo");
})();
