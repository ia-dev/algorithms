export function selectionSort(array, ctx) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            if (ctx.compare(min_idx, j)) { // array[j] < array[min_idx]
                min_idx = j;
            }
        }
        ctx.swap(i, min_idx);
        ctx.markSorted(i);
    }
    ctx.markSorted(n - 1);
}
