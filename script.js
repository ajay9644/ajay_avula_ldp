function increaseScore() {
  let localScore = localStorage.getItem("localScore");
  console.log(localScore);
  localScore++;
  localStorage.setItem("localScore", localScore);
  document.getElementById("localScore").textContent = localScore;

  let sessionScore = sessionStorage.getItem("sessionScore");
  console.log(sessionScore);
  sessionScore++;
  sessionStorage.setItem("sessionScore", sessionScore);
  document.getElementById("sessionScore").textContent = sessionScore;
}
window.onload = function () {
  let localScore = localStorage.getItem("localScore");
  document.getElementById("localScore").textContent = localScore;
  let sessionScore = sessionStorage.getItem("sessionScore") || 0;
  document.getElementById("sessionScore").textContent = sessionScore;
};
