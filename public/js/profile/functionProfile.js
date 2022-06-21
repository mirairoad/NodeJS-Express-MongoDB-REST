console.log('/js/functionsProfile.js');

// update Profile
  async function patchProfile(){
  const form = document.querySelector("#update");
  const messageResponse = document.querySelector("#messageResponse");
  console.log(form);
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // reset errors
    messageResponse.textContent = "";
  
    // get values
    const profile_name = form.profile_name.value;
    const profile_job = form.profile_job.value;
    const profile_website = form.profile_website.value;
    const profile_bio = form.profile_bio.value;
  
    try {
        const res = await fetch("/api/profile/update", {
            method: "PATCH",
            body: JSON.stringify({
                profile_name,
                profile_job,
                profile_website,
                profile_bio,
            }),
            headers: { "Content-Type": "application/json" },
        });
  
        const data = await res.json();
        // console.log(data);
  
        if (data.message) {
            if (data.message === "success") {
                messageResponse.textContent = "your profile has been updated";
                setTimeout(function(){
                  location.assign("/dashboard/profile");
                },1500)
  
            } else {
                messageResponse.textContent = "something went wrong, please try later";
            }
        }
    } catch (err) {
        messageResponse.textContent = "something went wrong, please try later";
    }
  
  });
};

// create Profile
async function createProfile(){
  const form = document.querySelector("#createProfile");
  const messageResponse = document.querySelector("#messageResponse");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // reset errors
    messageResponse.textContent = "";
  
    // get values
    const profile_name = form.profile_name.value;
    const profile_job = form.profile_job.value;
    const profile_website = form.profile_website.value;
    const profile_bio = form.profile_bio.value;
  
    console.log(form.profile_bio);
  
    try {
        const res = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify({
                profile_name,
                profile_job,
                profile_website,
                profile_bio,
            }),
            headers: { "Content-Type": "application/json" },
        });
  
        const data = await res.json();
        // console.log(data);
  
        if (data.message) {
            if (data.message === "success") {
                messageResponse.textContent = "your profile has been updated";
                setTimeout(function(){
                  location.assign("/dashboard/profile");
                },1500)
            } else {
                messageResponse.textContent = "something went wrong, please try later";
            }
        }
    } catch (err) {
        messageResponse.textContent = "something went wrong, please try later";
    }
  
  }); 
};

// swap navigation Click_noRefresh
function updateClick() {
  const update = $("#update");
  const overview = $("#overview");
  const deleteProfile = $("#delete");

  update.removeClass("section_hidden");
  overview.addClass("section_hidden");
  deleteProfile.addClass("section_hidden");
}

function overviewClick() {
  const update = $("#update");
  const overview = $("#overview");
  const deleteProfile = $("#delete");
  const popupDelete = $("#popup_delete");

  update.addClass("section_hidden");
  overview.removeClass("section_hidden");
  deleteProfile.addClass("section_hidden");
  popupDelete.addClass("section_hidden");
}

function deleteClick() {
  const update = $("#update");
  const overview = $("#overview");
  const deleteProfile = $("#delete");

  update.addClass("section_hidden");
  overview.addClass("section_hidden");
  deleteProfile.removeClass("section_hidden");
}
// ----End swap menu

// popup delete
function confirmClick() {
  const popup = $("#popup_delete");
  const actionDelete = $("#action_delete");
  popup.removeClass("section_hidden");
  actionDelete.addClass("section_hidden")
}
function dismissClick() {
  const popup = $("#popup_delete");
  const actionDelete = $("#action_delete");
  popup.addClass("section_hidden");
  actionDelete.removeClass("section_hidden")
}

// delete User + Data
async function deleteProfileClick() {
  try {
    const res = await fetch("/api/users/me", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    // console.log(data);

    if (data.message) {
      if (data.message) {
        emailError.textContent = data.message;
        location.assign("/");
      } else {
        emailError.textContent = "something went wrong, please try later";
      }
    }
  } catch (err) {
    emailError.textContent = "something went wrong, please try later";
  }
}

// extra menu picture
function extraMenuPicture() {
  const extraMenu = document.querySelector("#extraMenu");
  extraMenu.classList.toggle("hidden");
}
function changeProfilePicture() {
  document.querySelector("#avatar").click();
}

// upload picture function
async function uploadPhoto() {
  const fileInput = document.querySelector("#avatar");
  const messageResponse = document.querySelector("#messageResponse");

  const formData = new FormData();
  formData.append("profile_avatar", fileInput.files[0]);

  try {
    const res = await fetch("/api/profile/avatar", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    if (data.message) {
      if (data.message === "success") {
        messageResponse.textContent = "profile picture uploaded successfully";

        setTimeout(function () {
          location.assign("/dashboard/profile");
        }, 3000);
      } else {
        messageResponse.textContent = "something went wrong, please try later";
      }
    }
  } catch (err) {
    messageResponse.textContent = "something went wrong, please try later";
  }
}
// delete profile picture
async function deleteProfilePicture() {
  try {
    var messageResponse = document.querySelector("#messageResponse");

    const res = await fetch("/api/profile/avatar/delete", {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.message) {
      if (data.message === "success") {
        messageResponse.textContent = "it works";

        setTimeout(function () {
          location.assign("/dashboard/profile");
        }, 1500);
      } else {
        messageResponse.textContent = "something went wrong, please try later";
      }
    }
  } catch (err) {
    messageResponse.textContent = "something went wrong, please try later";
  }
}

function saveProfile() {
  document.querySelector("#saveProfile").click();
}