<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\Role;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstName', 50);
            $table->string('lastName', 50);
            $table->string('email', 100);
            $table->string('username', 50);
            $table->string('password', 100);
            $table->enum('role', [
                Role::Admin->value,
                Role::Collecteur->value,
                Role::Recycleur->value,
                Role::Usine->value,
            ]);
            $table->string('avatar')->default('default.jpg');
            $table->tinyInteger('active')->default(0);
            $table->integer('CreatedBy')->nullable();
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
        Schema::dropIfExists('users');
    }
};
