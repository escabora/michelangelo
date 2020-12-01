
import Taskerify from 'taskerify';

Taskerify.config.sourcemaps    = false;
Taskerify.config.srcPath       = './src/assets';  // Src Path
Taskerify.config.distPath      = './dist/assets'; // Dist Path
Taskerify.config.srcViewsPath = './src'; // Views Src Path
Taskerify.config.distViewsPath = './dist'; // Compiled Views Dist Path (HTML)

const SRC          = Taskerify.config.srcPath;
const DIST         = Taskerify.config.distPath;

const storeName    = 'boilerplate';
const files  = ['globals', 'home'];

Taskerify((mix) => {

    // PugJS Template
    mix.pug();

    // Image Minifier
    mix.imagemin(`${SRC}/images`, `${DIST}/images`);

    // Files
    files.map((file) => {
        mix.browserify(`${SRC}/js/${storeName}-${file}.js`, `${DIST}/js`)
            .sass(`${SRC}/scss/${storeName}-${file}.scss`,  `${DIST}/css`);
    });

    mix.browserSync({
        open: 'external',
        https: true,
        port: 8888,
        watch: true,
        ui: false,
        proxy: false,
        server: {
            baseDir: `./dist`,
            serveStaticOptions: {
                extensions: ['html','css','js']
            }
        },
        files: [
            `${DIST}/css/*.css`, 
            `${DIST}/js/*.js`,
        ],
    });

});
