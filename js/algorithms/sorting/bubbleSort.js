export function bubbleSort(array, ctx) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (ctx.compare(j, j + 1)) { // array[j] > array[j+1]
                ctx.swap(j, j + 1);
            }
        }
        ctx.markSorted(n - i - 1);
    }
    ctx.markSorted(0);
}
