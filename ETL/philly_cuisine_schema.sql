-- Create the table to hold the list of businesses in food industries
drop table if exists philly_cuisine cascade;

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
drop table if exists categories cascade;

CREATE TABLE "categories" 
                    ( "category"      VARCHAR NOT NULL
                    , "sub_category"    VARCHAR NOT NULL
					
);

