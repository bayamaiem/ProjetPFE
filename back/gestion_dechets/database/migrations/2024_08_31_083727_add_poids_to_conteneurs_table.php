<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('conteneurs', function (Blueprint $table) {
            $table->float('poids')->nullable(); // Adding the 'poids' field as a nullable float
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('conteneurs', function (Blueprint $table) {
            $table->dropColumn('poids'); // Dropping the 'poids' field if the migration is rolled back
        });
    }
};
