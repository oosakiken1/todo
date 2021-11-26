'user strict'
// 要素の取得
const taskTable = document.getElementById('tasktable');
const taskMonth = document.getElementById('taskmonth');
const taskStatus = document.getElementById('taskstatus');
const taskTitle = document.getElementById('tasktitle');
const taskDetail = document.getElementById('taskdetail');
const submitButton = document.getElementById('submit');

// 登録ボタンイベント
submitButton.onclick = () => {
  const task = {
    month: taskMonth.value,
    status: taskStatus.value,
    title: taskTitle.value,
    detail: taskDetail.value
  }
  addTask(task);
}

// 登録処理
function addTask(task) {

  //１行追加
  const row = taskTable.insertRow(-1);

  //５列追加
  row.insertCell(-1).innerText = task.month;
  row.insertCell(-1).innerText = task.status;
  row.insertCell(-1).innerText = task.title;
  row.insertCell(-1).innerText = task.detail;

  //削除ボタン①
  row.insertCell(-1).innerHTML = '<button onclick="deleteTask(this)">削除</button>';

  //削除ボタン②
  // const deleteButton = document.createElement('button');
  // deleteButton.onclick = deleteTask2;
  // deleteButton.innerText = "削除";
  // row.insertCell(-1).appendChild(deleteButton);

  Save(); //結果を保存
}

//削除処理
function deleteTask(obj) {
  const tr = obj.parentNode.parentNode;           // <button>.<td>.<tr>
  tr.parentNode.deleteRow(tr.sectionRowIndex);    // <tr>.<table>.deleteRow()

  Save(); //結果を保存
}

// function deleteTask2() {
//   const tr = this.parentNode.parentNode;
//   tr.parentNode.deleteRow(tr.sectionRowIndex);
// }

//保存処理
function Save() {
  localStorage.setItem('tasktable', taskTable.innerHTML);
}

//読込処理
function load() {
  const taskTableHTML = localStorage.getItem('tasktable');
  if (!taskTableHTML) {
    // localStorageが空のときは、サンプル追加
    const task = {
      month: '2021-07',
      status: '済',
      title: 'A社経営統合プロジェクト',
      detail: '経営統合に伴う業務プロセス統合プロジェクト。\nプロジェクトリーダー（メンバー４人）として担当。\nＱＤＣ目標いずれも達成。ＣＳ評価で５をいただいた。'
    }
    addTask(task);
  } else {
    taskTable.innerHTML = taskTableHTML;
  }
}

load();
