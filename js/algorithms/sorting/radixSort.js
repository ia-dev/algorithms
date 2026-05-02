export function radixSort(array, ctx) {
    let max = Math.max(...array);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        let n = array.length;
        let output = new Array(n);
        let count = new Array(10).fill(0);
        
        for (let i = 0; i < n; i++) count[Math.floor(array[i] / exp) % 10]++;
        for (let i = 1; i < 10; i++) count[i] += count[i - 1];
        
        for (let i = n - 1; i >= 0; i--) {
            let index = Math.floor(array[i] / exp) % 10;
            output[count[index] - 1] = array[i];
            count[index]--;
        }
        for (let i = 0; i < n; i++) {
            ctx.write(i, output[i]); // Overwrite array with sorted buckets
        }
    }
    for (let i = 0; i < array.length; i++) ctx.markSorted(i);
}
