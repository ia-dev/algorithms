export function insertionSort(array, ctx) {
    let n = array.length;
    ctx.markSorted(0);
    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && ctx.compare(j - 1, j)) {
            ctx.swap(j, j - 1);
            j--;
        }
        // Mark the growing sorted portion
        for (let k = 0; k <= i; k++) ctx.markSorted(k);
    }
}
