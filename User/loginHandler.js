// Function to get user data from localStorage
function debugLocalStorage() {

    if (typeof window !== 'undefined') {
  
      console.log('localStorage keys:', Object.keys(localStorage));
  
    } else {
  
      console.log('localStorage is not available in this environment.');
  
    }
  
  }


  function getUsersFromLocalStorage() {
    try {
        const storedUsers = typeof localStorage !== "undefined" ? localStorage.getItem("users") : null;
    } catch (error) {
        console.log("Error getting users from localStorage", error);
    }
    return storedUsers ? JSON.parse(storedUsers) : [];
}


// Function to save user data to localStorage
function saveUsersToLocalStorage(users) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("users", JSON.stringify(users));
    }
}

// Array to store registered users
let users = getUsersFromLocalStorage();
console.log(users);


// Function to register a new user
function registerUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const nickName = document.getElementById("nickName").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Validate unique email
    if (email && isEmailUnique(email)) {
        alert("Email is already registered. Please use a different email.");
        return;
    }
    /*
      // Validate unique phone number
      if (isPhoneNumberUnique(phoneNumber)) {
        if (phoneNumber && isPhoneNumberUnique(phoneNumber)) {
            alert("Phone number is already registered. Please use a different number.");
            return;
        }
        return;
      }
        */

    // Create a new user object
    const newUser = {
        id: generateUniqueId(),
        username,
        email,
        password,
        nickName,
        phoneNumber,
        profilePic,
    };

    // Add the new user to the array
    users.push(newUser);
    console.log(users);
    saveUsersToLocalStorage(users);
    // Display success message (you can modify this as needed)
    alert("Registration successful!");

    // Clear the form
    document.getElementById("registrationForm").reset();
    window.location.href = "login.html";
}

// Function to check if the email is unique
function isEmailUnique(email) {
    return users.some((user) => user.email === email);
}

// Function to check if the phone number is unique
function isPhoneNumberUnique(phoneNumber) {
    return users.some((user) => user.phoneNumber === phoneNumber);
}

// Function to generate a unique ID (simple increment for demonstration purposes)
function generateUniqueId() {
    return users.length + 1;
}



///login page
function login() {
    console.log(users);
    const loginUser = document.getElementById("loginUser").value;
    const loginPassword = document.getElementById("loginPassword").value;

    // Check if there is a user with the provided email
    const user = users.find((user) => user.username === loginUser);

    // If no user found or password is incorrect, show an alert
    if (!user || user.password !== loginPassword) {
        alert("Invalid email or password. Please try again.");
        return;
    }
    // If login is successful, store user information in sessionStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // If login is successful, redirect to another page (e.g., welcome.html)
    window.location.href = "user.html";
}

///login page
function testLogin() {
    console.log(users);
    const loginUser = "1"
    const loginPassword = "1"

    // Check if there is a user with the provided email
    const user = users.find((user) => user.username === loginUser);

    // If no user found or password is incorrect, show an alert
    if (!user || user.password !== loginPassword) {
        alert("Invalid email or password. Please try again.");
        return;
    }
    // If login is successful, store user information in sessionStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // If login is successful, redirect to another page (e.g., welcome.html)
    window.location.href = "user.html";
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

    const loggedInUser = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem("loggedInUser")) : null;
function changeNickName(name) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const newName1 = name

    if (!loggedInUser) {
        alert("No user is currently logged in.");
        return;
    }

    if (!newName1.trim()) {
        alert("Please enter a valid nickname.");
        return;
    }

    // Update the nickname of the logged-in user
    loggedInUser.nickName = newName1;
    console.log(name.value);
    console.log(loggedInUser.nickName);

    // Update the users array
    const userIndex = users.findIndex((user) => user.id === loggedInUser.id);
    if (userIndex !== -1) {
        users[userIndex].nickName = newName1;
        saveUsersToLocalStorage(users);
    }

    // Update the logged-in user in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    // Display the updated nickname
    displayUsername();
    alert("Nickname updated successfully!");
}




function displayUsername() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        document.getElementById("displayName").textContent = loggedInUser.nickName;
    }
}


