# tiktoken-bundle #

offline-capable ESM module for cl100k_base tokenization in the browser ([Live Demo](https://rozek.de/applets/Tokenization.html))

This JavaScript/TypeScript library provides tokenization functionality using the cl100k_base encoding (the same encoding used by GPT-3.5 and GPT-4 models) and is specifically designed to work in browser environments without network requests.





## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/tiktoken-bundle/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## Test Instructions ##

`tiktoken-bundle` comes with a few tests. Just use

```bash
npm run test
```

to run them and get a report on the console.

## License ##

[MIT License](LICENSE.md)
