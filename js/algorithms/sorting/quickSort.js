export function quickSort(array, ctx, low = 0, high = array.length - 1) {
    if (low < high) {
        let pi = partition(array, ctx, low, high);
        ctx.markSorted(pi);
        quickSort(array, ctx, low, pi - 1);
        quickSort(array, ctx, pi + 1, high);
    } else if (low === high) {
        ctx.markSorted(low);
    }
}

function partition(array, ctx, low, high) {
    let pivotIndex = high;
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (ctx.compare(pivotIndex, j)) { // array[j] <= array[pivotIndex]
            i++;
            ctx.swap(i, j);
        }
    }
    ctx.swap(i + 1, high);
    return i + 1;
}
