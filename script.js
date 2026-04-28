const shareButtons = document.querySelectorAll("[data-share]");
const watchButton = document.querySelector('a[href="#player-video"]');
const feedback = document.querySelector(".share-feedback");

const shareData = {
  title: "Gurizada Conectada",
  text: "Assista ao vídeo oficial de Gurizada Conectada.",
  url: window.location.href,
};

function showFeedback(message) {
  if (!feedback) return;

  feedback.textContent = message;
  feedback.classList.add("is-visible");

  window.clearTimeout(showFeedback.timeout);
  showFeedback.timeout = window.setTimeout(() => {
    feedback.classList.remove("is-visible");
  }, 3000);
}

async function copyPageLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showFeedback("Link copiado para compartilhar.");
  } catch {
    showFeedback("Copie o link da página para compartilhar.");
  }
}

async function sharePage() {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  await copyPageLink();
}

shareButtons.forEach((button) => {
  button.addEventListener("click", sharePage);
});

watchButton?.addEventListener("click", (event) => {
  const player = document.querySelector("#player-video");

  if (!player) return;

  event.preventDefault();
  player.scrollIntoView({ behavior: "smooth", block: "center" });
  history.replaceState(null, "", "#player-video");
});
