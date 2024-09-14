const linquisticPseudoClasses = ['dir', 'lang'] as const
const locationPseudoClasses = [
  'any-link',
  'link',
  'visited',
  'local-link',
  'target',
  'target-within',
  'scope',
] as const
const userActionPseudoClasses = [
  'hover',
  'active',
  'focus',
  'focus-visible',
  'focus-within',
] as const
const timeDimensionalPseudoClasses = [
  'current',
  'past',
  'future',
] as const
const resourceStatePseudoClasses = ['playing', 'paused'] as const
const inputPseudoClasses = [
  'autofill',
  'enabled',
  'disabled',
  'read-only',
  'read-write',
  'placeholder-shown',
  'default',
  'checked',
  'indeterminate',
  'blank',
  'valid',
  'invalid',
  'in-range',
  'out-of-range',
  'required',
  'optional',
  'user-invalid',
] as const
const treeStructuralPseudoClasses = [
  'root',
  'empty',
  'first-child',
  'last-child',
  'only-child',
  'only-of-type',
] as const
export const selectorFunctionPseudoClasses = [
  'dir',
  'has',
  'host-context',
  'host',
  'is',
  'lang',
  'not',
  'nth-child',
  'nth-last-child',
  'nth-last-of-type',
  'nth-of-type',
  'where',
]
export const pseudoClasses = [
  ...linquisticPseudoClasses,
  ...locationPseudoClasses,
  ...userActionPseudoClasses,
  ...timeDimensionalPseudoClasses,
  ...resourceStatePseudoClasses,
  ...inputPseudoClasses,
  ...treeStructuralPseudoClasses,
  ...selectorFunctionPseudoClasses,
] as const
