## Request for access Token

curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=a3c946a068ba4e2f9df79a3c2518c629&client_secret=8d302d5d3fd34e73b0e43017391869ce"
    

## Generate Stepzen Schema
stepzen import \
        curl "https://api.spotify.com/v1/recommendations?seed_genres=pop" \
        --header "Authorization: Bearer BQBWa8lYhBHuik_9DDXJ3kBKqp5khODaVgBVuaX1xW3hE47po33GbuHxkDE3QHY6i8p8F8TJ6RJ_uJ8PukAG5dBQBfgmyz-UyqzCBG5cxR4GFDjzitw" \
        --query-name "recommendations" \
        --query-type "Recommendation" \
        --name "recommendations" \
        --prefix "Recommend"

## Generate Token
stepzen import \
        curl -X POST "https://accounts.spotify.com/api/token" \
        --header "Content-Type: application/x-www-form-urlencoded" \
        --data "grant_type=client_credentials&client_id=a3c946a068ba4e2f9df79a3c2518c629&client_secret=8d302d5d3fd34e73b0e43017391869ce" \
        --query-name "getToken" \
        --query-type "TokenResponse" \
        --name "auth"