const viewContainer = document.querySelector("#views");
const subscriberContainer = document.querySelector("#subscribers");
const header = document.querySelector("header");

async function getData() {
  const response = await fetch("/api/v1");
  const { views, subscribers } = await response.json();
  return { views, subscribers };
}

getData().then(({ views, subscribers }) => {
  viewContainer.textContent = Number(views).toLocaleString();
  subscriberContainer.textContent = Number(subscribers).toLocaleString();
});

setInterval(() => {
  getData().then(({ views, subscribers }) => {
    viewContainer.textContent = views;
    subscriberContainer.textContent = subscribers;
  });
}, 30 * 60 * 1000);

header.addEventListener("click", () => {
  window.open("https://www.youtube.com/channel/UCd4UmlBFIhj-yJrzn6foxgw");
});
