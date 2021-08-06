import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterPokemonsTable1628258737258 implements MigrationInterface {
    name = 'AlterPokemonsTable1628258737258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" RENAME COLUMN "userPokemons" TO "inMyPokemons"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" RENAME COLUMN "inMyPokemons" TO "userPokemons"`);
    }

}
