# opensearch-ts-boilerplate

## description

Boilerplate project for starting opensearch microservice with integration tests

## .env file structure

```
PORT=3000
OPENSEARCH_URL=https://localhost:9200
OPENSEARCH_USERNAME=admin
OPENSEARCH_PASSWORD=admin
```

## integration tests

```
docker-compose up --abort-on-container-exit --exit-code-from service-integration-tests
```
