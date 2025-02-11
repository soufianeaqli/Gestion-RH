<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidat;
use Illuminate\Support\Facades\Storage;

class CandidatController extends Controller
{
    // 🔹 Afficher tous les candidats
    public function index()
    {
        return response()->json(Candidat::all(), 200);
    }

    // 🔹 Ajouter un candidat
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'poste' => 'required|string|max:255',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        // Stocker le fichier
        $cvPath = $request->file('cv')->store('cvs');

        $candidat = Candidat::create([
            'nom' => $request->nom,
            'poste' => $request->poste,
            'cv' => $cvPath,
        ]);

        return response()->json($candidat, 201);
    }

    // 🔹 Afficher un candidat par ID
    public function show($id)
    {
        return response()->json(Candidat::findOrFail($id), 200);
    }

    // 🔹 Mettre à jour un candidat
    public function update(Request $request, $id)
    {
        $candidat = Candidat::findOrFail($id);

        $request->validate([
            'nom' => 'string|max:255',
            'poste' => 'string|max:255',
            'cv' => 'file|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($request->hasFile('cv')) {
            // Supprimer l'ancien CV
            Storage::delete($candidat->cv);
            $cvPath = $request->file('cv')->store('cvs');
        } else {
            $cvPath = $candidat->cv;
        }

        $candidat->update([
            'nom' => $request->nom ?? $candidat->nom,
            'poste' => $request->poste ?? $candidat->poste,
            'cv' => $cvPath,
        ]);

        return response()->json($candidat, 200);
    }

    // 🔹 Supprimer un candidat
    public function destroy($id)
    {
        $candidat = Candidat::findOrFail($id);
        Storage::delete($candidat->cv);
        $candidat->delete();

        return response()->json(null, 204);
    }
}
