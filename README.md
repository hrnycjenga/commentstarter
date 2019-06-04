# CommentStarter

> CommentStarter is a friendly, approachable user comment system designed for scalability and speed. The project is an evolution of a [legacy commentary system](https://github.com/hr-team-jacob/comments-service) that sought to replicate Kickstarter's user comment system. CommentStarter builds on the legacy project by introducing a number of significant improvements:
> - Transition from SQLite to a robust, ACID-compliant database: PostgreSQL
> - Multiple scalability enhancements to handle extreme spikes in requests per second
>   - Server / database clustering via [Docker / Kubernetes]
>   - Reverse proxy / load balancing served via [nginx]
>   - In-memory database caching served via [redis]
>   - Numerous [database query optimizations]

## Related Projects

  - [TBU]

## Table of Contents [TBU]

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage [TBU]

> Some usage instructions

## Requirements [TBU]

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development [TBU]

### Installing Dependencies [TBU]

From within the root directory:

```sh
npm install -g webpack
npm install
```

