
      // Email Regex Validation
      function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      }
      
      // Password Regex Validation (at least 8 characters, 1 uppercase, 1 lowercase, and 1 number)
      function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?~-]{8,}$/;
        return passwordRegex.test(password);
      }
      
      // OTP Validation (only 6 numeric characters)
      function validateOTP(otp) {
        const otpRegex = /^\d{6}$/;
        return otpRegex.test(otp);
      }
      
      // Show or Hide Password
      document.getElementById('togglePassword').addEventListener('click', function () {
        const passwordField = document.getElementById('login-password');
        if (passwordField.type === 'password') {
          passwordField.type = 'text';
          this.classList.toggle('bi-eye');
          this.classList.toggle('bi-eye-slash');
        } else {
          passwordField.type = 'password';
          this.classList.toggle('bi-eye');
          this.classList.toggle('bi-eye-slash');
        }
      });
      // Show or Hide New Password
document.getElementById('toggleNewPassword').addEventListener('click', function () {
    const newPasswordField = document.getElementById('newPassword');
    if (newPasswordField.type === 'password') {
        newPasswordField.type = 'text';
        this.classList.remove('bi-eye-slash');
        this.classList.add('bi-eye');
    } else {
        newPasswordField.type = 'password';
        this.classList.remove('bi-eye');
        this.classList.add('bi-eye-slash');
    }
});

