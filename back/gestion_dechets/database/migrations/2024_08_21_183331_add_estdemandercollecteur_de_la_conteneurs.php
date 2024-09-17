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
            $table->integer('estdemandercollecteur')->nullable();
        });
    }

    /** estdemandercollecteur
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('conteneurs', function (Blueprint $table) {
            $table->dropColumn('estdemandercollecteur');          });
     
    }
};
