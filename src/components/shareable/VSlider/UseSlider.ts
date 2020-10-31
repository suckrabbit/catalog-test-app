import {
  computed, ref, readonly,
} from 'vue';

type TouchType = 'right' | 'left';

interface SliderProps {
  min: number;
  max: number;
  modelValue: number[];
  step: number;
}

const getStartPos = (value: number, max: number, min: number): number => (
  (((value || min) - min) / (max - min)) * 100
);

const getNumberTail = (value: number) => ((value.toString().includes('.')) ? (value.toString().split('.')?.pop()?.length) : (0));

export function UseSlider(props: SliderProps, emit: Function) {
  const localChage = ref<boolean>(false);
  const leftPos = ref<number>(getStartPos(props.modelValue[0], props.max, props.min));
  const rightPos = ref<number>(getStartPos(props.modelValue[1], props.max, props.min));
  const slider = ref<HTMLElement | null>(null);
  const selectedTouch = ref<TouchType | null>(null);
  let startPos = 0;
  let startX = 0;
  const connectorWidth = computed<number>(() => rightPos.value - leftPos.value);
  const calculateNewValue = (value: number): number => (
    +(Math.round(((value / 100) * (props.max - props.min)) / props.step) * props.step)
      .toFixed(getNumberTail(props.step))
  );
  const updateValue = (): void => {
    const leftNewValue = calculateNewValue(leftPos.value);
    const rightNewValue = calculateNewValue(rightPos.value);
    emit('update:modelValue', [leftNewValue, rightNewValue]);
  };
  const updatePositions = (): void => {
    leftPos.value = getStartPos(props.modelValue?.[0], props.max, props.min);
    rightPos.value = getStartPos(props.modelValue?.[1], props.max, props.min);
  };
  const onMove = (e: MouseEvent) => {
    const widthPx = slider.value?.offsetWidth!;
    const diff = e.x - startX;
    const newPos = startPos + (diff / widthPx) * 100;
    if (selectedTouch.value === 'right') {
      if (newPos < leftPos.value) {
        rightPos.value = leftPos.value;
      } else {
        rightPos.value = newPos > 100 ? 100 : newPos;
      }
    } else if (newPos > rightPos.value) {
      leftPos.value = rightPos.value;
    } else {
      leftPos.value = newPos < 0 ? 0 : newPos;
    }
    updateValue();
  };
  const touchDrop = () => {
    selectedTouch.value = null;
    localChage.value = false;
    updatePositions();
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', touchDrop);
  };
  const setTouch = (type: TouchType, e: MouseEvent): void => {
    localChage.value = true;
    startPos = type === 'right' ? rightPos.value * 1 : leftPos.value * 1;
    startX = e.x;
    selectedTouch.value = type;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', touchDrop);
  };
  return {
    localChage,
    leftPos,
    rightPos,
    slider,
    connectorWidth,
    selectedTouch: readonly(selectedTouch),
    setTouch,
    touchDrop,
    updatePositions,
  };
}
