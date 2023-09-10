import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCsuNvyPvDVhvDw_wx-CDONuJws-S7-VMk",
    authDomain: "mini-hackathone-62126.firebaseapp.com",
    projectId: "mini-hackathone-62126",
    storageBucket: "mini-hackathone-62126.appspot.com",
    messagingSenderId: "45526099624",
    appId: "1:45526099624:web:5068eac5010dd1b90a049d"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);
// sign up
  const submitButton = document.getElementById("submit");
  const signupButton = document.getElementById("sign-up");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const main = document.getElementById("main");
  const createacct = document.getElementById("create-acct")
  
  // signin
  const signupEmailIn = document.getElementById("email-signup");
  const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
  const signupPasswordIn = document.getElementById("password-signup");
  const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
  const createacctbtn = document.getElementById("create-acct-btn");
  


  const returnBtn = document.getElementById("return-btn");
  
  var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;
  
createacctbtn.addEventListener("click", function() {
    var isVerified = true;
  
    signupEmail = signupEmailIn.value;
    confirmSignupEmail = confirmSignupEmailIn.value;
    if(signupEmail != confirmSignupEmail) {
        window.alert("Email fields do not match. Try again.")
        isVerified = false;
    }
  
    signupPassword = signupPasswordIn.value;
    confirmSignUpPassword = confirmSignUpPasswordIn.value;
    if(signupPassword != confirmSignUpPassword) {
        window.alert("Password fields do not match. Try again.")
        isVerified = false;
    }
    
    if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
      window.alert("Please fill out all required fields.");
      isVerified = false;
    }
    
    if(isVerified) {
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.alert("Success! Account created.", userCredential);
    
            let uniqueId = auth.currentUser.uid;
            let userReference = ref(database, "users/" + uniqueId);
            let obj = {
              email: signupEmailIn.value,
              confirmEmail: confirmSignupEmailIn.value,
              password: signupPasswordIn.value,
              confirmPassword: confirmSignUpPasswordIn.value,
            };
    
            set(userReference, obj)
              .then((userCredential) => {
                console.log("Successfully added data in the database", userCredential);
              })
              .catch((error) => {
                console.error("Error adding data to the database:", error);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            window.alert("Error occurred. Try again.");
            console.error("Error creating user:", errorMessage);
          });
      }
  });
  
  submitButton.addEventListener("click", function() {
    email = emailInput.value;
    console.log(email);
    password = passwordInput.value;
    console.log(password);

    // function direct () {
    //     auth.onAuthStateChanged (user => {
    //       if(user) {
    //         window.location.href = "students.html"
    //       }
    
    //     })
    //   }
    //   direct ();
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.alert("Success!");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error occurred. Try again.");
        window.alert("Error occurred. Try again.");
      });
  });
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Success! Welcome back!");
        window.alert("Success! Welcome back!");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error occurred. Try again.");
        window.alert("Error occurred. Try again.");
      })

 signupButton.addEventListener("click", function() {
      main.style.display = "none";
      createacct.style.display = "block";
  });
  
returnBtn.addEventListener("click", function() {
      main.style.display = "block";
      createacct.style.display = "none";
  });




  





