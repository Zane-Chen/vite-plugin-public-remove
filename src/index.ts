import type { PluginOption } from 'vite';
import fs from 'fs'
import path from 'path';
type PluginOptions = {
  exclude: RegExp;
}
export default function vitePluginPublicRemove(options: PluginOptions): PluginOption {
  let outPutDir = '', isNuxt3 = false
  const { exclude } = options;

  return {
    name: 'vite-plugin-public-remove',
    enforce: 'post',
    apply: 'build',
    writeBundle(options) {
      outPutDir = options.dir as string;
      if (outPutDir.includes('.nuxt')) {
        outPutDir = outPutDir.replace(/\.nuxt.*/, 'dist');
        isNuxt3 = true
      }
    },
    async closeBundle() {
      let timer = setTimeout(() => {
        const distPath = path.resolve(outPutDir);
        if (fs.existsSync(distPath)) {
          const deleteFiles = (dirPath: string): void => {
            fs.readdirSync(dirPath).forEach(file => {
              const filePath = path.join(dirPath, file);
              if (fs.statSync(filePath).isDirectory()) {
                if (exclude.test(filePath.replace(/\\/g, '/'))) {
                  fs.rm(filePath, { recursive: true }, () => {
                    console.log('✅: deleted successful', filePath)
                  });
                  return
                }
                deleteFiles(filePath);
              } else {
                if (exclude.test(file)) {
                  fs.unlinkSync(filePath);
                }
              }
            });
          };
          deleteFiles(distPath);
        } else {
          console.log('⚠️: dist path is not found')
        }
        clearTimeout(timer)
      }, isNuxt3 ? 1000 : 0);
    }
  };
}