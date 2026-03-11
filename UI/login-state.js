const loginLink = document.querySelector(".login-btn, .nav-login-btn");
const loginForm = document.querySelector("#login-form");
const loginStatus = document.querySelector("#login-status");

function getStoredUsers() {
  const users = localStorage.getItem("gyeolUsers");

  try {
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

const currentUser = localStorage.getItem("gyeolCurrentUser");
const isLoggedIn = localStorage.getItem("login") === "true" && currentUser;

if (isLoggedIn && loginLink && loginLink.tagName === "A") {
  loginLink.href = "./mypage.html";

  if (loginLink.classList.contains("icon-btn")) {
    loginLink.setAttribute("aria-label", "My Page");
    loginLink.setAttribute("title", "My Page");
  } else {
    loginLink.textContent = "My Page";
  }
}

function setLoginStatus(message, statusClass) {
  if (!loginStatus) {
    return;
  }

  loginStatus.textContent = message;
  loginStatus.className = `form-status ${statusClass}`;
}

function loginUser(email, password) {
  const users = getStoredUsers();
  const normalizedEmail = email.toLowerCase();
  const matchedUser = users.find(
    (user) => user.email === normalizedEmail && user.password === password,
  );

  if (!matchedUser) {
    setLoginStatus("로그인 실패: 이메일 또는 비밀번호를 확인해 주세요.", "is-error");
    return;
  }

  localStorage.setItem("login", "true");
  localStorage.setItem("gyeolCurrentUser", JSON.stringify(matchedUser));
  setLoginStatus("로그인 성공: 마이페이지로 이동합니다.", "is-success");
  window.location.href = "./mypage.html";
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setLoginStatus("로그인 실패: 이메일과 비밀번호를 입력해 주세요.", "is-error");
      return;
    }

    loginUser(email, password);
  });
}
