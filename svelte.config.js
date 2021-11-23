import path from 'path';
import micromatch from 'micromatch';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import * as cg from '@graphql-codegen/cli';

/** @returns {import('vite').Plugin} */
function codegen(configFilePath = '.') {
  let codegenContext;
  const generate = () => cg.generate(codegenContext).catch(() => {});
  return {
    name: 'graphql-codegen',
    async config({ root }) {
      const codegenConfig = await cg.loadCodegenConfig({ configFilePath: path.join(root, configFilePath) });
      codegenContext = cg.ensureContext(codegenConfig.config);
      codegenContext.updateConfig({ watch: false });
    },
    async buildStart() {
      await generate();
    },
    configureServer(server) {
      const listener = async (absolutePath) => {
        const relativePath = path.relative(server.config.root, absolutePath);
        const match = micromatch.isMatch(relativePath, codegenContext.getConfig().documents);
        if (match) {
          await generate();
        }
      };
      server.watcher.on('add', listener);
      server.watcher.on('change', listener);
    },
  };
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    target: '#svelte',
    adapter: adapter(),
    vite: {
      plugins: [
        codegen('.graphqlrc.yml'),
      ],
      build: {
        target: 'es2020',
      },
      ssr: {
        external: ['ethereum-cryptography'],
      },
    },
  }
};

export default config;
