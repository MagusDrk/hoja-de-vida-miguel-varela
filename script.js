const titles = {
    es: {
        cv: 'Hoja de Vida',
        personal_information: 'Información Personal',
        summary: 'Resumen Profesional',
        languages: 'Idiomas',
        technical_skills: 'Habilidades Técnicas',
        soft_skills: 'Habilidades Blandas',
        work_experience: 'Experiencia Laboral',
        education: 'Educación',
        work_references: 'Referencias Laborales',
        personal_references: 'Referencias Personales',
        awards: 'Reconocimientos',
    },
    en: {
        cv: 'Curriculum Vitae',
        personal_information: 'Personal Information',
        summary: 'Professional Summary',
        languages: 'Languages',
        technical_skills: 'Technical Skills',
        soft_skills: 'Soft Skills',
        work_experience: 'Work Experience',
        education: 'Education',
        work_references: 'Work References',
        personal_references: 'Personal References',
        awards: 'Awards',
    },
    fr: {
        cv: 'Curriculum Vitae',
        personal_information: 'Informations Personnelles',
        summary: 'Résumé Professionnel',
        languages: 'Langues',
        technical_skills: 'Compétences Techniques',
        soft_skills: 'Compétences Douces',
        work_experience: 'Expérience Professionnelle',
        education: 'Éducation',
        work_references: 'Références Professionnelles',
        personal_references: 'Références Personnelles',
        awards: 'Récompenses',
    }
};

const cvData = {
    es: cvDataEs,
    en: cvDataEn,
    fr: cvDataFr
};

window.addEventListener('load', function () {
    const userLang = navigator.language || navigator.userLanguage; // es-CO, en-US
    const lang = userLang.startsWith('es') ? 'es' : userLang.startsWith('fr') ? 'fr' : 'en';
    setLanguage(lang);
});

function setLanguage(lang) {
    document.title = `${cvData[lang].personal_information.name} - ${titles[lang].cv} (${lang.toUpperCase()})`;
    createCV(titles[lang], cvData[lang]);
}

function createCV(cvTitles, cvData) {
    clearContent();
    createHeader(cvData.personal_information);
    createSection(cvTitles.work_experience, createWorkExperience(cvData.work_experience));
    createSection(cvTitles.education, createEducation(cvData.education));
    createSection(cvTitles.languages, createLanguages(cvData.languages));
    createSection(cvTitles.technical_skills, createSkills(cvData.technical_skills));
    createSection(cvTitles.soft_skills, createSkills(cvData.soft_skills));
    createSection(cvTitles.work_references, createReferences(cvData.work_references));
    createSection(cvTitles.personal_references, createReferences(cvData.personal_references));
    createSection(cvTitles.awards, createAwards(cvData.awards));
}

function clearContent() {
    document.querySelector('header').innerHTML = '';
    document.querySelector('main').innerHTML = '';
}

function createHeader(data) {
    const header = document.querySelector('header');
    header.classList.add('column');
    header.innerHTML = `
        <div class="row float-right-top">
            <button class="circular-button spanish" onClick="setLanguage('es')"></button>
            <button class="circular-button english" onClick="setLanguage('en')"></button>
            <button class="circular-button french" onClick="setLanguage('fr')"></button>
        </div>
        <div class="row nowrap">
            <img class="photo" src="photo.jpg" alt="Miguel Varela">
            <div>
                <h1 class="name">${data.name}</h1>
                <h2 class="title">${data.title}</h2>
                <p class="summary">${data.summary}</p>
            </div>
        </div>
        <div class="row flex-fill">
            <article class="card">
                <span class="material-icons">phone</span></br>
                <a href="tel:${data.contact.phone}">${data.contact.phone}</a>
            </article>
            <article class="card">
                <span class="material-icons">email</span></br>
                <a href="mailto:${data.contact.email}">${data.contact.email}</a>
            </article>
            <article class="card">
                <span class="material-icons">link</span></br>
                <a href="https://${data.contact.linkedin}" target="_blank">${data.contact.linkedin}</a>
            </article>
            <article class="card">
                <span class="material-icons">location_on</span></br>
                ${data.contact.location}
            </article>
        </div>
    `;
}

function createSection(title, content, parent = 'main') {
    const section = document.createElement('section');
    if (title) {
        const h2 = document.createElement('h2');
        h2.innerText = title;
        section.appendChild(h2);
    }
    section.innerHTML += content;
    document.querySelector(`${parent}`).appendChild(section);
}

function createProfessionalSummary(summary) {
    return `<p>${summary}</p>`;
}

function createLanguages(languages) {
    const languagesList = languages.map(({ language, proficiency }) => `<li class="chip">${language} (${proficiency})</li>`).join('');
    return `<ul class="row">${languagesList}</ul>`;
}

function createSkills(skillsArray) {
    const skills = skillsArray.map(skill => `<li class="chip">${skill}</li>`).join('');
    return `<ul class="row chip-container">${skills}</ul>`;
}

function createWorkExperience(experience) {
    const experienceList = experience.map(job => `
        <li class="card experience">
            <h3>${job.position} - ${job.company}</h3>
            <em>${job.location}</em>
            <em>${job.start_date} - ${job.end_date}</em>
            <p>${job.description}</p>
        </li>
        `).join('');
    return `<ul class="column">${experienceList}</ul>`;
}

function createEducation(education) {
    const educationList = education.map(item => `
        <li class="card reference">
            <h3>${item.degree}</h3>
            <p>${item.institution}</p>
            <p><em>${item.graduation_year}, ${item.location}</em></p>
        </li>
        `).join('');
    return `<ul class="row flex-fill">${educationList}</ul>`;
}

function createReferences(references) {
    const referencesList = references.map(ref => `
        <li class="card reference">
            <h3>${ref.name}</h3>
            <p>${ref.company} - ${ref.position}</p>
            <p>${ref.phone}</p>
        </li>
    `).join('');
    return `<ul class="row flex-fill">${referencesList}</ul>`;
}

function createAwards(awards) {
    const awardsList = awards.map(award => `
        <li class="card">
            <h3>${award.title}</h3>
            <p>${award.issued_by} - ${award.associated_with}</p>
            <p>${award.date_issued}</p>
            <p>${award.details}</p>
            ${award.ref ? `<em>Referencia:</em> <a href="${award.ref}" target="_blank">${award.ref}</a>` : ''}
        </li>
    `).join('');
    return `<ul class="row flex-fill">${awardsList}</ul>`;
}
