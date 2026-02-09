// src/plugins/personalization-plugin/index.ts
import { LoadContext, Plugin } from '@docusaurus/types';
import path from 'path';

export default function personalizationPlugin(context: LoadContext): Plugin<void> {
  return {
    name: 'personalization-plugin',
    
    getPathsToWatch() {
      return [path.join(__dirname, 'components/**/*')];
    },
    
    async contentLoaded({ content, actions }) {
      // Plugin initialization logic
    },
    
    async loadContent() {
      // Load personalization-related content
      return undefined;
    },
    
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            '@personalization': path.resolve(__dirname, 'components'),
          },
        },
      };
    },
  };
}