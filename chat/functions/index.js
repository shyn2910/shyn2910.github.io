const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.autoDeleteBannedUser = functions.database.ref("/banned/{uid}")
  .onCreate(async (snapshot, context) => {
    const uid = context.params.uid;
    const data = snapshot.val();
    try {
      await admin.auth().deleteUser(uid);
      console.log(`✅ Đã xóa user ${uid} (${data.email}) khỏi Firebase Authentication.`);
      await admin.database().ref(`/banned/${uid}`).update({ deleted: true });
    } catch (error) {
      console.error(`❌ Lỗi xóa user ${uid}:`, error);
    }
  });
