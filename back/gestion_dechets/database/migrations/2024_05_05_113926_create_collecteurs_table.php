<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collecteurs', function (Blueprint $table) {
            $table->id('id_collecteur');
            $table->string('nom');
            $table->string('adresse');
            $table->string('email')->unique();
            $table->string('tele');
            $table->string('certificat');
            $table->string('login');
            $table->string('mote_de_passe');
            $table->string('code_recycleur');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collecteurs');
    }
};
