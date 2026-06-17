import defaults from './defaults'
import overrides from './user'

const config = { ...defaults, ...overrides }

export default config
export type { Config } from './defaults'