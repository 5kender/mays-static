const Encore = require('@symfony/webpack-encore');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
//const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-tags-plugin');
const fs = require('fs');
const path = require('path');

const outputPath = 'files/build';
/******************
 * create output path
 *******************/
function mkDirByPathSync(targetDir, {isRelativeToScript = false} = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
      console.log(`Directory ${curDir} created!`);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }

      console.log(`Directory ${curDir} already exists!`);
    }

    return curDir;
  }, initDir);
}
if(!fs.existsSync(path.resolve(__dirname, outputPath))) {
  mkDirByPathSync(outputPath);
}

Encore
// the project directory where all compiled assets will be stored
  .setOutputPath(outputPath + '/')
  // the public path used by the web server to access the previous directory
  .setPublicPath('/' + outputPath)
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  // uncomment to create hashed filenames (e.g. app.abc123.css)
  //.enableVersioning(Encore.isProduction())

  // will create build/script.js and build/script.css
  .addEntry('script', ['core-js/stable', 'regenerator-runtime/runtime', './src/script.js'])
  // will create build/styles.css
  .addStyleEntry('styles', './src/scss/styles.scss')
  //.addStyleEntry('ext_index2', './src/scss/ext_index2.scss')

  // uncomment if you use Sass/SCSS files
  .enableSassLoader()

  // uncomment for legacy applications that require $/jQuery as a global variable
  .autoProvidejQuery()
  .enableBuildNotifications()
  .enablePostCssLoader()
  .disableSingleRuntimeChunk()
  .enableEslintLoader()
;

Encore.addLoader({
  test: /\.(mp4)$/i,
  use: {
    loader: 'file-loader',
    options: {
      esModule: false,
      name: 'videos/[name].[ext]',
      mimetype: 'video/mp4',
    }
  },
});

Encore.addLoader({
  test: /\.html$/i,
  use: {
    loader: 'html-loader',
    options: {
      interpolate: true
    }
  }
});

/******************
 * Auto-optimize images
 *******************/
Encore.addLoader({
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        esModule: false
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 90
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        }
      }
    }
  ]
});
Encore.disableImagesLoader();

/******************
 * Auto-load all .html files
 *******************/
// Our function that generates our html plugins
function generateHtmlPlugins (templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    let chunks = 'all';
    let excludes = [/ext_.*.css/];
    if(fs.existsSync(path.resolve(__dirname, `${templateDir}/../scss/ext_${name}.scss`))) {
      chunks = [`script`, `ext_${name}`];
      excludes = [];
    }

    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      //excludeAssets: [/\.(gif|png|jpe?g|svg)$/i],
      title: `${name}`,
      chunks: chunks,
      excludeAssets: excludes
    })
  })
}
const htmlPlugins = generateHtmlPlugins('./src/pages');
htmlPlugins.map(function(plugin) {
  Encore.addPlugin(plugin);
})

//Utilisé pour exclure certaines entrées avec la propriété "exludeAssets" (voir plus haut)
Encore.addPlugin(new HtmlWebpackExcludeAssetsPlugin());
//Utilisé pour inclure automatiquement certaines entrées
/*Encore.addPlugin(
  new HtmlWebpackIncludeAssetsPlugin({
    files: ['/build/index2.html'],
    assets: ['/build/styles2.css'],
    append: true,
  })
);*/

// export the final configuration
let config = Encore.getWebpackConfig();

config.stats.errors = true;

module.exports = config;