// Show or Hide Confirm Password
document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
    const confirmPasswordField = document.getElementById('confirmPassword');
    if (confirmPasswordField.type === 'password') {
        confirmPasswordField.type = 'text';
        this.classList.remove('bi-eye-slash');
        this.classList.add('bi-eye');
    } else {
        confirmPasswordField.type = 'password';
        this.classList.remove('bi-eye');
        this.classList.add('bi-eye-slash');
    }
});
      
      // Validate Form on Submit
      document.getElementById('btn-log-in').addEventListener('click', function () {
        const emailField = document.getElementById('login-email');
        const passwordField = document.getElementById('login-password');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
      
        let isValid = true;
      
        // Email Validation
        if (!validateEmail(emailField.value)) {
          emailField.classList.add('is-invalid');
          emailError.style.display = 'block';
          isValid = false;
        } else {
          emailField.classList.remove('is-invalid');
          emailError.style.display = 'none';
        }

        // Password Validation
        if (!validatePassword(passwordField.value)) {
          passwordField.classList.add('is-invalid');
          passwordError.style.display = 'block';
          isValid = false;
          document.getElementById('togglePassword').style.top = "30%";
        } else {
          passwordField.classList.remove('is-invalid');
          passwordError.style.display = 'none';
          document.getElementById('togglePassword').style.top = "50%";
        }
      
        // Proceed if all fields are valid
        if (isValid) {
          // Submit form logic here
          
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    document.getElementById('btn-log-in').disabled = true;
    document.body.style.cursor = 'wait';

      fetch(API_URL + "/api/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((json) => {
          document.body.style.cursor = 'default';
          document.getElementById('btn-log-in').disabled = false;
          showToast(json.message, json.result);
          if(json.result == true){

            let token = json.data.token;
            localStorage.setItem("authToken", token);
            setTimeout(()=>{
              location.href = "../homepage.html";
            }, 1500);
            
          }
        });
    }
  
        }
      );
      

      document.getElementById('login-email').addEventListener('input', (e)=>{
          if (validateEmail(e.target.value)) {
            e.target.classList.remove('is-invalid');
            document.getElementById('email-error').style.display = 'none';
        }});

        document.getElementById('login-password').addEventListener('input', (e)=>{
          if (validatePassword(e.target.value)) {
            e.target.classList.remove('is-invalid');
            document.getElementById('password-error').style.display = 'none';
            document.getElementById('togglePassword').style.top = "50%";
        }});

        if (document.getElementById("btn-forgot-pass")) {
  document.getElementById("btn-forgot-pass").onclick = () => {
    document.getElementById("btn-send-email-forgot-pass").onclick = () => {
      const email = document.getElementById("forgot-pass-email").value;
      if(!validateEmail(email)){
        document.getElementById("forgot-pass-email").classList.add('is-invalid');
        document.getElementById('email-change-pass-error').style.display = 'block';
        return;
      }
      else{
        document.getElementById("forgot-pass-email").classList.remove('is-invalid');
        document.getElementById('email-change-pass-error').style.display = 'none';
      }

      document.body.style.cursor = "wait"; // Set the cursor to loading
      document.getElementById("btn-send-email-forgot-pass").disabled = true;


      fetch(`${API_URL}/api/forgot/pass`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((json) => {
          document.body.style.cursor = "default"; // Reset the cursor
          document.getElementById("btn-send-email-forgot-pass").disabled = false;

          // Check if the response was successful
          if (json.result === true) {
            // Close the Forgot Password modal

            const forgotPassModal =
              document.getElementById("exampleModalToggle");
            const bootstrapForgotPassModal =
              bootstrap.Modal.getInstance(forgotPassModal);
            bootstrapForgotPassModal.hide(); // Close the modal

            // Open the OTP modal
            const otpModal = new bootstrap.Modal(
              document.getElementById("exampleModalToggle2")
            );
            otpModal.show();
            document.getElementById('lbl-email-forgot-pass').innerText = document.getElementById("forgot-pass-email").value

            // OTP inputs handling logic here
            setupOtpInputFields();
          } else {
            showToast("Failed to send reset email. Please try again.", false);
            // alert('Failed to send reset email. Please try again.');
          }
        })
        .catch((error) => {
          document.body.style.cursor = "default"; // Reset the cursor
          console.error("Error:", error);
          // alert('An error occurred. Please try again.');
          showToast("An error occurred. Please try again.", false);
        });
    };
  };
}

document.getElementById("forgot-pass-email").addEventListener('input', ()=>{
  if(validateEmail(document.getElementById("forgot-pass-email").value)){
    document.getElementById("forgot-pass-email").classList.remove('is-invalid');
        document.getElementById('email-change-pass-error').style.display = 'none';
  }
})

let otpCode = "";

function setupOtpInputFields() {
  // Select all OTP input fields
  const otpInputs = document.querySelectorAll(".otp-inputs input");

  // Add event listener to each input field
  otpInputs.forEach((input, index) => {
    input.addEventListener("keydown", function (event) {
      if (event.key.match(/^[a-zA-Z0-9]$/)) {
        otpInputs[index].value = ""; // Clear the current value for a new entry
        // Move to the next input field after entering a character
        if (index < otpInputs.length - 1) {
          setTimeout(() => otpInputs[index + 1].focus(), 10); // Move to next input after a small delay
        }
      } else if (event.key === "Backspace") {
        // If backspace is pressed, move to the previous input field
        if (index > 0) {
          setTimeout(() => otpInputs[index - 1].focus(), 10); // Move to previous input
        }
      }
    });
  });

  // Function to get the OTP value from all input fields
  function getOtpValue() {
    const otpInputs = document.querySelectorAll(".otp-inputs input");
    let otpCode = "";
    otpInputs.forEach((input) => {
      otpCode += input.value; 
    });
    return otpCode;
  }

  
  if (document.getElementById("otpVerifyBtn")) {
    document.getElementById("otpVerifyBtn").onclick = function () {
      otpCode = getOtpValue(); 

      if (otpCode.length < otpInputs.length) {
        showToast("Please enter all OTP fields.", false);
        return;
      }

      document.getElementById("otpVerifyBtn").disabled = true;
      document.body.style.cursor = 'wait';

      fetch(`${API_URL}/api/forgot/verify-otp`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otpCode,
          email: document.getElementById("forgot-pass-email").value,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          document.getElementById("otpVerifyBtn").disabled = false;
      document.body.style.cursor = 'default';
          if (json.result === true) {
            // Close the OTP modal
            const otpModalInstance = bootstrap.Modal.getInstance(
              document.getElementById("exampleModalToggle2")
            );
            otpModalInstance.hide(); // Close OTP modal

            // Open the Change Password modal
            const changePassModal = new bootstrap.Modal(
              document.getElementById("changePasswordModal")
            );
            changePassModal.show();
          } else {
            // alert('OTP verification failed. Please try again.');
            showToast("OTP verification failed. Please try again.", false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // alert('An error occurred during OTP verification.');
          showToast(
            "An error occurred during OTP verification. Please try again.",
            false
          );
        });
    };
  }
}

// Handle password change process
if (document.getElementById("changePasswordSubmitBtn")) {
  document.getElementById("changePasswordSubmitBtn").onclick = () => {
    const newPass = document.getElementById("newPassword").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    const email = document.getElementById("forgot-pass-email").value;
    let isvalid = true;


    // Validate New Password
    if (!validatePassword(newPass)) {
      document.getElementById("newPassword").classList.add("is-invalid");
      document.getElementById("new-password-error").style.display = "block";
      document.getElementById('toggleNewPassword').style.top = "29.5%";
      isvalid = false;
    } else {
      document.getElementById("newPassword").classList.remove("is-invalid");
      document.getElementById("new-password-error").style.display = "none";
      document.getElementById('toggleNewPassword').style.top = "50%";
    }

    // Validate Confirm Password Match
    if (newPass !== confirmPass) {
      document.getElementById("confirmPassword").classList.add("is-invalid");
      document.getElementById("confirm-password-error").style.display = "block";
      document.getElementById('toggleConfirmPassword').style.top = "19%";
      isvalid = false;
    } else {
      document.getElementById("confirmPassword").classList.remove("is-invalid");
      document.getElementById("confirm-password-error").style.display = "none";
      document.getElementById('toggleConfirmPassword').style.top = "32%";
    }

    // Proceed only if all validations pass
    if (isvalid) {
      document.getElementById("changePasswordSubmitBtn").disabled = true;
      document.body.style.cursor = 'wait'
      fetch(`${API_URL}/api/reset/pass`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otpCode,
          email: email,
          new_pass: newPass,
          new_pass_confirmation: confirmPass,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          document.getElementById("changePasswordSubmitBtn").disabled = false;
          document.body.style.cursor = 'default'
          const changePassModalInstance = bootstrap.Modal.getInstance(
            document.getElementById("changePasswordModal")
          );
          if (json.result === true) {
            changePassModalInstance.hide();
            showToast(json.message, json.result);
          } else {
            showToast("Password change failed. Please try again.", false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showToast("An error occurred while changing the password.", false);
        });
    }
  };
}
    // Resend OTP (placeholder functionality)
      function resendOtp(btn) {
        document.getElementById("forgot-pass-email").value
        btn.disabled = true;
        document.body.style.cursor = 'wait'
        fetch(`${API_URL}/api/forgot/pass`, {
          method: "POST",
          headers: {Accept: "application/json",
          "Content-Type": "application/json"},
          body: JSON.stringify({
            email: document.getElementById("forgot-pass-email").value
          })
        })
        .then(res=>res.json())
        .then(json=>{
          btn.disabled = false;
        document.body.style.cursor = 'default'
          showToast(json.result === true ? "Successfully resended OTP to your email." : json.message, json.result);
        })
        
      }
      
      