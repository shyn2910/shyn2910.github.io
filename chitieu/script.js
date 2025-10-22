// ========================
// 🔥 SỔ CHI TIÊU FIREBASE v6.1
// Created by ShynMMO ©2025
// ========================

let currentUser = null;

// ========================
// 🧩 Liên kết phần tử HTML
// ========================
const loginScreen = document.getElementById("loginScreen");
const usernameInput = document.getElementById("usernameInput");
const enterBtn = document.getElementById("enterBtn");
const mainContent = document.getElementById("mainContent");

const nameInput = document.getElementById("itemName");
const amountInput = document.getElementById("itemAmount");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("expenseList");
const incomeSpan = document.getElementById("income");
const expenseSpan = document.getElementById("expense");
const balanceSpan = document.getElementById("balance");
const monthSelect = document.getElementById("monthSelect");
const commonInput = document.getElementById("commonInput");
const addCommonBtn = document.getElementById("addCommonBtn");
const commonButtons = document.getElementById("commonButtons");

mainContent.style.display = "none";

// ========================
// 👤 Chọn người dùng có sẵn
// ========================
function selectUser(name) {
  currentUser = name;
  loginScreen.style.display = "none";
  mainContent.style.display = "block";
  loadData(monthSelect.value);
  renderCommonList();
}

// ========================
// 🔑 Đăng nhập thủ công
// ========================
enterBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (!username) return alert("⚠️ Vui lòng nhập tên!");
  selectUser(username);
});

// ========================
// ⏰ Lấy thời gian hiện tại
// ========================
function getCurrentTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

// ========================
// 💾 Firebase Reference
// ========================
function userRef(path) {
  if (!currentUser) return null;
  return firebase.database().ref(`users/${currentUser}/${path}`);
}

// ========================
// ➕ Thêm chi tiêu
// ========================
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  if (!name || isNaN(amount)) return alert("⚠️ Nhập đúng tên và số tiền!");

  const type = amount < 0 ? "expense" : "income";
  const month = monthSelect.value;
  const time = getCurrentTime();
  userRef("transactions").push({ name, amount, type, month, time });
  nameInput.value = "";
  amountInput.value = "";
});

// ========================
// ❌ Xóa chi tiêu
// ========================
function deleteItem(id) {
  userRef("transactions/" + id).remove();
}

// ========================
// 📊 Tải dữ liệu chi tiêu
// ========================
function loadData(selectedMonth) {
  const dbRef = userRef("transactions");
  if (!dbRef) return;

  dbRef.off();
  dbRef.on("value", (snapshot) => {
    list.innerHTML = "";
    let income = 0, expense = 0;

    snapshot.forEach((child) => {
      const data = child.val();
      if (data.month !== selectedMonth) return;

      const li = document.createElement("li");
      li.classList.add(data.type);
      li.innerHTML = `
        <div>
          <strong>${data.name}</strong> — ${data.amount.toLocaleString()} ₫
          <span class="time">${data.time || ""}</span>
        </div>
        <button class="deleteBtn" onclick="deleteItem('${child.key}')">✖</button>
      `;
      list.appendChild(li);

      if (data.amount < 0) expense += Math.abs(data.amount);
      else income += data.amount;
    });

    incomeSpan.textContent = income.toLocaleString();
    expenseSpan.textContent = expense.toLocaleString();
    balanceSpan.textContent = (income - expense).toLocaleString();
  });
}

// ========================
// 💡 Chi tiêu thường dùng
// ========================
function renderCommonList() {
  if (!currentUser) return;
  const refPath = `users/${currentUser}/common`;
  const dbRef = firebase.database().ref(refPath);

  dbRef.off();
  dbRef.on("value", (snapshot) => {
    commonButtons.innerHTML = "";
    snapshot.forEach((child) => {
      const data = child.val();

      const wrapper = document.createElement("div");
      wrapper.classList.add("commonWrapper");

      const btn = document.createElement("button");
      btn.textContent = `${data.name} ${data.amount}`;
      btn.classList.add("commonItem");
      btn.onclick = () => {
        userRef("transactions").push({
          name: data.name,
          amount: data.amount,
          type: data.amount < 0 ? "expense" : "income",
          month: monthSelect.value,
          time: getCurrentTime()
        });
      };

      const del = document.createElement("span");
      del.textContent = "✖";
      del.classList.add("deleteCommon");
      del.onclick = () => {
        firebase.database().ref(`${refPath}/${child.key}`).remove();
      };

      wrapper.appendChild(btn);
      wrapper.appendChild(del);
      commonButtons.appendChild(wrapper);
    });
  });
}

// ========================
// ➕ Thêm chi tiêu thường dùng
// ========================
addCommonBtn.addEventListener("click", () => {
  const value = commonInput.value.trim();
  if (!value) return;

  const parts = value.split(" ");
  const name = parts.slice(0, -1).join(" ") || "Không rõ";
  const amount = parseInt(parts[parts.length - 1]) || 0;

  const refPath = `users/${currentUser}/common`;
  firebase.database().ref(refPath).push({ name, amount });
  commonInput.value = "";
  renderCommonList();
});

// ========================
// 🔄 Đổi tháng
// ========================
monthSelect.addEventListener("change", () => loadData(monthSelect.value));

// ========================
// 🧱 LoadCommon tương thích cũ
// ========================
function loadCommon() {
  console.log("loadCommon() gọi — đã thay bằng renderCommonList().");
  renderCommonList();
}
