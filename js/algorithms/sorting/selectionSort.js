export function selectionSort(array, ctx) {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (ctx.compare(minIdx, j)) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            ctx.swap(i, minIdx);
        }
        ctx.markSorted(i);
    }
}
