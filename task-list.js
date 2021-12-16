'user strict';
// 要素を取得する
const taskMonth = document.getElementById('taskmonth');
const taskStatus = document.getElementById('taskstatus');
const taskTitle = document.getElementById('tasktitle');
const taskDetail = document.getElementById('taskdetail');
const submitButton = document.getElementById('submit');
const tasktListTbody = document.getElementById('tasklist');

// タスクの配列を準備する
let tasks = [];

// 登録ボタンのclickイベントを追加する
submitButton.onclick = function () {
  // taskオブジェクトにタスクの情報を登録する
  const task = {
    month: taskMonth.value,
    status: taskStatus.value,
    title: taskTitle.value,
    detail: taskDetail.value
  }
  // タスク登録関数を呼び出す
  addTask(task);
}

/**
 * タスクを登録する関数
 * @param {object} task タスクの情報
 */
function addTask(task) {

  // タスクを配列に追加する
  tasks.push(task);

  createTaskList();　// タスクリストを作成
  Save(); //結果を保存
}

/**
 * タスクを削除する関数
 * @param {object} obj 削除ボタンの要素
 */
function deleteTask() {

  // 押されたボタンのidを取得する
  const deleteId = this.id;
  // タスクを配列から削除する
  tasks.splice(deleteId, 1);

  createTaskList();　// タスクリストを作成
  Save(); //結果を保存
}

/**
 * タスクリストを作成する関数
 */
function createTaskList() {

  // テーブル本体を空にする
  tasktListTbody.innerText = "";

  // tasks配列を順番にループする
  for (let i = 0; i < tasks.length; i++) {

    task = tasks[i];

    // テーブル行を作成する
    const taskTr = document.createElement('tr');

    // 年月のテーブルデータを作成して、行に追加する
    const monthTd = document.createElement('td');
    monthTd.innerText = task.month;
    taskTr.appendChild(monthTd);

    // 進捗のテーブルデータを作成して、行に追加する
    const statusTd = document.createElement('td');
    statusTd.innerText = task.status;
    taskTr.appendChild(statusTd);

    // タイトルのテーブルデータを作成して、行に追加する
    const titleTd = document.createElement('td');
    titleTd.innerText = task.title;
    taskTr.appendChild(titleTd);

    // タスク概要のテーブルデータを作成して、行に追加する
    const detailTd = document.createElement('td');
    detailTd.innerText = task.detail;
    taskTr.appendChild(detailTd);

    // 削除ボタンのテーブルデータを作成して、行に追加する
    const deleteTd = document.createElement('td');
    const deleteButton = document.createElement('button');

    deleteButton.id = i;  // ボタンにid属性を追加
    deleteButton.onclick = deleteTask; // ボタンにclickイベントを追加
    deleteButton.innerText = "削除";
    deleteTd.appendChild(deleteButton);　// 削除ボタンをテーブルデータに追加
    taskTr.appendChild(deleteTd);       // テーブルデータを行に追加

    // テーブル行をテーブル本体に追加する
    tasktListTbody.appendChild(taskTr);
  }
}

/**
 * タスクリストを保存する関数
 */
function Save() {
  // tasks配列をJSON形式に変換する
  const tasksJSON = JSON.stringify(tasks);
  // localStorageにデータを保存する
  localStorage.setItem('tasklist', tasksJSON);
}

/**
 * タスクリストを読み込む関数
 */
function load() {
  // localStorageからデータを読み込む
  const tasksJSON = localStorage.getItem('tasklist');
  // データがある場合は、JSON形式を配列に変換して、タスクリスクを作成する
  if (tasksJSON) {
    tasks = JSON.parse(tasksJSON);
    createTaskList();
  }
  // タスクが空の場合、サンプルデータを追加する
  if (tasks.length === 0) {
    const task = {
      month: '2021-07',
      status: '済',
      title: 'A社経営統合プロジェクト',
      detail: '経営統合に伴う業務プロセス統合プロジェクト。\nプロジェクトリーダー（メンバー４人）として担当。\nＱＤＣ目標いずれも達成。ＣＳ評価で５をいただいた。'
    }
    addTask(task);
  }
}

load();
