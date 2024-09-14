import * as React from 'react';
import { NumberInputProps } from './types';
import { roundToStep } from '../../../lib/math';

interface DraggableLabelProps {
  step?: number;
  onUpdate: (newValue: any) => void;
  value: number;
  min?: number;
  max?: number;
}

const DraggableInput = ({
  value = 0,
  onUpdate,
  step = 1,
  min,
  max,
}: DraggableLabelProps) => {
  // Keep track of an internal value so that when the user types in an invalid number,
  // we just wait until the value is valid again to update
  const [internalValue, setInternalValue] = React.useState<number | string>(
    value
  );

  const updateValue = (newValue: number) => {
    let inRangeValue = newValue;
    if (min || min === 0) inRangeValue = Math.max(newValue, min);
    if (max || max === 0) inRangeValue = Math.min(inRangeValue, max);

    setInternalValue(inRangeValue);
    onUpdate(inRangeValue);
  };

  React.useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value);
    }
  }, [internalValue, value]);

  return (
    <input
      type="number"
      value={internalValue}
      min={min}
      max={max}
      onKeyDown={(e) => {
        switch (e.key) {
          case 'ArrowUp': {
            updateValue(roundToStep(value + step, step));
            return;
          }
          case 'ArrowDown': {
            updateValue(roundToStep(value - step, step));
            return;
          }
        }
      }}
      onChange={({ target: { value: inputValue } }: any) => {
        let newValue = parseFloat(inputValue);

        if (min || min === 0) newValue = Math.max(newValue, min);
        if (max || max === 0) newValue = Math.min(newValue, max);

        // A user is currently typing a negative number or a decimal which results
        // in the number being temporarily invalid. When this happens, update the
        // internal value and wait for the value to become valid again.
        const valueIsInFlight = inputValue === '-' || inputValue.endsWith('.');
        if (valueIsInFlight) {
          return setInternalValue(inputValue);
        }

        setInternalValue(newValue ?? '');
        onUpdate(newValue || 0);
      }}
      sx={{
        lineHeight: 1.5,
        p: 1,
        width: '7ch',
        // Use fractional steps to approximate the minimum width
        // so we don't get "jitters" moving between fractional and integer values
        minWidth: `${step.toString().length + 1}ch`,
        textAlign: 'right',
        background: 'none',
        color: 'text',
        border: 'none',
        transition: 'width 150ms',
      }}
    />
  );
};

export const NumberInput = ({
  value,
  onChange,
  step = 1,
  min,
  max,
}: NumberInputProps): any => {
  return (
    <DraggableInput
      value={value}
      step={step}
      min={min}
      max={max}
      onUpdate={onChange}
    />
  );
};
