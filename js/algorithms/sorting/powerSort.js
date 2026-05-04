export function powerSort(array, ctx) {
    let n = array.length;
    let runs = [];
    let i = 0;

    while (i < n) {
        let start = i;
        i++;
        while (i < n && !ctx.compare(i - 1, i)) { // array[i-1] <= array[i]
            i++;
        }
        runs.push({ start: start, end: i });
    }

    while (runs.length > 1) {
        let r1 = runs.shift();
        let r2 = runs.shift();
        merge_runs(array, ctx, r1.start, r1.end, r2.end);
        runs.unshift({ start: r1.start, end: r2.end });
    }
    
    for (let k = 0; k < n; k++) ctx.markSorted(k);
}

function merge_runs(array, ctx, start, mid, end) {
    let left = array.slice(start, mid);
    let right = array.slice(mid, end);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        ctx.compare(start + i, mid + j);
        if (left[i] <= right[j]) {
            ctx.write(k, left[i]);
            i++;
        } else {
            ctx.write(k, right[j]);
            j++;
        }
        k++;
    }
    while (i < left.length) { ctx.write(k, left[i]); i++; k++; }
    while (j < right.length) { ctx.write(k, right[j]); j++; k++; }
}
