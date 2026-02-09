// src/plugins/translation-plugin/index.ts
import { LoadContext, Plugin } from '@docusaurus/types';
import path from 'path';

export default function translationPlugin(context: LoadContext): Plugin<void> {
  return {
    name: 'translation-plugin',
    
    getPathsToWatch() {
      return [path.join(__dirname, 'components/**/*')];
    },
    
    async contentLoaded({ content, actions }) {
      // Plugin initialization logic
    },
    
    async loadContent() {
      // Load translation-related content
      return undefined;
    },
    
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            '@translation': path.resolve(__dirname, 'components'),
          },
        },
      };
    },
  };
}