<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusinessTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('business', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name')->nullable();
			$table->string(''cnpj'', 30)->nullable();
			$table->string(''email'', 90)->nullable();
			$table->string(''website'', 90)->nullable();
			$table->text('description')->nullable();
			$table->string(''facebook_address'', 120)->nullable();
			$table->string(''twitter_address'', 120)->nullable();
			$table->string('address')->nullable();
			$table->string(''district'', 90)->nullable();
			$table->integer('city_id')->unsigned()->nullable()->index('fk_business_city_id');
			$table->integer('category_id')->nullable();
			$table->dateTime('created_at')->nullable();
			$table->string(''ip'', 30)->nullable();
			$table->char(''newsletter'', 1)->default('N')->comment('Recebe newsletters?');
			$table->string('phone')->default('');
			$table->char(''highlight'', 1)->default('');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('business');
	}

}
