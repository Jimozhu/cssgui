interface FieldProps<V> {
  value: V
  onChange(value: V): void
  onRemove?(): void
  label?: string | number
  showLabel?: boolean
}

type Key = string | number
export type KeyPath = Key[]
export type KeyArg = Key | KeyPath | string
export type Recipe<V> = V | Setter<V>
type Setter<V> = (draft: V) => V | void

export interface EditorData<V> {
  value: V
}
