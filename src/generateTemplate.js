import fs from 'node:fs';
import { resolve } from 'node:path';

const template = (data) =>
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Import-Visualizer</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src=" https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const data = ${data};
      const App = () => {
        return <h1>{data.test}</h1>;
      };

      ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    </script>
  </body>
</html>
`;

export function generateTemplate(data) {
  fs.writeFileSync(resolve(process.argv[1], '../../index.html'), template(JSON.stringify(data)));
}
