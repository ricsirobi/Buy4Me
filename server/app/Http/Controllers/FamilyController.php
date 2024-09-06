<?php
namespace App\Http\Controllers;

use App\Models\Family;
use Illuminate\Http\Request;

class FamilyController extends Controller
{
    // Család létrehozása
    public function create(Request $request)
    {
        $family = Family::create([
            'name' => $request->name,
        ]);

        // A felhasználó hozzáadása családhoz alapértelmezett vásárlóként
        $family->users()->attach(auth()->id(), ['is_shopper' => true]);

        return response()->json([
            'message' => 'Family created successfully',
            'family' => $family
        ], 201);
    }

    // Családhoz csatlakozás
    public function join(Request $request, $familyId)
    {
        $family = Family::find($familyId);

        if (!$family) {
            return response()->json(['message' => 'Family not found'], 404);
        }

        $family->users()->attach(auth()->id(), ['is_shopper' => false]);

        return response()->json(['message' => 'Joined family successfully']);
    }

    // Családtagok listázása
    public function getUserFamilies()
    {
        $user = auth()->user();
        $families = $user->families;

        return response()->json($families);
    }

    public function members (Request $request, $familyId) {
        $family = Family::find($familyId);

        if (!$family) {
            return response()->json(['message' => 'Family not found'], 404);
        }

        $members = $family->users;

        return response()->json($members);
    }
}
