
## Pre-reqs
* [Node > v5.0.0](https://nodejs.org/en/)

## Getting started  
To get this website runnning on your computer, make sure you have node installed on your machine. You can see if it is installed and in your environment path by typing in `npm -v`. This will tell you the version you're using. Additionally, `node -v` will give you node's version. As stated in the pre-reqs, the node version should be above v5.0.0. This should work on all node supporting platforms. 

**Linux/Mac/Windows**
```bash
$ git clone https://github.com/RainRealityLLC/BuildIt.git
$ cd BuildIt
$ npm install
$ npm start
```

## Connecting to server
Once `npm install` is typed, packages that this website depends on will be installed. `npm start` will call a package called nodemon, which will start a server at: `127.0.0.1:3000`

Enter this into  your web browser to see the running website.

## Resources

* [JADE-Bootstrap](http://rajasegar.github.io/JADE-Bootstrap/)  
* [NodeJS](http://nodejs.org/) 
* [Express](http://expressjs.com) 

    **Converters**

    Fbx files aren't well documented in three.js -- however, many of our models are in this format. Here are some tools to help convert them into friendlier models.

    [Assimp](https://github.com/assimp/assimp) - Assimp is a library to import/export 3d model formats
