export function radixSort(array, ctx) {
    let n = array.length;
    let max_val = Math.max(...array);
    let exp = 1;
    
    while (Math.floor(max_val / exp) > 0) {
        let output = new Array(n).fill(0);
        let count = new Array(10).fill(0);
        
        for (let i = 0; i < n; i++) {
            let index = Math.floor(array[i] / exp);
            count[index % 10]++;
        }
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        for (let i = n - 1; i >= 0; i--) {
            let index = Math.floor(array[i] / exp);
            output[count[index % 10] - 1] = array[i];
            count[index % 10]--;
        }
        for (let i = 0; i < n; i++) {
            ctx.write(i, output[i]);
        }
        exp *= 10;
    }
    for (let i = 0; i < n; i++) ctx.markSorted(i);
}
