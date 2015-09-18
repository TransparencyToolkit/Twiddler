Twiddler
========

Twiddler is an application for text processing, light natural language processing, and keyword extraction. Twiddler is built around the idea that there are lots of various text processing tools and libraries in existence, but these existing tools are often highly technical and only provide portions of text processing. Twiddler aims to provide a framework to make using these tools more intuitive.

## Installing

To install Twiddler do one of the following:

```
git clone https://github.com/TransparencyToolkit/Twiddler
npm install twiddler
```

Then you need to install all of the dependencies that are required for Twiddler itself

```
cd twiddler
npm install
```

These dependencies will give you all you need to run the basic Twiddler app via the CLI.

*Here are some work in progress commands that provide some of the basic functionality*

### Running as CLI

**new** - add a new project

```
twiddler new /path/to/project/
```

**open** - open an existing project

```
twiddler open /path/to/project/
```

**source** - adds a source to an existing project

```
twiddler source /path/to/project/ -t file
```

**process** - process a project

```
twiddler process /path/to/project/
```

### Running the GUI app

First you need to download and install the `devDependencies` required by [Electron](https://electron.atom.io)

```
npm install --dev
npm start
```

#### Build the Electron App

```
npm run package
```

This will build the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/maxogden/electron-packager).


#### License

AGPLv3 © [TransparencyToolkit](https://transparencytoolkit.org)
