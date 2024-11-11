from flask import Flask, jsonify, request, render_template, redirect, url_for
import json
import os

app = Flask(__name__)

def load_tasks():
    if os.path.exists('tasks.json'):
        with open('tasks.json', 'r') as f:
            return json.load(f)
    return []

def save_tasks(tasks):
    with open('tasks.json', 'w') as f:
        json.dump(tasks, f)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = load_tasks()
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_tasks():
    tasks = load_tasks()
    task_data = request.get_json()
    new_task = {
        "id": len(tasks) + 1,
        "task": task_data['task'],
        "time": task_data['time']
    }
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify(new_task), 201

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    tasks = load_tasks()
    tasks = [task for task in tasks if task['id'] != task_id]
    save_tasks(tasks)
    return jsonify({"message": "Task deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
