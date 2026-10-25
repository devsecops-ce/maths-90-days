# Turning on student accounts and the admin dashboard

The site works without any setup in **local mode**: no logins, and progress is saved only on each device.
To store every student's details and test results online, so a teacher can review them, connect a free **Firebase** project (Google). This takes about 10 minutes and costs nothing for a school-sized class. The free plan allows 50,000 reads and 20,000 writes per day.

## 1. Create the project
1. Go to <https://console.firebase.google.com> and sign in with a Google account.
2. Click **Create a project**, name it `maths-90-days`, and finish. You can turn Google Analytics off.

## 2. Turn on login
1. In the left menu, open **Build → Authentication → Get started**.
2. Under **Sign-in method**, choose **Email/Password**, switch on **Enable**, and click **Save**.
3. Under **Settings → Authorized domains**, click **Add domain** and add `devsecops-ce.github.io`.

## 3. Create the database
1. Open **Build → Firestore Database → Create database**.
2. Choose a location near your students (for India: `asia-south1 (Mumbai)`), then **Start in production mode**.

## 4. Add the security rules
1. In Firestore, open the **Rules** tab.
2. Replace everything with the contents of [`firestore.rules`](firestore.rules) and click **Publish**.

These rules mean:
- Students can see only their own data.
- Admins can see everyone's data.
- Students can't make themselves admin.
- Saved test results can't be edited.

## 5. Connect the website
1. Go to **Project settings** (⚙️) → **Your apps** → click the web icon `</>`.
2. Name the app and click **Register**. Firebase shows a `firebaseConfig = { … }` block.
3. Paste that block into [`js/config.js`](js/config.js) so it looks like this:

```js
const FIREBASE_CONFIG = {
  apiKey: "AIza…",
  authDomain: "maths-90-days.firebaseapp.com",
  projectId: "maths-90-days",
  storageBucket: "maths-90-days.appspot.com",
  messagingSenderId: "…",
  appId: "…"
};
```

4. Commit and push. GitHub Pages updates in about a minute. These values are safe to make public; the security rules are what protect the data.

## 6. Make yourself admin
1. Open the site and **Register** with your own email.
2. In the Firebase console, open **Firestore → `users`**. Find your document (the one with your email) and change `role` from `student` to `admin`.
3. Open `https://devsecops-ce.github.io/maths-90-days/admin.html` and log in.

From then on you can make other teachers admin with the **Make admin** button on their student page.

## What is stored
| Collection | Contents |
|---|---|
| `users/{uid}` | name, email, school, class & section, roll no., parent phone, city, role, best scores per day and test, dates practised |
| `results/{id}` | every test attempt: student, day, test 1 or 2, date, score, time taken, and each question with the student's answer and the correct answer |
