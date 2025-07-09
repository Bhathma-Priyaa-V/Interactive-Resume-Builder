// === Load Profile Photo ===
function loadProfilePhoto(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const preview = document.getElementById("profilePhotoPreview");
    preview.src = reader.result;
    preview.style.visibility = "visible";
    preview.setAttribute("data-image", reader.result);
  };
  if (file) {
    reader.readAsDataURL(file);
  }
}

// === Add Dynamic Fields ===
function addEducation() {
  const eduSection = document.getElementById("educationSection");
  const entry = document.createElement("div");
  entry.className = "edu-entry";
  entry.innerHTML = `
    <label>Institute Name:</label>
    <input type="text" placeholder="Enter institute name" />
    <label>Degree:</label>
    <input type="text" placeholder="Enter your degree" />
    <label>Duration:</label>
    <input type="text" placeholder="e.g. 2022–2026" />
    <label>Percentage/CGPA:</label>
    <input type="text" placeholder="Enter CGPA or percentage" />
  `;
  eduSection.appendChild(entry);
}

function addExperience() {
  const expSection = document.getElementById("experienceSection");
  const entry = document.createElement("div");
  entry.className = "exp-entry";
  entry.innerHTML = `
    <label>Company Name:</label>
    <input type="text" placeholder="Enter company name" />
    <label>Role:</label>
    <input type="text" placeholder="Enter your role" />
    <label>Duration:</label>
    <input type="text" placeholder="e.g. Jan 2024 – Apr 2024" />
  `;
  expSection.appendChild(entry);
}

function addProject() {
  const projSection = document.getElementById("projectSection");
  const entry = document.createElement("div");
  entry.className = "proj-entry";
  entry.innerHTML = `
    <label>Project Title:</label>
    <input type="text" placeholder="Enter project title" />
    <label>Project Description:</label>
    <textarea placeholder="Describe your project briefly"></textarea>
  `;
  projSection.appendChild(entry);
}

// === Skill / Cert / Achievement Handlers ===
function handleSkillInput(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = document.getElementById("customSkill");
    const value = input.value.trim();
    if (value !== "") {
      const tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.innerText = value;
      document.getElementById("customSkillList").appendChild(tag);
      input.value = "";
    }
  }
}

function handleCertificationInput(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = document.getElementById("certInput");
    const value = input.value.trim();
    if (value !== "") {
      const item = document.createElement("li");
      item.innerText = value;
      document.getElementById("certList").appendChild(item);
      input.value = "";
    }
  }
}

function handleAchievementInput(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = document.getElementById("achieveInput");
    const value = input.value.trim();
    if (value !== "") {
      const item = document.createElement("li");
      item.innerText = value;
      document.getElementById("achieveList").appendChild(item);
      input.value = "";
    }
  }
}

// === Clear Form ===
function clearForm() {
  document.querySelector("form")?.reset();
  document.getElementById("educationSection").innerHTML = "";
  document.getElementById("experienceSection").innerHTML = "";
  document.getElementById("customSkillList").innerHTML = "";
  document.getElementById("certList").innerHTML = "";
  document.getElementById("achieveList").innerHTML = "";
}

// === Generate Preview ===
function generatePreview() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;
  const linkedin = document.getElementById("linkedin").value;
  const github = document.getElementById("github").value;
  const summary = document.getElementById("summary").value;
  const profileImgSrc = document.getElementById("profilePhotoPreview").getAttribute("data-image");

  // === Education ===
  const eduEntries = document.querySelectorAll("#educationSection .edu-entry");
  let eduHTML = "";
  eduEntries.forEach(entry => {
    const inst = entry.querySelectorAll("input")[0].value;
    const degree = entry.querySelectorAll("input")[1].value;
    const duration = entry.querySelectorAll("input")[2].value;
    const percent = entry.querySelectorAll("input")[3].value;
    eduHTML += `<p><strong>${inst}</strong> (${duration})<br>${degree} — ${percent}</p>`;
  });

  // === Experience ===
  const expEntries = document.querySelectorAll("#experienceSection .exp-entry");
  let expHTML = "";
  expEntries.forEach(entry => {
    const company = entry.querySelectorAll("input")[0].value;
    const role = entry.querySelectorAll("input")[1].value;
    const duration = entry.querySelectorAll("input")[2].value;
    expHTML += `<p><strong>${company}</strong> (${duration})<br>${role}</p>`;
  });

  // === Skills ===
  const checkedSkills = document.querySelectorAll('.predefined-skills input[type="checkbox"]:checked');
  const customSkills = document.querySelectorAll('#customSkillList span');
  let skillsHTML = "";
  checkedSkills.forEach(skill => {
    skillsHTML += `<span style="display:inline-block;margin:4px;padding:6px 10px;background:#dbeafe;color:#1e3a8a;border-radius:12px;">${skill.value}</span>`;
  });
  customSkills.forEach(skill => {
    skillsHTML += `<span style="display:inline-block;margin:4px;padding:6px 10px;background:#dbeafe;color:#1e3a8a;border-radius:12px;">${skill.textContent}</span>`;
  });

  // === Projects ===
  const projectEntries = document.querySelectorAll("#projectSection .proj-entry");
  let projectHTML = "";
  projectEntries.forEach(entry => {
    const title = entry.querySelectorAll("input")[0].value;
    const desc = entry.querySelector("textarea").value;
    projectHTML += `<p><strong>${title}</strong><br>${desc}</p>`;
  });

  // === Certifications ===
  const certList = document.querySelectorAll("#certList li");
  let certHTML = "";
  certList.forEach(cert => {
    certHTML += `<li>${cert.textContent}</li>`;
  });

  // === Achievements ===
  const achieveList = document.querySelectorAll("#achieveList li");
  let achieveHTML = "";
  achieveList.forEach(item => {
    achieveHTML += `<li>${item.textContent}</li>`;
  });

  // === Final HTML ===
  const previewHTML = `
    <div style="padding: 20px; font-family: Poppins, sans-serif; line-height: 1.6;">
      ${profileImgSrc ? `<img src="${profileImgSrc}" style="max-width:100px;border-radius:50%;margin-bottom:10px;" />` : ""}
      <h1 style="color:#4B0082;">${name}</h1>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>LinkedIn:</strong> ${linkedin}</p>
      <p><strong>GitHub:</strong> ${github}</p>
      <hr>
      <h3 style="color:#1e3a8a;">Profile Summary</h3>
      <p>${summary}</p>
      <h3 style="color:#1e3a8a;">Education</h3>
      ${eduHTML}
      <h3 style="color:#1e3a8a;">Experience</h3>
      ${expHTML}
      <h3 style="color:#1e3a8a;">Skills</h3>
      ${skillsHTML}
      ${projectHTML ? `<h3 style="color:#1e3a8a;">Projects</h3>${projectHTML}` : ""}
      ${certHTML ? `<h3 style="color:#1e3a8a;">Certifications</h3><ul>${certHTML}</ul>` : ""}
      ${achieveHTML ? `<h3 style="color:#1e3a8a;">Achievements</h3><ul>${achieveHTML}</ul>` : ""}
    </div>
  `;

  document.getElementById("resumePreview").innerHTML = previewHTML;
  console.log("✅ Preview generated");
}

// === Download PDF ===
document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.getElementById("resumePreviewWrapper");
  if (!document.getElementById("resumePreview").innerHTML.trim()) {
    alert("Please generate your resume before downloading.");
    return;
  }

  setTimeout(() => {
    html2pdf().from(element).set({
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save();
  }, 500);
});
