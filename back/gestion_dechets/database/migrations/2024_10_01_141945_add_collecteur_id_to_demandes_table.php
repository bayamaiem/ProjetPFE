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
    Schema::table('demandes', function (Blueprint $table) {
        $table->unsignedBigInteger('collecteur_id')->nullable()->after('user_id'); // Ajoute le champ collecteur_id après le champ user_id
        $table->foreign('collecteur_id')->references('id')->on('users')->onDelete('set null'); // Ajoute une clé étrangère vers la table users
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('demandes', function (Blueprint $table) {
            $table->dropForeign(['collecteur_id']); // Supprime la contrainte de clé étrangère
            $table->dropColumn('collecteur_id');    // Supprime la colonne collecteur_id
        });
    }
    
};
