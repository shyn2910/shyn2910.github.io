// js/util.js (v2)
function $(q, root = document) { return root.querySelector(q); }
function toast(msg){ 
  const t=document.createElement('div');
  t.textContent=msg;
  Object.assign(t.style,{
    position:'fixed',bottom:'40px',right:'30px',
    background:'rgba(0,0,0,0.75)',padding:'10px 16px',
    borderRadius:'12px',color:'#fff',fontSize:'14px',
    transition:'opacity .4s',zIndex:9999
  });
  document.body.appendChild(t);
  setTimeout(()=>t.style.opacity='0',2500);
  setTimeout(()=>t.remove(),3000);
}
function formatMoney(n){return (n||0).toLocaleString('vi-VN');}
function uid(){return (_auth.currentUser? _auth.currentUser.uid:null);}
function randomCode(len=10){
  const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array(len).fill(0).map(()=>c[Math.floor(Math.random()*c.length)]).join('');
}
function requireAuth(cb){
  _auth.onAuthStateChanged(u=>{
    if(!u){ location.href='login.html'; return; }
    cb(u);
  });
}
// check quyền admin từ /users/{uid}/role
async function isAdmin(){
  const u=uid(); if(!u) return false;
  const snap=await _db.ref('users/'+u+'/role').get();
  return snap.exists() && snap.val()==='admin';
}

// log giao dịch
async function logTransaction(u, type, amount, game, note, roomId=null){
  const ref=_db.ref('transactions/'+u).push();
  await ref.set({type,amount,game,note,roomId,time:Date.now()});
}

// tăng tổng thắng ở leaderboard theo game
async function incLeaderboardOnWin(game, u, amount){
  if(!game || !u || !amount) return;
  const ref=_db.ref('leaderboard/'+game+'/'+u);
  await ref.transaction(x => (Number(x)||0) + Number(amount));
}
