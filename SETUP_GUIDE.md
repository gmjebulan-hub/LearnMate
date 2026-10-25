# LearnMate: final setup checklist

This guide explains what your group must do on your own accounts before LearnMate is ready to share publicly. The ZIP does not automatically publish the site or connect a Google Sheet.

## A. Run and test LearnMate locally

1. Extract this ZIP to a normal folder.
2. Open the `learnmate` folder in Visual Studio Code.
3. If you have Live Server installed, right-click `index.html` and choose **Open with Live Server**. Otherwise, open `index.html` in a browser for a quick visual check.
4. Test these pages and features: Home, Log in/Register, Modules, each of the nine modules, Dashboard, Portfolio, Feedback, About Us, and Log out.
5. Test the layout at approximate viewport widths of 360 px (phone), 390 px (phone), 768 px (tablet), 1024 px (small laptop), and 1366 px (laptop). In Chrome, press F12, choose the device toolbar, and enter a width. Check that there is no sideways scrolling, cut-off text, overlapping content, or buttons too small to tap.
6. Also test with a real phone and tablet if possible. Responsive CSS is present, but device testing is still required.

## B. Connect feedback and quiz records to a shared Google Sheet

### 1. Create the Sheet

1. Sign in to the Google account your group is allowed to use for the project.
2. Create a new Google Sheet named `LearnMate Responses`.
3. Keep the Sheet private to your group and instructor. Do not publish the response spreadsheet to the web.
4. Copy the Sheet ID from its URL: the part after `/d/` and before `/edit`.

### 2. Add the Apps Script

1. In the Sheet, select **Extensions → Apps Script**.
2. Open `google-apps-script/Code.gs` from this project and copy its code into the Apps Script editor, replacing the starter code.
3. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the Sheet ID you copied.
4. Save the script.

### 3. Deploy the script as a Web App

1. Select **Deploy → New deployment**.
2. Choose the gear/type menu and select **Web app**.
3. Set **Execute as** to **Me**.
4. Set access to **Anyone** only if your school/account policy permits it. If your school account blocks this, ask your instructor which approved collection method to use. Do not change your whole Sheet to public access.
5. Deploy and complete the Google authorization prompts. Review the permissions before accepting.
6. Copy the Web app URL ending in `/exec`.

### 4. Connect LearnMate to the endpoint

1. Open `js/response-config.js`.
2. The response endpoint is already filled in with the Web app URL you provided in `js/response-config.js`. If you redeploy Apps Script and get a new URL, replace it there.
3. Save the file.
4. Submit one test feedback form and one test quiz while online.
5. Check that the `Website Feedback` and `Quiz Results` tabs appear in the Sheet and contain the test rows. The website uses a browser request mode that cannot read the server response, so **check the Sheet itself** to confirm receipt.
6. If a test row does not appear, verify the Sheet ID, saved Apps Script, deployment URL, deployment permissions, and whether a new script version must be deployed. Never share the Web app URL in public screenshots if your instructor advises against it.

The Apps Script is configured to email new-submission notifications to **gmjebulan28@paterostechnologicalcollege.edu.ph** after saving each row. During deployment, Google will ask the account owner to authorize spreadsheet access and email sending. The notification contains a summary and a link to the Sheet; the Sheet itself remains private. Email delivery depends on Google account policy and Apps Script quotas.

The shared Google Sheet can create four tabs as needed: `Website Feedback`, `Quiz Results`, `Module Progress`, and `Contact Messages`. The About Us page includes a contact form, and module completion events can be sent to the progress tab. Test all four types after deploying.

### Privacy notes

- Tell test participants what you collect and why. Avoid collecting names, passwords, phone numbers, or other personal information unless the instructor explicitly requires it and has approved a safe method.
- Quiz result records include selected and correct answers. Limit Sheet access to the project team and instructor.
- The current login is a front-end demo using browser local storage. It is not secure authentication, and accounts/progress do not sync between devices. Do not use real passwords.
- Local fallback responses are saved only in the browser where they were submitted. They are not automatically combined with responses from other users.

## C. Publish the website so people can open it with a link

Choose one hosting service approved by your instructor. Two common options for static HTML/CSS/JavaScript projects are Netlify and GitHub Pages.

### Option 1: Netlify manual deploy

1. Make sure the `learnmate` folder contains `index.html` plus the `css`, `js`, and other HTML files.
2. Sign in to Netlify and choose its manual deploy / drag-and-drop deployment option.
3. Upload the **contents of the `learnmate` folder** (or the folder, if the interface accepts it). Make sure `index.html` is at the published site root, not buried one extra folder deep.
4. Wait for the deploy to finish and open the URL Netlify gives you.
5. Test the public URL in a private/incognito browser window and on a phone. Test the feedback and quiz submissions again and check the Sheet.
6. Keep the deployment dashboard private to your team. The site itself is public to anyone with the link.

### Option 2: GitHub Pages

1. Create a GitHub repository using your own account and upload the contents of the `learnmate` folder to the repository root.
2. In the repository, open **Settings → Pages**.
3. Choose the branch and root folder for deployment, then save.
4. Wait for GitHub Pages to publish and use the URL shown in Settings → Pages.
5. Test every navigation link and the feedback/quiz endpoint on the public URL.

If the site is published under a subpath (for example, a GitHub Pages project URL), test all relative links carefully. Never upload private response data, passwords, or account credentials into the website repository.

## D. Accessibility and final quality checklist

- [ ] Every page has a meaningful page title and a viewport meta tag.
- [ ] Images that convey information have useful alt text; decorative images use empty alt text.
- [ ] All forms have visible labels and understandable validation messages.
- [ ] You can navigate links, menus, and forms with the keyboard; focus is clearly visible.
- [ ] Text and controls have sufficient contrast and do not rely on color alone.
- [ ] Browser zoom to 200% does not hide essential content or force page-wide horizontal scrolling.
- [ ] Phone/tablet/laptop tests show no overlap, clipping, or sideways scrolling.
- [ ] Login, registration, logout, modules, quiz submission, feedback, and progress have been tested.
- [ ] A test feedback submission and quiz submission are visible in the private Google Sheet.
- [ ] The public website link opens for someone outside the developer's computer/account.
- [ ] Your instructor approves the hosting and data collection approach.

## What is not automatic yet

- The Google Sheet endpoint must be deployed and pasted into `js/response-config.js` by your group. The script includes email notifications to the recipient address configured in `google-apps-script/Code.gs`. Until then, submissions are only saved in the visitor's current browser and will not reach the group.
- Feedback, quiz results, module completion events, and contact messages are collected only when the endpoint is configured. Protect access to the response Sheet.
- The site must be deployed through an account your group controls.
- Responsive and accessibility checks must be completed on actual devices; CSS alone does not prove the whole site is flawless.
- The demo login does not provide secure, cross-device accounts. That would require a backend/authentication service and additional setup.
