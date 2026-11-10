# Portfolio

Personal portfolio of Nandani Ramoliya: AI developer, automation engineer and founder of [Indrix](https://nandaniramoliya.github.io/Indrix/).

It is a plain static site (HTML, CSS and JavaScript) with no build step. All files sit at the top level of this repository, so it can be published directly with GitHub Pages or Netlify.

| File | What it is |
|---|---|
| `index.html` | The whole page: hero, about, experience, skills, projects, services, contact |
| `style.css` | All styles |
| `script.js` | Typewriter effect, scroll animations, project pop-ups, contact form |
| `images/` | Profile photo and icons |
| `Nandani_Ramoliya_Resume.pdf` | Resume offered by the "Download Resume" button |
| `server.ps1` | Optional helper to preview the site on a Windows computer |

## Add a project

1. In `index.html`, copy one `<div class="project-card" data-project="...">` block and give it a new `data-project` name.
2. Copy one `<div class="project-modal" id="modal-...">` block near the end of the file and give it the matching id, for example `modal-myproject`.
