DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

CREATE TABLE "Restaurants" (
    "RestaurantID" VARCHAR   NOT NULL,
    "Name" VARCHAR   NOT NULL,
    "Address" VARCHAR   NOT NULL,
    "Phone" VARCHAR   NOT NULL,
    "Rating" FLOAT   NOT NULL,
    "Category" VARCHAR   NOT NULL,
    "Price" VARCHAR   NOT NULL,
    "url" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Restaurants" PRIMARY KEY (
        "RestaurantID"
     )
);

CREATE TABLE "Reviews" (
    "ReviewID" VARCHAR   NOT NULL,
    "RestaurantID" VARCHAR   NOT NULL,
    "Text" VARCHAR   NOT NULL,
    "Rating" INT   NOT NULL,
    "Username" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Reviews" PRIMARY KEY (
        "ReviewID"
     )
);

CREATE TABLE "Photos" (
    "RestaurantID" VARCHAR   NOT NULL,
    "Name" VARCHAR NOT NULL,
    "Display_photo" VARCHAR NOT NULL,
    "Photos" VARCHAR   NOT NULL
);

ALTER TABLE "Reviews" ADD CONSTRAINT "fk_Reviews_RestaurantID" FOREIGN KEY("RestaurantID")
REFERENCES "Restaurants" ("RestaurantID");

ALTER TABLE "Photos" ADD CONSTRAINT "fk_Photos_RestaurantID" FOREIGN KEY("RestaurantID")
REFERENCES "Restaurants" ("RestaurantID");

