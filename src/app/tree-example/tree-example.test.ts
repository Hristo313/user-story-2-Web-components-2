import { describe, it, expect } from 'vitest';
import TreeExample from './tree-example.js';

describe('TreeExample', () => {
  it('<app-tree-example> is an instance of TreeExample', async () => {
    const element = document.createElement('app-tree-example');
    expect(element).to.be.instanceOf(TreeExample);
  });
});
