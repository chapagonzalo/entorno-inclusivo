<?php

use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdministradorMiddleware;
use App\Http\Middleware\TechnicalMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return Inertia::render("Welcome", [
        "canLogin" => Route::has("login"),
        "canRegister" => Route::has("register"),
    ]);
});

//* entenderse como prueba previo al desarrollo de la lógica
//? prueba de roles

Route::middleware(AdministradorMiddleware::class)->group(function () {
    Route::get("/admin", function () {
        return Inertia::render("Admin/AdminDashboard");
    })->name("admin.dashboard");
});

Route::middleware(TechnicalMiddleware::class)->group(function () {
    Route::get("/assessments/index", [
        AssessmentController::class,
        "index",
    ])->name("assessments.index");
    Route::get("/assessments/create", [
        AssessmentController::class,
        "create",
    ])->name("assessments.create");
    Route::post("/assessments/initial", [
        AssessmentController::class,
        "storeInitial",
    ])->name("assessments.storeInitial");
    Route::get("/assessments/{id}/questions", [
        AssessmentController::class,
        "showQuestions",
    ])->name("assessments.questions");
    Route::post("/assessments/{id}/answers", [
        AssessmentController::class,
        "storeAnswers",
    ])->name("assessments.storeAnswers");
    Route::post("/assessments", [AssessmentController::class, "store"])->name(
        "assessments.store"
    );
    Route::get("/assessments/{id}", [
        AssessmentController::class,
        "show",
    ])->name("assessments.show");
    Route::post("/assessments/{id}/answers", [
        AssessmentController::class,
        "storeAnswers",
    ])->name("assessments.storeAnswers");
});

//* termina la sección de prueba

Route::get("/dashboard", function () {
    return Inertia::render("Dashboard");
})
    ->middleware(["auth", "verified"])
    ->name("dashboard");

Route::middleware("auth")->group(function () {
    Route::get("/profile", [ProfileController::class, "edit"])->name(
        "profile.edit"
    );
    Route::patch("/profile", [ProfileController::class, "update"])->name(
        "profile.update"
    );
    Route::delete("/profile", [ProfileController::class, "destroy"])->name(
        "profile.destroy"
    );
});

require __DIR__ . "/auth.php";
