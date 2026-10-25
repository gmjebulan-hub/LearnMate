# LearnMate website

A static, responsive learning website built with HTML5, CSS3, and vanilla JavaScript. Curriculum lessons, activity instructions, and 10-question quizzes for each of the nine modules are drawn from the two provided PDFs.

## Run locally
1. Extract `LearnMate_Website.zip`.
2. Open `learnmate/index.html` in a modern browser. No build tools or server are required.
3. For best compatibility, you may run a local static server from the `learnmate` folder (for example, VS Code Live Server).

## Features
- Nine curriculum modules with source-derived lesson content and 10-item quizzes each.
- Quiz scoring, feedback and answer explanations only after submission; all questions must be answered.
- Practical activity drafts and completion status.
- Dashboard with dynamic progress, quiz attempts, points and badges.
- Capstone draft, required-field completion check, portfolio summary, print layout, and JSON backup export/import.
- Responsive layout and mobile navigation.

## Data and limitations
Progress and drafts are saved in the browser's `localStorage` on the current device/browser. This is not cloud storage or account-based authentication. Clearing browser data may remove progress; use the JSON backup to export a copy. Activity entries are self-reported and are not uploaded or verified. No external APIs or backend are used. The curriculum PDF proposes multimedia integration, but no source video assets were supplied, so lessons are presented as text. The capstone fields follow the module PDF's required submission elements.

## Points
Completing an activity once awards 10 points; marking a module complete awards 20 points once; quiz attempts award points equal to the score. A completed capstone awards 50 points if it newly completes Module 9. Quiz attempts are all recorded, including retakes.


## Demo login feature
- Open `login.html` to create an account or log in.
- Opening `modules.html` or any module page requires a logged-in demo account.
- This is a front-end school-project demo only: credentials are stored in browser localStorage and are not secure. Do not use a real password.


## About Us portal
- `about.html` includes the platform description, mission, vision, commitment statement, development team, and clickable email contact links.
- The About Us page is linked from the site navigation and uses responsive styles for mobile, tablet, and desktop layouts.
- Contact links open the visitor's default email application; they do not store messages in a database.


## Feedback collection and quiz response records

A new `feedback.html` page lets visitors evaluate LearnMate. Quiz submissions now retain each selected answer and its correctness in the learner's local progress data. When the shared endpoint is configured, feedback and quiz-result records are also submitted to a Google Sheet.

### Connect the shared response collector (required to gather responses from different visitors)
1. Create a Google Sheet owned by your group. Keep it accessible only to the project team/instructor.
2. In the Sheet, choose **Extensions → Apps Script**. Copy the code from `google-apps-script/Code.gs` into the script editor.
3. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the ID in your Sheet URL (the text between `/d/` and `/edit`). Save.
4. Choose **Deploy → New deployment → Web app**. Execute as **Me**. Set access to **Anyone** only if permitted by your school and account; otherwise use the approved access option. Deploy and authorize it.
5. Copy the Web App URL ending in `/exec`. Open `js/response-config.js` and paste it between the quotes for `window.LEARNMATE_RESPONSE_ENDPOINT`.
6. Redeploy/update the website after uploading the changed files. Test by submitting one feedback form and one quiz, then check the Sheet tabs **Website Feedback** and **Quiz Results**.

**Important:** until the endpoint is configured and tested, submissions are saved only in the current browser. Local browser storage does not collect other visitors' submissions. The browser-based login is still a demo, not secure production authentication. Quiz records may include chosen and correct answers, so tell participants how the data will be used and restrict Sheet access.


## Recent additions
- About Us includes the six project team portraits and contact emails.
- Feedback includes an overall five-star rating alongside the evaluation questions.
- Dashboard lets each learner choose a profile picture (PNG/JPG/WEBP up to 2 MB). The picture is stored only in that browser's local storage; it is not uploaded to a server.


## Professional portal additions
- Search and filter the nine learning modules by title, content, progress, and completion status.
- Dashboard study plan with a three-step checklist saved locally in the current browser.
- Image-led dashboard discovery banner, active navigation states, hover feedback, and responsive layouts.
- Learning photography uses remote Unsplash image URLs and therefore needs an internet connection to load.
