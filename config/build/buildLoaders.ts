import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[]  {

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
    }

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: '/node_modules',
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        "i18next-extract", 
                        {
                            nsSeparator: "-",
                            locales: ["ru", "en"],
                            keyAsDefaultValue: true
                        }
                    ],
                ]
            }
        }
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }
    
    // Если не использовать TS - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
    }

    const cssLoader = {
        test: /\.s|[ac]ss$/i,
        use: [
            // Создание стилей из JS строк
            options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Переделывает CSS в CommonJS
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => resPath.includes('.module.'),
                        localIdentName: options.isDev 
                            ? '[path][name]__[local]--[hash:base64:8]' 
                            : '[hash:base64:8]'
                    },
                },
            },
            // Компилирует Sass в CSS
            "sass-loader"
        ],
    }

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader,
    ]
}