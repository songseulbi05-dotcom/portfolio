const userNameElement = document.querySelector("#mypage-user-name");
const userEmailElement = document.querySelector("#mypage-user-email");

function logout() {
  localStorage.removeItem("login");
  localStorage.removeItem("gyeolCurrentUser");
  window.location.href = "./Brand.html";
}

const storedUser = localStorage.getItem("gyeolCurrentUser");

if (!storedUser) {
  window.location.href = "./Login.html";
} else {
  try {
    const currentUser = JSON.parse(storedUser);

    if (userNameElement) {
      userNameElement.textContent = currentUser.name || "Guest";
    }

    if (userEmailElement) {
      userEmailElement.textContent = currentUser.email || "guest@gyeol.com";
    }
  } catch {
    localStorage.removeItem("gyeolCurrentUser");
    localStorage.removeItem("login");
    window.location.href = "./Login.html";
  }
}

window.logout = logout;
