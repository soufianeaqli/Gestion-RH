<?php

namespace App\Http\Controllers;

use App\Models\Congees;
use Illuminate\Http\Request;

class CongeeController extends Controller
{
    // Fetch all leave requests
    public function index()
    {
        return response()->json(Congees::all());  // You can add filtering, sorting, etc.
    }

    // Store a new leave request
    public function store(Request $request)
    {
        $request->validate([
            'employee' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
        ]);

        $congee = Congees::create($request->all());  // Save new leave request to database

        return response()->json($congee, 201);  // Return the newly created leave request
    }

    // Update an existing leave request
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:Approuvé,Rejeté,En attente',
        ]);

        $congee = Congees::findOrFail($id);
        $congee->update($request->only('status'));  // Update status

        return response()->json($congee, 200);  // Return the updated leave request
    }

    public function destroy($id)
    {
        $congee = Congees::findOrFail($id);  // Si l'ID n'est pas trouvé, ça renverra une erreur 404
        $congee->delete();
    
        return response()->json(null, 204);  // 204 signifie que la suppression a réussi sans contenu
    }
}
