import type { ComponentPublicInstance, Ref } from 'vue'
import { unref } from 'vue'

export type MaybeRef<T> = T | Ref<T>;
export type VueInstance = ComponentPublicInstance;
export type MaybeElement =
  | HTMLDivElement
  | VueInstance
  | undefined
  | null;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> =
  MaybeRef<T>;

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> =
  T extends VueInstance ? Exclude<MaybeElement, VueInstance> : T | undefined;

export function unrefElement<T extends MaybeElement>(
  elRef: MaybeElementRef<T>
): UnRefElementReturn<T> {
  const plain = unref(elRef)
  return (plain as VueInstance)?.$el ?? plain
}
