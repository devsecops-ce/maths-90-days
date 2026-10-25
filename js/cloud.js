// Firebase-backed accounts and result storage. Inactive while FIREBASE_CONFIG is null (local mode).
const SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
const loadScript = (src) => new Promise((ok, no) => {
  const s = document.createElement('script'); s.src = src; s.onload = ok;
  s.onerror = () => no(new Error('Could not load ' + src)); document.head.appendChild(s);
});
const ms = (t) => (t && t.toMillis ? t.toMillis() : Date.now());

const Cloud = {
  enabled: !!(typeof FIREBASE_CONFIG !== 'undefined' && FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey),
  busy: false,
  async init() {
    for (const f of ['firebase-app-compat.js', 'firebase-auth-compat.js', 'firebase-firestore-compat.js']) await loadScript(SDK + f);
    firebase.initializeApp(FIREBASE_CONFIG);
    this.auth = firebase.auth(); this.db = firebase.firestore();
    this.users = this.db.collection('users'); this.results = this.db.collection('results');
  },
  ts: () => firebase.firestore.FieldValue.serverTimestamp(),
  onAuth(cb) { this.auth.onAuthStateChanged(cb); },
  async signUp(info, password) {
    this.busy = true;
    try {
      const cred = await this.auth.createUserWithEmailAndPassword(info.email, password);
      await this.createProfile(cred.user.uid, info);
      return cred.user;
    } finally { this.busy = false; }
  },
  createProfile(uid, info) {
    return this.users.doc(uid).set({ ...info, role: 'student', unlockAll: false, progress: {}, days: [], createdAt: this.ts(), lastActive: this.ts() });
  },
  signIn(email, pw) { return this.auth.signInWithEmailAndPassword(email, pw); },
  signOut() { return this.auth.signOut(); },
  resetPassword(email) { return this.auth.sendPasswordResetEmail(email); },
  async profile(uid) { const d = await this.users.doc(uid).get(); return d.exists ? { uid, ...d.data() } : null; },
  updateUser(uid, data) { return this.users.doc(uid).update(data); },
  async saveResult(me, r, rec) {
    await this.results.add({ ...r, uid: me.uid, name: me.name, createdAt: this.ts() });
    await this.users.doc(me.uid).update({
      [`progress.${r.day}.${r.test}`]: rec,
      days: firebase.firestore.FieldValue.arrayUnion(r.date),
      lastActive: this.ts()
    });
  },
  async resultsOf(uid) {
    const s = await this.results.where('uid', '==', uid).get();
    return s.docs.map((d) => ({ id: d.id, ...d.data(), t: ms(d.data().createdAt) })).sort((a, b) => a.t - b.t);
  },
  async allUsers() {
    const s = await this.users.get();
    return s.docs.map((d) => ({ uid: d.id, ...d.data(), lastT: d.data().lastActive ? ms(d.data().lastActive) : 0 }));
  },
  async recent(n = 50) {
    const s = await this.results.orderBy('createdAt', 'desc').limit(n).get();
    return s.docs.map((d) => ({ id: d.id, ...d.data(), t: ms(d.data().createdAt) }));
  }
};
