export type EasingFunction = CubicBezier | Steps

export type EasingType = 'cubic-bezier' | 'steps'

// TODO support standalone keywords
export interface CubicBezier {
  type: 'cubic-bezier'
  p1: number
  p2: number
  p3: number
  p4: number
}

type CubicBezierKeyword =
  | 'ease'
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'

export interface Steps {
  type: 'steps'
  stops: number
  jumpTerm: JumpTerm
}

type StepsKeyword = 'step-start' | 'step-end'

export type Keyword = CubicBezierKeyword | StepsKeyword

type JumpTerm = 'jump-start' | 'jump-end' | 'jump-none' | 'jump-both'
