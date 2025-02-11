<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('congees', function (Blueprint $table) {
            $table->id();
            $table->string('employee'); // Employee name
            $table->string('type'); // Type of leave (Maladie, Vacances, etc.)
            $table->date('startDate'); // Start date of the leave
            $table->date('endDate'); // End date of the leave
            $table->enum('status', ['En attente', 'Approuvé', 'Rejeté'])->default('En attente'); // Leave status
            $table->integer('duree'); // Duration in days
            $table->timestamps(); // Created at and updated at timestamps
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('congees');
    }
};
