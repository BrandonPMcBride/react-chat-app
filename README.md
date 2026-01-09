# React Chat App

A simple chat application built with **React JS** and **Tailwind CSS**.  
This project demonstrates a local chat UI with username coloring, dark/light mode toggle, and message management.

## Features

- Dark and light mode toggle (persists in localStorage)
- Unique color for each username (using `color-hash`)
- Add and delete messages
- Username input with welcome message
- Themed backgrounds for dark/light modes

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/BrandonPMcBride/react-chat-app.git
cd react-chat-app
npm install
```

### Running the App

Start the development server:

```sh
npm run dev
```

Open your browser and go to [http://localhost:5173](http://localhost:5173).

### Building for Production

```sh
npm run build
```

## Project Structure

```
├── public/
│   ├── React-icon.svg
│   ├── tailwindcss-mark.svg
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── Images/
│       ├── john-towner-JgOeRuGD_Y4-unsplash.jpg
│       └── Screenshot2025-07-22165032.png
├── index.html
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
└── vite.config.js
```

## Customization

- **Change backgrounds:** Replace images in `src/Images/`.
- **Edit styles:** Modify `src/index.css` or Tailwind config.
- **Add features:** Extend [`App`](src/App.jsx) in [src/App.jsx](src/App.jsx).

## License

MIT

---

Made with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/)