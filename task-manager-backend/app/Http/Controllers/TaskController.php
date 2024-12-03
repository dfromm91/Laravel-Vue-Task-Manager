<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Task;


class TaskController extends Controller
{
    public function index()
    {
        return Task::paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
    
        // Validate the input dynamically
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255', 
            'description' => 'sometimes|nullable|string',
            'is_completed' => 'sometimes|boolean',
        ]);
    
        $task->update($validated);
    
        return response()->json($task);
    }
    

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}
