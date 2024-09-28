<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdministradorMiddleware;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\TechnicalMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(AdministradorMiddleware::class)->group(function () {
    //Route::get('/admin/dashboard', [AdminController::class, 'index']);
    Route::get('/admin', function(){
        return Inertia::render('Admin/AdminDashboard');
    });
});

Route::middleware(TechnicalMiddleware::class)->group(function () {
    //Route::get('/user/dashboard', [UserController::class, 'index']);
    Route::get('/user', function(){
        return Inertia::render('Technical/TechnicalDashboard');
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
