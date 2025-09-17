#!/usr/bin/env node

const fs= require('fs')
const path= require('path')

const dataFile= path.join(__dirname,"tasks.json")

if(!fs.existsSync(dataFile)){
    fs.writeFileSync('tasks.json', [], 'utf-8')
}

// loads data from tasks.json

function loadTasks(){
    try {
        data= fs.readFileSync(dataFile)
        return JSON.parse(data)
    } catch (error) {
        console.log(`error: ${error.message}`)
        return []
    }
}

//for saving tasks

function saveTasks(tasks){
    try {
        fs.writeFileSync(dataFile, JSON.stringify(tasks,null,2), 'utf-8')
    } catch (error) {
        console.log( `error: ${error.message}`)
    }
}

function addTask(description){
    if(!description){
        console.log("No description provided")
        return
    }

    tasks= loadTasks()
    const newTask = {
    id: Date.now(),
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  tasks.push(newTask)
  saveTasks(tasks)
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

const [,, command, ...args]= process.argv

if(!command){
    console.log(`
Task CLI
---------
Usage:
  task-cli add "Task description"
  task-cli update <id> "New description"
  task-cli delete <id>
  task-cli mark-in-progress <id>
  task-cli mark-done <id>
  task-cli list [done|todo|in-progress]
  `);
    process.exit(0)
}

console.log(`⚙️ Command received: ${command} with args: ${args.join(" ")}`);

// Temporary demo command to test file handling
if (command === "test-file") {
  let tasks = loadTasks();
  console.log("📂 Current tasks:", tasks);

  tasks.push({ id: Date.now(), description: "Demo task" });
  saveTasks(tasks);

  console.log("✅ Task saved!");
}