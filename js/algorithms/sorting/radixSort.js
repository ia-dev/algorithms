/**
 * Helper function representing the Python counting_sort logic
 */
function countingSort(array, n, exp, ctx) {
    let output = new Array(n).fill(0);
    let count = new Array(10).fill(0);

    // Store count of occurrences
    for (let i = 0; i < n; i++) {
        let index = Math.floor(array[i] / exp);
        count[index % 10]++;
    }

    // Change count[i] so that it contains the actual position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    let i = n - 1;
    while (i >= 0) {
        let index = Math.floor(array[i] / exp);
        output[count[index % 10] - 1] = array[i];
        count[index % 10]--;
        i--;
    }

    // Copy the output array to the original array (L[i] = output[i])
    for (let j = 0; j < n; j++) {
        array[j] = output[j];
        // Mirroring your original ctx.write for visualization
        ctx.write(j, array[j]);
    }
}

/**
 * Main Radix Sort function
 */
export function radixSort(array, ctx) {
    let n = array.length;
    let max_val = Math.max(...array);
    let exp = 1;

    // While max_val // exp > 0
    while (Math.floor(max_val / exp) > 0) {
        countingSort(array, n, exp, ctx);
        exp *= 10;
    }

    // Final marking for visualization
    for (let i = 0; i < n; i++) {
        ctx.markSorted(i);
    }
}