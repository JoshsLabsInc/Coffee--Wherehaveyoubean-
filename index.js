document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-section .auth-form");
    const signupForm = document.querySelector(".signup-section .auth-form");
    const toSignupBtn = document.getElementById("to-signup");
    const toLoginBtn = document.getElementById("to-login");
    const authOptions = document.querySelector(".auth-options");
  
    loginForm.addEventListener("submit", handleLogin);
    signupForm.addEventListener("submit", handleSignup);
  
    toSignupBtn.addEventListener("click", () => {
      authOptions.style.transform = "rotateY(180deg)";
      clearFormInputs();
    });
  
    toLoginBtn.addEventListener("click", () => {
      authOptions.style.transform = "rotateY(0deg)";
      clearFormInputs();
    });
  
    function clearFormInputs() {
      document.querySelectorAll(".auth-form input").forEach((input) => {
        input.value = "";
      });
    }
  
    function hasInvalidChars(str) {
      const invalidPattern = /[^a-zA-Z0-9@._-]/;
      return invalidPattern.test(str);
    }
  
    function isStrongPassword(password) {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
      return pattern.test(password);
    }
  
    function isValidEmail(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }
  
    function handleLogin(e) {
      e.preventDefault();
  
      const username = document.getElementById("login-username");
      const password = document.getElementById("login-password");
  
      const storedUser = JSON.parse(localStorage.getItem("userAccount"));
  
      if (username.value.trim().length < 4 || hasInvalidChars(username.value.trim())) {
        alert("Invalid username.");
        return;
      }
  
      if (password.value.length < 8 || hasInvalidChars(password.value)) {
        alert("Invalid password.");
        return;
      }
  
      if (
        !storedUser ||
        storedUser.username !== username.value.trim() ||
        storedUser.password !== password.value
      ) {
        alert("Incorrect username or password.");
        return;
      }
  
      alert("✅ Login successful!");
      // Optional: window.location.href = "home.html";
    }
  
    function handleSignup(e) {
      e.preventDefault();
  
      const username = document.getElementById("signup-username");
      const email = document.getElementById("signup-email");
      const password = document.getElementById("signup-password");
  
      if (username.value.trim().length < 4) {
        alert("Username must be at least 4 characters.");
        return;
      }
      if (hasInvalidChars(username.value.trim())) {
        alert("Username contains invalid characters.");
        return;
      }
  
      if (!isValidEmail(email.value.trim())) {
        alert("Please enter a valid email address.");
        return;
      }
      if (hasInvalidChars(email.value.trim())) {
        alert("Email contains invalid characters.");
        return;
      }
  
      if (!isStrongPassword(password.value)) {
        alert("Password must be 8+ characters and include letters and numbers.");
        return;
      }
      if (hasInvalidChars(password.value)) {
        alert("Password contains invalid characters.");
        return;
      }
  
      const user = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value
      };
  
      localStorage.setItem("userAccount", JSON.stringify(user));
      alert("✅ Account created! You can now log in.");
      toLoginBtn.click();
    }
  });
  
