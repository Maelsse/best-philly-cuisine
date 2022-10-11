--Drop all tables at once wihtout needing to re-initialize schema and restore grants
DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

-- Create the table to hold the list of businesses in food industries
CREATE TABLE "philly_cuisine" 
                    ( "id"              INT NOT NULL 
					, "name"        VARCHAR NOT NULL
                    , "address"     VARCHAR NOT NULL
                    , "city"        VARCHAR NOT NULL
					, "state"       VARCHAR NOT NULL
                    , "zip_code"    VARCHAR NOT NULL 
                    , "latitude"      float NOT NULL
                    , "longitude"     float NOT NULL
				    , "rating"        float NOT NULL
					, "review_count"    INT NOT NULL
					, "is_open"         INT NOT NULL
                    , "categories"  VARCHAR NOT NULL
					, CONSTRAINT "pk_id" PRIMARY KEY ("id")
);


-- Create the table to hold the list of categories and sub categories
CREATE TABLE "categories" 
                    ( "category"      VARCHAR NOT NULL
                    , "sub_category"    VARCHAR NOT NULL
					
);

