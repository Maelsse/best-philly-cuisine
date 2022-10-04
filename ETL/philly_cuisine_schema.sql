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

-- 1. name             object
-- 2. address          object
-- 3. city             object
-- 4. state            object
-- 5. postal_code      object

-- 6. latitude        float64
-- 7. longitude       float64
-- 8. rating/stars    float64 

-- 9. review_count      int64
-- 10. is_open           int64

-- 11. categories       object