'user strict'
// 要素の取得
const taskTable = document.getElementById('tasktable');
const taskMonth = document.getElementById('taskmonth');
const taskStatus = document.getElementById('taskstatus');
const taskTitle = document.getElementById('tasktitle');
const taskDetail = document.getElementById('taskdetail');
const submitButton = document.getElementById('submit');
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');

// サンプル追加
addTask('2021-07', '済', 'A社経営統合プロジェクト', '経営統合に伴う業務プロセス統合プロジェクト。\nプロジェクトリーダー（メンバー４人）として担当。\nＱＤＣ目標いずれも達成。ＣＳ評価で５をいただいた。');

// 登録ボタンイベント
submitButton.onclick = () => {
  addTask(taskMonth.value, taskStatus.value, taskTitle.value, taskDetail.value)
}

// 登録処理
function addTask(month, status, title, detail) {

  //１行追加
  const row = taskTable.insertRow(-1);

  //５列追加
  row.insertCell(-1).innerText = month;
  row.insertCell(-1).innerText = status;
  row.insertCell(-1).innerText = title;
  row.insertCell(-1).innerText = detail;

  //削除ボタン①
  row.insertCell(-1).innerHTML = '<button onclick="deleteTask(this)">削除</button>';

  //削除ボタン②
  // const deleteButton = document.createElement('button');
  // deleteButton.onclick = deleteTask2;
  // deleteButton.innerText = "削除";
  // row.insertCell(-1).appendChild(deleteButton);
}

//削除処理
function deleteTask(obj) {
  const tr = obj.parentNode.parentNode;           // <button>.<td>.<tr>
  tr.parentNode.deleteRow(tr.sectionRowIndex);    // <tr>.<table>.deleteRow()
}

// function deleteTask2() {
//   const tr = this.parentNode.parentNode;
//   tr.parentNode.deleteRow(tr.sectionRowIndex);
// }

//保存ボタンイベント
saveButton.onclick = () => {
  if (confirm('データを保存しますか')) {
    localStorage.setItem('tasktable', taskTable.innerHTML);
    alert('保存が完了しました')
  }
}

//読込ボタンイベント
loadButton.onclick = () => {
  if (confirm('データを読み込みますか')) {
    taskTable.innerHTML = localStorage.getItem('tasktable');
  }
}

