#!/usr/bin/env node

import path from 'node:path';
import { getConfigFile } from '../src/getConfigFile.js';

const config = getConfigFile();
if (config) {
  console.log(config);
}
