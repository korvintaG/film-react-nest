/**
 * Формирование уникального массива строк из массива с неуникальными строками
 * @param array - исходный массив
 * @returns результат - массив с уникальными строковыми значениями
 */
export function formUniqueStringArray(array: string[]): string[] {
  return array.filter(function (item, pos) {
    // выбираем
    return array.indexOf(item) == pos;
  });
}
