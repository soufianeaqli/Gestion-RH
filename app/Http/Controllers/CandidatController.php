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
        // Validation avec règles pour le fichier
        $validatedData = $request->validate([
            'nom'   => 'required|string|max:255',
            'poste' => 'required|string|max:255',
            'cv'    => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($request->hasFile('cv')) {
            $file = $request->file('cv');
            // Crée un nom unique pour le fichier
            $filename = time() . '_' . $file->getClientOriginalName();
            // Déplace le fichier dans le dossier public/cv
            $file->move(public_path('cv'), $filename);
            // Remplace la valeur 'cv' par le nom du fichier enregistré
            $validatedData['cv'] = $filename;
        }

        // Crée le candidat en base de données
        $candidat = Candidat::create($validatedData);

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

        $validatedData = $request->validate([
            'nom'   => 'sometimes|string|max:255',
            'poste' => 'sometimes|string|max:255',
            'cv'    => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($request->hasFile('cv')) {
            // Optionnel : supprimer l'ancien CV (adapté selon votre logique)
            // Si votre ancien CV se trouve dans public/cv, vous pouvez le supprimer :
            if ($candidat->cv) {
                $oldFilePath = public_path('cv') . '/' . $candidat->cv;
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }

            $file = $request->file('cv');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('cv'), $filename);
            $validatedData['cv'] = $filename;
        } else {
            // Si aucun nouveau fichier n'est envoyé, on ne modifie pas la valeur de cv
            unset($validatedData['cv']);
        }

        $candidat->update($validatedData);
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
