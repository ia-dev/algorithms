export function mergeSort(array, ctx, left = 0, right = array.length - 1) {
    if (left >= right) {
        if (left === right) ctx.markSorted(left);
        return;
    }
    const mid = Math.floor((left + right) / 2);
    mergeSort(array, ctx, left, mid);
    mergeSort(array, ctx, mid + 1, right);
    
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = new Array(n1);
    let R = new Array(n2);
    
    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let j = 0; j < n2; j++) R[j] = array[mid + 1 + j];
    
    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        ctx.compare(left + i, mid + 1 + j); // Highlight comparison
        if (L[i] <= R[j]) {
            ctx.write(k, L[i]); // Overwrite instead of swap
            i++;
        } else {
            ctx.write(k, R[j]);
            j++;
        }
        k++;
    }
    while (i < n1) { ctx.write(k, L[i]); i++; k++; }
    while (j < n2) { ctx.write(k, R[j]); j++; k++; }
    
    for (let x = left; x <= right; x++) ctx.markSorted(x);
}
