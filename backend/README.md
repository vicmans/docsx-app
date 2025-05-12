# Backend of Docx app

The server of docx app, build with Express.js

## Intallation

```sh
npm i
```

## Configure

Set the environment variables, you can use the `.env.example`.

Set the `DB_TYPE` with the type of database you will use, `mongodb` and `json` are allowed

if you choose `mongodb`, you need to set the `DB_URL` with the MongoDB URI for your connection

If you choose `json`, set the `DB_URL` with the path to your file in the `data/` folder

the default values are:

```
DB_TYPE=json
DB_URL=data/files.json
```

Don't forget to configure the [frontend project](../frontend/README.md)

## Testing

```sh
npm test
```
