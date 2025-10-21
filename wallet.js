// wallet.js
import { db, ref, get, set, update, push } from "./firebase.js";

export async function getUserData(uid) {
  const snap = await get(ref(db, "users/" + uid));
  return snap.exists() ? snap.val() : null;
}

export async function updateBalance(uid, change, note) {
  const userRef = ref(db, "users/" + uid);
  const snap = await get(userRef);
  if (!snap.exists()) return;
  const data = snap.val();
  const newBalance = (data.balance || 0) + change;
  await update(userRef, { balance: newBalance });

  const txRef = ref(db, "transactions");
  const tx = push(txRef);
  await set(tx, {
    user: uid,
    change,
    note,
    timestamp: Date.now()
  });
  return newBalance;
}

export async function redeemGiftcode(uid, code) {
  const refCode = ref(db, "giftcodes/" + code);
  const snap = await get(refCode);
  if (!snap.exists()) return { success: false, msg: "❌ Giftcode không tồn tại!" };
  const data = snap.val();
  if (data.used) return { success: false, msg: "⚠️ Giftcode đã được dùng!" };

  await update(refCode, { used: true });
  await updateBalance(uid, data.value, "Nhận giftcode " + code);
  return { success: true, msg: `🎁 Nhận ${data.value}₫ từ giftcode!` };
}
