const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

class FirebaseAdmin {
  static instance;

  constructor(firebaseAdmin) {
    this.admin = firebaseAdmin;
  }

  static initialize() {
    if (this.instance) throw new Error('Instance already initialized.');

    const serviceAccountPath = path.resolve(__dirname, 'serviceAccountkey.json');
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    const adminConfig = {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://your-database-url.firebaseio.com"  // Replace with your database URL
    };

    admin.initializeApp(adminConfig);
    this.instance = new FirebaseAdmin(admin);
  }

  static getInstance() {
    if (!this.instance) throw new Error('Instance needs to be initialized first.');

    return this.instance;
  }

  // sendMulticastMessaging(tokens, title, body, data) {
  //   return this.admin.messaging().sendMulticast({
  //     data,
  //     notification: { title, body },
  //     tokens,
  //   });
  // }

  // sendMulticastMessaging(tokens, title, body, data) {
  //   const promises = tokens.map(token =>
  //     this.admin.messaging().send({
  //       data,
  //       notification: { title, body },
  //       token,
  //     })
  //   );
  
  //   return Promise.all(promises);
  // }
  sendMulticastMessaging(tokens, title, body) {
    const promises = tokens.map(token =>
      this.admin.messaging().send({
        notification: { title, body },
        token,
      })
    );
    return Promise.all(promises);

  }

  sendSingleMessaging(token, title, message) {
    // console.log(token);
    const promises = this.admin.messaging().send({
        notification: { title: title, body: message },
        token,
      })
    return promises;
  }
}

module.exports = FirebaseAdmin;

