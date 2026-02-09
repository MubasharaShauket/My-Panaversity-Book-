import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  textbookSidebar: [
    {
      type: 'category',
      label: 'Part I - Foundations',
      collapsed: false,
      items: [
        'part-i-foundations/introduction-to-physical-ai',
        'part-i-foundations/robotics-vs-software-intelligence',
        'part-i-foundations/humanoid-robot-architecture',
        'part-i-foundations/sensors-actuators-and-embodiment',
        'part-i-foundations/control-systems-and-feedback-theory',
      ],
    },
    {
      type: 'category',
      label: 'Part II - Learning & Intelligence',
      collapsed: false,
      items: [
        'part-ii-learning-intelligence/reinforcement-learning-for-robotics',
        'part-ii-learning-intelligence/sim-to-real-transfer',
        'part-ii-learning-intelligence/multimodal-perception-systems',
        'part-ii-learning-intelligence/world-models-and-cognitive-robotics',
      ],
    },
    {
      type: 'category',
      label: 'Part III - Systems Engineering',
      collapsed: false,
      items: [
        'part-iii-systems-engineering/ros2-architecture',
        'part-iii-systems-engineering/robotic-software-pipelines',
        'part-iii-systems-engineering/real-time-control-systems',
        'part-iii-systems-engineering/safety-critical-robotics',
      ],
    },
    {
      type: 'category',
      label: 'Part IV - Humanoid Robotics',
      collapsed: false,
      items: [
        'part-iv-humanoid-robotics/bipedal-locomotion',
        'part-iv-humanoid-robotics/dexterous-manipulation',
        'part-iv-humanoid-robotics/human-robot-interaction',
        'part-iv-humanoid-robotics/ethics-and-societal-impact',
      ],
    },
    {
      type: 'category',
      label: 'Part V - Agentic Robotics',
      collapsed: false,
      items: [
        'part-v-agentic-robotics/agent-based-robotics-systems',
        'part-v-agentic-robotics/tool-using-robots',
        'part-v-agentic-robotics/multi-agent-coordination',
        'part-v-agentic-robotics/physical-ai-reasoning-engines',
      ],
    },
    {
      type: 'category',
      label: 'Part VI - Capstone & Innovation',
      collapsed: false,
      items: [
        'part-vi-capstone-innovation/humanoid-ai-startup-blueprint',
        'part-vi-capstone-innovation/robotics-product-architecture',
        'part-vi-capstone-innovation/research-roadmaps',
        'part-vi-capstone-innovation/final-engineering-capstone-project',
      ],
    },
  ],
};

export default sidebars;
