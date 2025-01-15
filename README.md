# SPIN-O-MATIC

🟢 [Live Preview](https://blx-spinner-82fd58ce25ac.herokuapp.com)  
📦 [Codesandbox](https://codesandbox.io/p/github/canthugeverycat/blx-game)

This covers the documentation for the project, including setup, structure, and other essential details.

## Table of Contents

- [💻 Development Environment](#-development-environment)
- [📄 Available Scripts](#-available-scripts)
- [🧱 Structure & organization](#-structure--organization)
- [🎨 Styles](#-styles)
  - [🎠 Theming](#-theming)
- [🌠 Assets](#-assets)
- [🧊 Components](#-components)
- [🌍 Globals](#-globals)
- [🧩 Contexts](#-contexts)
- [🪝 Hooks](#-hooks)
- [🔧 Utils](#-utils)

## 💻 Development Environment

This project was developed with the following environment:

- **Node** v21.7.3
- **npm** v10.5.0
- **Next.js** v14.2.5
- **React.js** ^v18

## 📄 Available Scripts

To start the app run:

#### `npm install`

to install the required dependencies for the project.  
Once installed run:

#### `npm run dev`

This will start the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run test`

This will run tests. After running this command press `a` to run all tests for the app.

## 🧱 Structure & organization

- `assets`
  - [file].(svg|jpg|png)
- `components`
  - [`component`]
    - index.module.scss
    - index.tsx
    - index.test.tsx
- `globals`
  - [file].ts
- `hooks`
  - [hook].ts
  - [hook].test.ts
- `styles`
  - [style].scss
- `utils`
  - [function].ts
- `contexts`
  - [context].ts
  - [context].test.ts

## 🎨 Styles

Holds base global styles for the app. The files are split as follows:

- `animations.module.scss` - Contains custom animations
- `mixins.module.scss` - Contains utility mixins
- `variables.module.scss` - All the global SCSS variables are stored here
- `reset.scss` - CSS reset file
- `root.scss` - Root styles

### 🎠 Theming

Each component has its own _.scss_ file. At the very top, variables local to the component are defined, which allows for easy changes without going through the entire code.

Furthermore, if you go over to **variables.module.scss**, you will find a **Theme** section that defines theming properties for the entire app. All components are styled in a way that supports theming, so changing any of the variables in the theme section will have global changes.

For example:

\
_Default theme_

<img src="https://i.ibb.co/7K4m0Qg/Screenshot-2024-08-03-at-21-53-49.png" width="370px" />
<img src="https://i.ibb.co/jz4N0Kr/Screenshot-2024-08-03-at-21-54-49.png" width="500px" />

\
_Example of a black and pink theme_

<img src="https://i.ibb.co/6b7rVVL/Screenshot-2024-08-03-at-21-58-26.png" width="370px" />
<img src="https://i.ibb.co/Fq0Dtbq/Screenshot-2024-08-03-at-21-58-13.png" width="500px" />

\
_Example of orange and green theme_

<img src="https://i.ibb.co/SndC0f5/Screenshot-2024-08-03-at-22-04-00.png" width="370px" />
<img src="https://i.ibb.co/7vn6CzD/Screenshot-2024-08-03-at-22-03-52.png" width="500px" />

## 🌠 Assets

A folder containing visual assets for the app. This is a place for images, local fonts, videos, etc.

## 🧊 Components

This folder houses the components as the building blocks of the app.

Each component has:

- `index.tsx` - _The actual component_
- `index.module.scss` - _Locally scoped SCSS styles_
- `index.test.tsx` - _Unit tests (where applicable)_

## 🌍 Globals

Houses .ts files which are used globally throughout the app. Currently, we have:

- `const.ts` - _Global constants_

## 🧩 Contexts

The `contexts` folder contains the following:

- **SpinContext.tsx** - Provides context for managing spin-related states
- **SpinContext.test.tsx** - Unit tests for the context

## 🪝 Hooks

The `hooks` folder includes custom hooks used across the app:

- **useContainerWidth.ts** - Manages container width with respect to resizing
- **useSpinnerAnimation.ts** - Handles animating the container and detecting middle element
- **useSpinnerPositions.ts** - Reorders reel items to ensure infinite scrolling

Each hook has:

- `index.ts` - The main hook logic
- `index.test.ts` - Unit tests for the hook

## 🔧 Utils

The `utils` folder contains utility functions used throughout the app:

- **isPrime.ts** - Checks if a number is a prime number
- **shuffleArray.ts** - Shuffles the order of elements in an array
- **playSoundEffect.ts** - Plays sound effects
- **arrangeChildren.ts** - Arranges child elements in a reel

Each utility has:

- `index.ts` - The main utility logic.
- `index.test.ts` - Unit tests for the utility.
