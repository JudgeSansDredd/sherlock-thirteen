<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateSuspectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suspects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        DB::table('suspects')->insert([
            ['name' => "Sebastian Moran"],
            ['name' => "Irene Adler"],
            ['name' => "Inspector Lestrade"],
            ['name' => "Inspector Gregson"],
            ['name' => "Inspector Baynes"],
            ['name' => "Inspector Bradstreet"],
            ['name' => "Inspector Hopkins"],
            ['name' => "Sherlock Holmes"],
            ['name' => "John Watson"],
            ['name' => "Mycroft Holmes"],
            ['name' => "Mrs. Hudson"],
            ['name' => "Mary Morstan"],
            ['name' => "James Moriarty"],
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suspects');
    }
}
