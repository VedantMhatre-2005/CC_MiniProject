import React, { useState } from "react";

function App() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
  });
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }]);
  const [experience, setExperience] = useState([{ company: "", role: "", start_date: "", end_date: "", description: "" }]);
  const [skills, setSkills] = useState([""]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileId, setProfileId] = useState(null);

  // Helper to update array state
  const handleArrayChange = (arr, setArr, idx, field, value) => {
    const newArr = [...arr];
    newArr[idx][field] = value;
    setArr(newArr);
  };

  // Submit Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 1. Create Profile
    let formData = new FormData();
    Object.entries(profile).forEach(([k, v]) => formData.append(k, v));
    if (profileImage) formData.append("profile_image", profileImage);
    const res = await fetch("http://127.0.0.1:8000/api/profiles/", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setProfileId(data.id);

    // 2. Create Education
    for (const edu of education) {
      await fetch("http://127.0.0.1:8000/api/educations/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...edu, profile: data.id }),
      });
    }
    // 3. Create Experience
    for (const exp of experience) {
      await fetch("http://127.0.0.1:8000/api/experiences/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...exp, profile: data.id }),
      });
    }
    // 4. Create Skills
    for (const skill of skills) {
      await fetch("http://127.0.0.1:8000/api/skills/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: skill, profile: data.id }),
      });
    }
    alert("Profile created! You can now download your resume.");
  };

  // Download Resume
  const handleDownload = async () => {
    if (!profileId) return;
    window.open(`http://127.0.0.1:8000/api/generate_resume/${profileId}/`, "_blank");
  };

  return (
    <div>
      <h1>Resume Generator</h1>
      <form onSubmit={handleSubmit}>
        {/* Profile Fields */}
        <input placeholder="Name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} /><br />
        <input placeholder="Email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} /><br />
        <input placeholder="Phone" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} /><br />
        <textarea placeholder="Summary" value={profile.summary} onChange={e => setProfile({ ...profile, summary: e.target.value })} /><br />
        <input type="file" onChange={e => setProfileImage(e.target.files[0])} /><br />

        {/* Education Fields */}
        <h3>Education</h3>
        {education.map((edu, i) => (
          <div key={i}>
            <input placeholder="School" value={edu.school} onChange={e => handleArrayChange(education, setEducation, i, "school", e.target.value)} />
            <input placeholder="Degree" value={edu.degree} onChange={e => handleArrayChange(education, setEducation, i, "degree", e.target.value)} />
            <input placeholder="Year" value={edu.year} onChange={e => handleArrayChange(education, setEducation, i, "year", e.target.value)} />
            <button type="button" onClick={() => setEducation([...education, { school: "", degree: "", year: "" }])}>+</button>
          </div>
        ))}

        {/* Experience Fields */}
        <h3>Experience</h3>
        {experience.map((exp, i) => (
          <div key={i}>
            <input placeholder="Company" value={exp.company} onChange={e => handleArrayChange(experience, setExperience, i, "company", e.target.value)} />
            <input placeholder="Role" value={exp.role} onChange={e => handleArrayChange(experience, setExperience, i, "role", e.target.value)} />
            <input placeholder="Start Date" value={exp.start_date} onChange={e => handleArrayChange(experience, setExperience, i, "start_date", e.target.value)} />
            <input placeholder="End Date" value={exp.end_date} onChange={e => handleArrayChange(experience, setExperience, i, "end_date", e.target.value)} />
            <textarea placeholder="Description" value={exp.description} onChange={e => handleArrayChange(experience, setExperience, i, "description", e.target.value)} />
            <button type="button" onClick={() => setExperience([...experience, { company: "", role: "", start_date: "", end_date: "", description: "" }])}>+</button>
          </div>
        ))}

        {/* Skills Fields */}
        <h3>Skills</h3>
        {skills.map((skill, i) => (
          <div key={i}>
            <input placeholder="Skill" value={skill} onChange={e => {
              const newSkills = [...skills];
              newSkills[i] = e.target.value;
              setSkills(newSkills);
            }} />
            <button type="button" onClick={() => setSkills([...skills, ""])}>+</button>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDownload} disabled={!profileId}>Download Resume</button>
    </div>
  );
}

export default App;