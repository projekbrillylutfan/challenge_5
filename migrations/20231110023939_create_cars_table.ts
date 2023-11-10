import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.bigIncrements("id").primary();
        table.string("car_name", 30).notNullable();
        table.string("car_categories", 30).notNullable();
        table.string("car_size", 30).notNullable();
        table.text("car_img");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

