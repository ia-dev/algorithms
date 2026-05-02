export function powerSort(array, ctx) {
    let n = array.length;
    let runs = [];
    let i = 0;
    
    // 1. Identify natural sorted runs
    while (i < n) {
        let start = i;
        while (i < n - 1) {
            if (!ctx.compare(i, i + 1)) { // array[i] <= array[i+1]
                i++;
            } else {
                break;
            }
        }
        i++;
        runs.push({ left: start, right: i - 1 });
    }

    // 2. Merge runs
    while (runs.length > 1) {
        let nextRuns = [];
        for (let j = 0; j < runs.length; j += 2) {
            if (j + 1 < runs.length) {
                merge(array, ctx, runs[j].left, runs[j].right, runs[j + 1].right);
                nextRuns.push({ left: runs[j].left, right: runs[j + 1].right });
            } else {
                nextRuns.push(runs[j]);
            }
        }
        runs = nextRuns;
    }
    for (let k = 0; k < n; k++) ctx.markSorted(k);
}

function merge(array, ctx, left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = new Array(n1);
    let R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let j = 0; j < n2; j++) R[j] = array[mid + 1 + j];
    
    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        ctx.compare(left + i, mid + 1 + j);
        if (L[i] <= R[j]) { ctx.write(k, L[i]); i++; } 
        else { ctx.write(k, R[j]); j++; }
        k++;
    }
    while (i < n1) { ctx.write(k, L[i]); i++; k++; }
    while (j < n2) { ctx.write(k, R[j]); j++; k++; }
}
