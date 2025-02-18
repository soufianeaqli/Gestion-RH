<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    // 🔹 Afficher tous les employés
    public function index()
    {
        return response()->json(Employee::all(), 200);
    }

    // 🔹 Ajouter un employé
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'salaire' => 'required|numeric|min:0',
            'prime' => 'numeric|min:0',
        ]);

        $totalSalaire = $request->salaire + ($request->prime ?? 0);

        $employee = Employee::create([
            'name' => $request->name,
            'position' => $request->position,
            'department' => $request->department,
            'salaire' => $request->salaire,
            'prime' => $request->prime ?? 0,
            'totalSalaire' => $totalSalaire,
        ]);

        return response()->json($employee, 201);
    }

    // 🔹 Afficher un employé par ID
    public function show($id)
    {
        return response()->json(Employee::findOrFail($id), 200);
    }

    // 🔹 Mettre à jour un employé
    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'position' => 'sometimes|string|max:255',
            'department' => 'sometimes|string|max:255',
            'salaire' => 'sometimes|numeric|min:0',
            'prime' => 'sometimes|numeric|min:0',
        ]);

        $salaire = $request->salaire ?? $employee->salaire;
        $prime = $request->prime ?? $employee->prime;
        $totalSalaire = $salaire + $prime;

        $employee->update([
            'name' => $request->name ?? $employee->name,
            'position' => $request->position ?? $employee->position,
            'department' => $request->department ?? $employee->department,
            'salaire' => $salaire,
            'prime' => $prime,
            'totalSalaire' => $totalSalaire,
        ]);

        return response()->json($employee, 200);
    }

    // 🔹 Supprimer un employé
    public function destroy($id)
    {
        Employee::destroy($id);
        return response()->json(null, 204);
    }
}
