# yup-to-json-schema

> [Yup](https://github.com/jquense/yup) is a library to validate the JSON input

> [JSON-Schema](https://json-schema.org/) is a schema specification for JSON

> NOTE : Upgraded to support Yup Version 1
> Version Maping
> | Yup Major Version | This Library Major Version | Branch in this Library |
> | ----- | ------ | -----|
> | 1 | 2 | main |
> | 0 | 1 | yup_v0 |


This library converts `Yup` schema to `JSON-Schema`

## Installation

```
npm i @sodaru/yup-to-json-schema
```

## Usage

```JS
import yupToJsonSchema from "@sodaru/yup-to-json-schema"

// see Yup Specification for more options to create yupSchema
const yupSchema = object({
    name: string()
}).required();

const jsonSchema = yupToJsonSchema(yupSchema);
```

## Contribution

Fork the repo and send the Pull Requests to `develop` branch

`develop` is merged to the `main` branch periodically to make a release

## Support

This project is a part of the Open Source Initiative from Sodaru Technologies

Write an email to opensource@sodaru.com for queries on this project
