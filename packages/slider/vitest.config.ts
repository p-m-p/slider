import { defineProject, mergeConfig } from 'vitest/config'
import rootConfig from '../../vitest.config'

export default mergeConfig(rootConfig, defineProject({}))
