// auth.js
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// 🔐 Hash mật khẩu thật của bạn (bạn tự tạo hash trước)
const correctHash = "cc7f70c3f3f8b515a63ceea89580af475e77792f9ffb93f0d54bb003da055fac"; 
// (hash này là ví dụ, bạn sẽ thay bằng hash của pass riêng mình)

async function verifyPassword(inputPass) {
  const hashed = await hashPassword(inputPass);
  return hashed === correctHash;
}
