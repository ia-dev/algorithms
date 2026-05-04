export function insertionSort(array, ctx) {
    let n = array.length;
    ctx.markSorted(0);
    
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        
        while (j >= 0) {
            // We call ctx.compare just to trigger the visual yellow highlight
            ctx.compare(j, i); 
            
            if (array[j] > key) {
                // Shift element to the right
                ctx.write(j + 1, array[j]);
                j -= 1;
            } else {
                break;
            }
        }
        // Insert the key into its final location
        ctx.write(j + 1, key);
        
        // Mark the growing sorted portion
        for (let k = 0; k <= i; k++) ctx.markSorted(k);
    }
}
