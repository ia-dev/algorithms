export function shellSort(array, ctx) {
    let n = array.length;
    let h = 1;
    while (h < Math.floor(n / 3)) {
        h = 3 * h + 1;
    }
    while (h >= 1) {
        for (let i = h; i < n; i++) {
            let j = i;
            while (j >= h && ctx.compare(j - h, j)) { // array[j-h] > array[j]
                ctx.swap(j, j - h);
                j -= h;
            }
        }
        h = Math.floor(h / 3);
    }
    for (let i = 0; i < n; i++) ctx.markSorted(i);
}