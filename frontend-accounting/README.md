### Accouting Module - Frontend

This project is bootstraped with [CRA](https://create-react-app.dev/) and uses [Chakra-Ui](https://chakra-ui.com/) components.

## Development

1. Clone this reposiroty `git clone https://github.com/MiadV/store-management.git`
2. Navigate to project folder and install the dependencies.

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

1. If you’re using [Apache HTTP Server](https://httpd.apache.org/), you need to create a .htaccess file in the public folder that looks like this:
   **Note:** This is necessary since we are using client-side routing.

```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

2. Build the project using below command:

```bash
npm run build
# or
yarn run build
```

### Social Media

<p align="center">
    <a href="https://www.buymeacoffee.com/miad" alt="buymeacoffee">
        <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=flat&logo=buy-me-a-coffee&logoColor=black" />
    </a>
    <a href="mailto:miadv.biz@gmail.com" alt="gmail">
    <a href="https://www.linkedin.com/in/miad-vosoughi" alt="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=flat&logo=linkedin&logoColor=white" />
    </a>
    <a href="mailto:miadv.biz@gmail.com" alt="gmail">
        <img src="https://img.shields.io/badge/Gmail-D14836.svg?style=flat&logo=gmail&logoColor=white" />
    </a>
    <a href="https://twitter.com/Miad_Vosoughi" alt="twitter">
        <img src="https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=flat&logo=twitter&logoColor=white" />
    </a>
    <a href="https://www.youtube.com/c/MiadVosoughi" alt="youtube">
        <img src="https://img.shields.io/badge/Youtube-%23FF0000.svg?style=flat&logo=youTube&logoColor=white" />
    </a>
    <a href="https://www.instagram.com/miadv.dev" alt="instagram">
        <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=flat&logo=instagram&logoColor=white" />
    </a>
</p>
