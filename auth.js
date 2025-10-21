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
const correctHash = "0d45eaa6dce7f1f57eaf0e00a26bbda0c37267e67f42b3b97a134f9ef4cb4d4b"; 
// (hash này là ví dụ, bạn sẽ thay bằng hash của pass riêng mình)

async function verifyPassword(inputPass) {
  const hashed = await hashPassword(inputPass);
  return hashed === correctHash;
}
