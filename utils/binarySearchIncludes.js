export default function binarySearchIncludes(
  arr,
  target,
  low = 0,
  high = arr.length - 1
) {
  const mid = ((low + high) / 2) << 0;

  if (high < low) return false;
  if (arr[mid] > target) return binarySearchIncludes(arr, target, low, mid - 1);
  if (arr[mid] < target)
    return binarySearchIncludes(arr, target, mid + 1, high);

  return true;
}
