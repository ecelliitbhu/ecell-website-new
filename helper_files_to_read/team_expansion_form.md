# Team Expansion Form — Complete Guide & Architecture

This document provides complete instructions for managing, configuring, and maintaining the E-Cell Team Expansion application forms, including the new evergreen dynamic form, navbar routing controls, Google Sheets integration, and legacy cleanup.

---

## 1. The Evergreen Form (`team_expansion_new`)

To eliminate the need to clone and rewrite form components every year, `pages/forms/team_expansion_new/index.js` was created as an evergreen, dynamic clone of `team_expansion_2026/index.js`. 

Instead of hardcoded credentials and years, it dynamically loads all configuration from environment variables. Future teams can simply update their `.env` (or `.env.local`) file with their new Firebase project and Google Sheets Web App URL without touching the code.

### Required Environment Variables
Add these variables to your root `.env` or `.env.local` file:

```bash
# Firebase Project Credentials for Team Expansion
NEXT_PUBLIC_TEAM_FORM_FIREBASE_API_KEY=
NEXT_PUBLIC_TEAM_FORM_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_TEAM_FORM_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_TEAM_FORM_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_TEAM_FORM_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_TEAM_FORM_FIREBASE_APP_ID=

# Firestore Collection Name (e.g., applications_2027)
NEXT_PUBLIC_TEAM_FORM_COLLECTION=applications_2027

# Registration Status Control
# Set to "true" to open registrations and show the form
# Set to "false" to close registrations and show the "Registrations Closed" banner
NEXT_PUBLIC_TEAM_FORM_IS_OPEN=false

# Display Year (Automatically updates headings and titles on the website)
NEXT_PUBLIC_TEAM_FORM_YEAR=2027

# Google Apps Script Web App URL (For syncing submissions to Google Sheets)
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=
```

---

## 2. Managing Form Visibility & Routing (Navbar Controls)

You can control where the **"Apply Now"** navbar button leads and whether it is visible on the live website using simple toggles in the navigation components.

### Rewiring the Route to the New Form
In **[NavItems.js](file:///d:/Ecell/ecell-website-new/components/navbar/NavItems.js)** (around line 380):
- Change `"/forms/team_expansion_2026"` to `"/forms/team_expansion_new"` to direct users to the dynamic evergreen form.

### Hiding the "Apply Now" Button When Recruitment is Closed
You can hide the button from the navigation bar using either of the following two methods:

- **Method A (Recommended via `NavItems.js`)**: Around line 375 inside the `ApplyNow` component, uncomment `return null;`. This instantly hides the button across the entire site.
- **Method B (via `NavLayout.js`)**: Around line 47, comment out the `<ApplyNow />` component (`{/* <ApplyNow /> */}`).

---

## 3. Controlling the Legacy 2026 Form (`team_expansion_2026`)

If you are still serving the legacy `team_expansion_2026/index.js` form, you can manually toggle its open/closed state directly in the code:

In **[pages/forms/team_expansion_2026/index.js](file:///d:/Ecell/ecell-website-new/pages/forms/team_expansion_2026/index.js)**:
- **To Disable / Close Registrations**: Change `false` to `true` on line 386 (to display the "Registrations Closed" banner), and change `true` to `false` on line 393 (to hide the form inputs).
- **To Enable / Open Registrations**: Revert line 386 to `false` and line 393 to `true`.

---

## 4. Google Sheets Integration (Apps Script)

The form submits data simultaneously to Firebase Firestore and a deployed Google Apps Script Web App that appends rows to a Google Sheet.

Below is the production-ready Google Apps Script used for logging applications. It implements a script lock (`LockService`) to safely handle concurrent, simultaneous submissions without data loss or row collisions.

```javascript
function doPost(e) {
  // Create a lock to handle simultaneous submissions
  var lock = LockService.getScriptLock();
  
  // Wait for up to 10 seconds for other processes to finish
  lock.waitLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var rowData = [
      data.fullName || "",
      data.email || "",
      data.phoneNumber || "",
      data.year || "",
      data.course || "",
      data.branch || "",
      data.preference1 || "", // Added column for Preference 1
      data.preference2 || "", // Added column for Preference 2
      data.preference3 || "", // Added column for Preference 3
      data.commitmentHours || "",
      data.whyJoin || "",
      data.previousExperience || "",
      data.nonAcademicEngagements || "",
      data.otherPoints || "",
      data.submittedAt || new Date().toISOString()
    ];
    
    // Append the row safely
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"error": error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    // Always release the lock when finished
    lock.releaseLock();
  }
}
```

---

## 5. Files Safe to Delete

Cross-referenced every file against the entire codebase. These files have **ZERO active imports, links, or references** from any other component or page:

| # | File | Lines | Verification |
|---|------|-------|--------------|
| 1 | `ESummitTeamExpansionForm.jsx` | 177 | Zero imports. Only mentioned in `Removal.md` (which itself marks it for deletion). Uses **Realtime DB** — completely different from all other team expansion forms. |
| 2 | `TeamExpansionForm2024.jsx` | 356 | Only imported by `team_expansion_2024/index.js`. If #3 is deleted, this has zero references. Uses `react-hook-form` + Bootstrap — completely different architecture from 2025/2026/new forms. |
| 3 | `team_expansion_2024/` (folder) | 83 | Zero links or references from any navbar, page, or component. Route `/forms/team_expansion_2024` is unreachable by users. |
| 4 | `team_expansion_2025/` (folder) | 333 | Zero links or references anywhere. Shows "Registrations Closed" permanently. Route `/forms/team_expansion_2025` is unreachable by users. |

> [!IMPORTANT]
> **Delete #3 and #2 together** — `TeamExpansionForm2024.jsx` is imported only by `team_expansion_2024/index.js`. Deleting #3 first, then #2 is the safe order. Deleting #2 alone without #3 will cause a build error.
