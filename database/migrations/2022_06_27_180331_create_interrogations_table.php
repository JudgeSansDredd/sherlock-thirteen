<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterrogationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interrogations', function (Blueprint $table) {
            $table->id();
            $table->integer('game_id');
            $table->integer('player_id');
            $table->integer('hidden_card');
            $table->char('symbol');
            $table->integer('number_claimed');
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
        Schema::dropIfExists('interrogations');
    }
}
