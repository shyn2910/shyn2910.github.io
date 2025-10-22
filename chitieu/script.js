let currentUser = null;

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
const commonButtons = document.getElementById("commonButtons");
const commonInput = document.getElementById("commonInput");
const addCommonBtn = document.getElementById("addCommonBtn");

mainContent.style.display = "none";

// Nút đăng nhập bằng nhập tên
enterBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (!username) return alert("⚠️ Vui lòng nhập tên!");
  selectUser(username);
});

// Hàm chọn người dùng nhanh
function selectUser(name) {
  currentUser = name;
  loginScreen.style.display = "none";
  mainContent.style.display = "block";
  loadData(monthSelect.value);
}

// Lấy thời gian hiện tại
function getCurrentTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

// Firebase ref theo user
function userRef(path) {
  if (!currentUser) return null;
  return firebase.database().ref(`users/${currentUser}/${path}`);
}

// Thêm chi tiêu
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

// Xóa chi tiêu
function deleteItem(id) {
  userRef("transactions/" + id).remove();
}

// Tải dữ liệu
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

  function loadCommon() {
  console.log("loadCommon() chạy — chưa có nội dung cụ thể.");
  // Nếu bạn từng dùng hàm này để tải chi tiêu thường dùng hoặc dữ liệu mẫu,
  // có thể bổ sung logic tại đây, ví dụ:
  // renderCommonList();
}
  loadCommon();
}

// Thay đổi tháng
monthSelect.addEventListener("change", () => loadData(monthSelect.value));

// Thêm chi tiêu thường dùng
addCommonBtn.addEven

