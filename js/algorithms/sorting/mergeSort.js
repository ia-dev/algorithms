export function mergeSort(array, ctx, left = 0, right = array.length) {
    if (right - left > 1) {
        const mid = left + Math.floor((right - left) / 2);
        
        // Recursively sort both halves
        mergeSort(array, ctx, left, mid);
        mergeSort(array, ctx, mid, right);
        
        // Create temporary arrays mimicking Python's left_half and right_half
        let left_half = array.slice(left, mid);
        let right_half = array.slice(mid, right);
        
        let i = 0, j = 0, k = left;
        
        // Merge the temp arrays back into the main array
        while (i < left_half.length && j < right_half.length) {
            ctx.compare(left + i, mid + j); // Trigger visual highlight
            
            if (left_half[i] < right_half[j]) {
                ctx.write(k, left_half[i]);
                i++;
            } else {
                ctx.write(k, right_half[j]);
                j++;
            }
            k++;
        }
        
        // Check if any element was left behind
        while (i < left_half.length) {
            ctx.write(k, left_half[i]);
            i++;
            k++;
        }
        
        while (j < right_half.length) {
            ctx.write(k, right_half[j]);
            j++;
            k++;
        }
    }
    
    // Mark as sorted only on the final outermost call
    if (left === 0 && right === array.length) {
        for (let x = 0; x < array.length; x++) ctx.markSorted(x);
    }
}
