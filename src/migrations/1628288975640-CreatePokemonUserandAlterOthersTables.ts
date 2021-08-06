import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePokemonUserandAlterOthersTables1628288975640 implements MigrationInterface {
    name = 'CreatePokemonUserandAlterOthersTables1628288975640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP CONSTRAINT "FK_c0c6b08c6d87d323256cb5759b0"`);
        await queryRunner.query(`CREATE TABLE "pokemonUser" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, "pokemonsId" integer, CONSTRAINT "PK_8f511af4ba90eed0a97da9966bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "pokemonUser" ADD CONSTRAINT "FK_064195f0d7be5e2584ca590c8b8" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemonUser" ADD CONSTRAINT "FK_4789c9b1d4a6f840d3f825d4ac8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemonUser" DROP CONSTRAINT "FK_4789c9b1d4a6f840d3f825d4ac8"`);
        await queryRunner.query(`ALTER TABLE "pokemonUser" DROP CONSTRAINT "FK_064195f0d7be5e2584ca590c8b8"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "userId" integer`);
        await queryRunner.query(`DROP TABLE "pokemonUser"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD CONSTRAINT "FK_c0c6b08c6d87d323256cb5759b0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
