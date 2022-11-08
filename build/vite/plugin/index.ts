import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import VitePluginCertificate from 'vite-plugin-mkcert';
import { configHtmlPlugin } from './html';
import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import { configImageminPlugin } from './imagemin';
import { configSvgIconsPlugin } from './svgSprite';
import { configWindiCssPlugin } from './windicss';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: PluginOption[] = [
    // 提供 Vue 3 单文件组件支持
    vue(),
    // 提供 Vue 3 JSX 支持
    vueJsx(),
    VitePluginCertificate({
      source: 'coding',
    }) as PluginOption,
  ];

  // @vitejs/plugin-legacy 为打包后的文件提供传统浏览器兼容性支持
  VITE_LEGACY &&
    isBuild &&
    vitePlugins.push(
      legacy({
        targets: ['defaults'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
    );

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons 用于生成 svg 雪碧图.
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-windicss
  vitePlugins.push(configWindiCssPlugin());

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));

  // rollup-plugin-visualizer 可视化分析模块占用
  vitePlugins.push(configVisualizerConfig());

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );
  }

  return vitePlugins;
}
