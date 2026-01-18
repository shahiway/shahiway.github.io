const installButtonContainer = document.querySelector("#install-button-container");
const installButton = document.querySelector("#install-button");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installButton.onclick = async () => {
    const choice = await event.prompt();

    if (choice.outcome === 'accepted') {
      installButtonContainer.classList.remove("animate__slideInUp");
      installButtonContainer.classList.add("animate__slideOutDown");
      installButtonContainer.classList.add("hidden");
    }
  };
  installPrompt = event;
  installButtonContainer.classList.add("animate__animated");
  installButtonContainer.classList.add("animate__slideInUp")
  installButtonContainer.classList.remove("hidden");
});
