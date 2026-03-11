const signupForm = document.querySelector("#signup-form");
const signupStatus = document.querySelector("#signup-status");

function getStoredUsers() {
  const users = localStorage.getItem("gyeolUsers");

  try {
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

if (signupForm && signupStatus) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const users = getStoredUsers();
    const normalizedEmail = email.toLowerCase();
    const duplicatedUser = users.find((user) => user.email === normalizedEmail);

    let message = "";
    let statusClass = "is-error";

    if (!name || !email || !password || !confirmPassword) {
      message = "회원가입 실패: 모든 항목을 입력해 주세요.";
    } else if (!emailPattern.test(email)) {
      message = "회원가입 실패: 올바른 이메일 형식을 입력해 주세요.";
    } else if (password.length < 8) {
      message = "회원가입 실패: 비밀번호는 8자 이상이어야 합니다.";
    } else if (password !== confirmPassword) {
      message = "회원가입 실패: 비밀번호가 일치하지 않습니다.";
    } else if (duplicatedUser) {
      message = "회원가입 실패: 이미 사용 중인 이메일입니다.";
    } else {
      users.push({
        name,
        email: normalizedEmail,
        password,
      });

      localStorage.setItem("gyeolUsers", JSON.stringify(users));
      message = "회원가입 성공: 계정이 생성되었습니다. 이제 로그인할 수 있습니다.";
      statusClass = "is-success";
      signupForm.reset();

      signupStatus.textContent = message;
      signupStatus.className = `form-status ${statusClass}`;
      window.location.href = "./Login.html";
      return;
    }

    signupStatus.textContent = message;
    signupStatus.className = `form-status ${statusClass}`;
  });
}
