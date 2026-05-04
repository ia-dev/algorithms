import { selectionSort } from './algorithms/sorting/selectionSort.js';
import { insertionSort } from './algorithms/sorting/insertionSort.js';
import { shellSort } from './algorithms/sorting/shellSort.js';
import { bubbleSort } from './algorithms/sorting/bubbleSort.js';
import { radixSort } from './algorithms/sorting/radixSort.js';
import { mergeSort } from './algorithms/sorting/mergeSort.js';
import { quickSort } from './algorithms/sorting/quickSort.js';
import { powerSort } from './algorithms/sorting/powerSort.js';

const algorithms = { 
    'selection': selectionSort, 'insertion': insertionSort, 'shell': shellSort, 
    'bubble': bubbleSort, 'radix': radixSort, 'merge': mergeSort, 
    'quick': quickSort, 'power': powerSort 
};

const complexities = {
    'selection': { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    'insertion': { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    'shell': { best: 'O(n log n)', avg: 'O(n³/²)', worst: 'O(n²)', space: 'O(1)' },
    'bubble': { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    'radix': { best: 'O(d(n+k))', avg: 'O(d(n+k))', worst: 'O(d(n+k))', space: 'O(n+k)' },
    'merge': { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    'quick': { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    'power': { best: 'O(n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' }
};

const pseudocodes = {
    'selection': String.raw`$$ \begin{array}{l} \hline \mathbf{Algorithm:} \text{ SelectionSort}(L, n) \\ \hline \textbf{for } i \leftarrow 0 \text{ to } n - 2 \textbf{ do:} \\ \quad \textit{min\_idx} \leftarrow i \\ \quad \textbf{for } j \leftarrow i + 1 \text{ to } n - 1 \textbf{ do:} \\ \quad \quad \textbf{if } L[j] < L[\textit{min\_idx}] \textbf{ then} \\ \quad \quad \quad \textit{min\_idx} \leftarrow j \\ \quad \text{swap}(L[i], L[\textit{min\_idx}]) \\ \hline \end{array} $$`,
    
    'insertion': String.raw`$$ \begin{array}{l} \hline \mathbf{Algorithm:} \text{ InsertionSort}(L, n) \\ \hline \textbf{for } i \leftarrow 1 \text{ to } n-1 \textbf{ do:} \\ \quad \text{key} \leftarrow L[i] \\ \quad j \leftarrow i - 1 \\ \quad \textbf{while } j \ge 0 \text{ and } L[j] > \text{key} \textbf{ do:} \\ \quad \quad L[j+1] \leftarrow L[j] \\ \quad \quad j \leftarrow j - 1 \\ \quad L[j+1] \leftarrow \text{key} \\ \hline \end{array} $$`,
    
    'shell': String.raw`$$ \begin{array}{l} \hline \mathbf{Algorithm:} \text{ ShellSort}(L, n, h) \\ \hline \textbf{while } h < n // 3 \textbf{ do} \\ \quad h \leftarrow 3 * h + 1 \\ \textbf{while } h \ge 1 \textbf{ do} \\ \quad \textbf{for } i \leftarrow h \text{ to } n - 1 \textbf{ do} \\ \quad \quad j \leftarrow i \\ \quad \quad \textbf{while } j \ge h \text{ and } L[j] < L[j - h] \textbf{ do} \\ \quad \quad \quad \text{swap } L[j], L[j - h] \\ \quad \quad \quad j \leftarrow j - h \\ \quad h \leftarrow h // 3 \\ \hline \end{array} $$`,
    
    'bubble': String.raw`$$ \begin{array}{ll} \hline \mathbf{Algorithm:} & \text{BubbleSort}(L,n) \\ \hline & \textbf{for } i \leftarrow 0 \text{ to } n-2 \textbf{ do} \\ & \quad \textbf{for } j \leftarrow 0 \text{ to } n-i-2 \textbf{ do} \\ & \quad \quad \textbf{if } L[j] > L[j+1] \textbf{ then} \\ & \quad \quad \quad \text{swap}(L[j], L[j+1]) \\ \hline \end{array} $$`,
    
    'radix': String.raw`$$ \begin{array}{l} \hline \mathbf{Algorithm:} \text{ RadixSort}(L, n) \\ \hline \quad m \leftarrow \text{maximum value in } L \\ \quad \text{exp} \leftarrow 1 \\ \quad \textbf{while } m / \text{exp} > 0 \textbf{ do:} \\ \quad \quad \text{CountingSort}(L, n, \text{exp}) \\ \quad \quad \text{exp} \leftarrow \text{exp} \times 10 \\ \hline \end{array} $$`,
    
    'merge': String.raw`$$ \begin{array}{l} \hline \mathbf{Algorithm:} \text{ MergeSort}(L, \text{left}, \text{right}) \\ \hline \quad \textbf{if } \text{left} < \text{right} \textbf{ then} \\ \quad \quad \text{mid} \leftarrow \text{left} + (\text{right} - \text{left}) // 2 \\ \quad \quad \text{MergeSort}(L, \text{left}, \text{mid}) \\ \quad \quad \text{MergeSort}(L, \text{mid} + 1, \text{right}) \\ \quad \quad \text{Merge}(L, \text{left}, \text{mid}, \text{right}) \\ \hline \end{array} $$`,
    
    'quick': String.raw`$$ \begin{array}{l} \hline \mathbf{Algorithm:} \text{ QuickSort}(L, \text{low}, \text{high}) \\ \hline \quad \textbf{if } \text{low} < \text{high} \textbf{ then} \\ \quad \quad \text{pi} \leftarrow \text{Partition}(L, \text{low}, \text{high}) \\ \quad \quad \text{QuickSort}(L, \text{low}, \text{pi} - 1) \\ \quad \quad \text{QuickSort}(L, \text{pi} + 1, \text{high}) \\ \hline \end{array} $$`,
    
    'power': String.raw`$$ \begin{array}{l} \hline \mathbf{Algorithm:} \text{ PowerSort}(L, n) \\ \hline \quad \text{Stack} \leftarrow \text{Empty} \\ \quad \textbf{while } \text{unprocessed elements remain} \textbf{ do:} \\ \quad \quad R \leftarrow \text{Find next natural run in } L \\ \quad \quad p \leftarrow \text{Compute power between top of Stack and } R \\ \quad \quad \textbf{while } \text{Stack has runs and merge conditions are met based on } p \textbf{ do:} \\ \quad \quad \quad \text{Merge top runs in Stack} \\ \quad \quad \text{Push } R \text{ onto Stack} \\ \quad \textbf{while } \text{Stack has more than one run} \textbf{ do:} \\ \quad \quad \text{Merge remaining runs} \\ \hline \end{array} $$`
};


let baseArray = [];
let visualizers = [];
let isPlaying = false;
let playTimeout; // Changed from interval to timeout for dynamic speed

function formatTime(ms) {
    if (ms < 1000) return `${ms.toFixed(2)} ms`;
    let sec = ms / 1000;
    if (sec < 60) return `${sec.toFixed(2)} s`;
    let min = Math.floor(sec / 60);
    return `${min} m ${(sec % 60).toFixed(2)} s`;
}

function generateArray() {
    const size = parseInt(document.getElementById('array-size').value);
    const condition = document.getElementById('array-condition').value;
    baseArray = [];

    if (condition === 'few-unique') {
        const uniques = [10, 30, 50, 70, 90];
        for (let i = 0; i < size; i++) baseArray.push(uniques[Math.floor(Math.random() * uniques.length)]);
    } else {
        for (let i = 0; i < size; i++) baseArray.push(Math.floor(Math.random() * 100) + 5);
    }

    if (condition === 'nearly-sorted' || condition === 'reversed') {
        baseArray.sort((a, b) => a - b);
        if (condition === 'reversed') baseArray.reverse();
        if (condition === 'nearly-sorted') {
            let swaps = Math.max(1, Math.floor(size * 0.05));
            for(let i=0; i<swaps; i++) {
                let idx1 = Math.floor(Math.random() * size);
                let idx2 = Math.floor(Math.random() * size);
                [baseArray[idx1], baseArray[idx2]] = [baseArray[idx2], baseArray[idx1]];
            }
        }
    }
    setupWorkspaces();
}


class Visualizer {
    constructor(algoKey, container) {
        this.algoKey = algoKey;
        this.container = container;
        this.array = [...baseArray];
        this.isSorted = new Array(this.array.length).fill(false);
        this.actions = [];
        this.currentStep = 0;
        
        this.buildUI();
        this.recordAlgorithm();
    }

    buildUI() {
        const info = complexities[this.algoKey];
        const code = pseudocodes[this.algoKey]; 
        
        this.container.innerHTML = `
            <div class="algo-workspace">
                <h3>${this.algoKey.toUpperCase()} SORT</h3>
                <div class="stats">
                    <p>Time: <span class="time-val">0</span> | Steps: <span class="step-val">0</span> | i: <span class="i-val">-</span> | j: <span class="j-val">-</span></p>
                    <p class="complexity">Best: ${info.best} | Avg: ${info.avg} | Worst: ${info.worst} | Space: ${info.space}</p>
                </div>
                <div class="bars-container" style="height: 250px; position: relative; display: flex; align-items: flex-end; width: 100%; margin-bottom: 20px;"></div>
                <div class="pseudocode-container">
                    ${code}
                </div>
            </div>
        `;
        this.barsContainer = this.container.querySelector('.bars-container');
        this.stepEl = this.container.querySelector('.step-val');
        this.timeEl = this.container.querySelector('.time-val');
        this.iEl = this.container.querySelector('.i-val');
        this.jEl = this.container.querySelector('.j-val');
        this.renderBars();
    }

    renderBars() {
        if (this.array.length > 1000) {
            this.barsContainer.innerHTML = `<p>Visuals disabled for size > 1000. Benchmark only.</p>`;
            return;
        }
        this.barsContainer.innerHTML = '';
        const showLabels = this.array.length < 11;
        
        this.bars = this.array.map((val, idx) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.style.height = `${(val / 105) * 250}px`; 
            
            if (showLabels) {
                bar.innerHTML = `<span class="bar-value">${val}</span><span class="bar-index">${idx}</span>`;
            }
            
            this.barsContainer.appendChild(bar);
            return bar;
        });
    }

    recordAlgorithm() {
        let startTime = performance.now();
        let tempArray = [...this.array];
        
        const ctx = {
            compare: (i, j) => {
                this.actions.push({ type: 'compare', i, j });
                return tempArray[i] > tempArray[j];
            },
            swap: (i, j) => {
                this.actions.push({ type: 'swap', i, j });
                let t = tempArray[i]; tempArray[i] = tempArray[j]; tempArray[j] = t;
            },
            write: (i, val) => { 
                this.actions.push({ type: 'write', i, val, oldVal: tempArray[i] });
                tempArray[i] = val;
            },
            markSorted: (i) => {
                this.actions.push({ type: 'sorted', i });
            }
        };

        algorithms[this.algoKey](tempArray, ctx);
        this.timeEl.innerText = formatTime(performance.now() - startTime);
    }

    updateColors(activeAction) {
        if (this.array.length > 1000) return;
        
        // Reset pseudocode highlights
        this.container.querySelectorAll('.pseudo-compare, .pseudo-swap, .pseudo-write').forEach(el => el.classList.remove('active'));

        for(let i = 0; i < this.bars.length; i++) {
            this.bars[i].style.backgroundColor = this.isSorted[i] ? 'var(--bar-sorted)' : 'var(--bar-default)';
        }
        
        if (activeAction) {
            // Update i and j labels
            this.iEl.innerText = activeAction.i !== undefined ? activeAction.i : '-';
            this.jEl.innerText = activeAction.j !== undefined ? activeAction.j : '-';

            // Highlight corresponding pseudocode step
            const highlightClass = `.pseudo-${activeAction.type}`;
            this.container.querySelectorAll(highlightClass).forEach(el => el.classList.add('active'));

            if (activeAction.type === 'compare') {
                this.bars[activeAction.i].style.backgroundColor = 'var(--bar-compare)';
                if (activeAction.j !== undefined) this.bars[activeAction.j].style.backgroundColor = 'var(--bar-compare)';
            } else if (activeAction.type === 'swap') {
                this.bars[activeAction.i].style.backgroundColor = 'var(--bar-swap)';
                if (activeAction.j !== undefined) this.bars[activeAction.j].style.backgroundColor = 'var(--bar-swap)';
            } else if (activeAction.type === 'write') {
                this.bars[activeAction.i].style.backgroundColor = 'var(--bar-swap)'; 
            }
        } else {
            this.iEl.innerText = '-';
            this.jEl.innerText = '-';
        }
    }

    stepForward(updateDOM = true) {
        if (this.currentStep >= this.actions.length || this.array.length > 1000) return false;
        const action = this.actions[this.currentStep];
        const showLabels = this.array.length < 11;
        
        if (action.type === 'swap') {
            let t = this.array[action.i]; this.array[action.i] = this.array[action.j]; this.array[action.j] = t;
            if (updateDOM) {
                this.bars[action.i].style.height = `${(this.array[action.i] / 105) * 250}px`;
                this.bars[action.j].style.height = `${(this.array[action.j] / 105) * 250}px`;
                if (showLabels) {
                    this.bars[action.i].querySelector('.bar-value').innerText = this.array[action.i];
                    this.bars[action.j].querySelector('.bar-value').innerText = this.array[action.j];
                }
            }
        } else if (action.type === 'write') { 
            this.array[action.i] = action.val;
            if (updateDOM) {
                this.bars[action.i].style.height = `${(this.array[action.i] / 105) * 250}px`;
                if (showLabels) this.bars[action.i].querySelector('.bar-value').innerText = this.array[action.i];
            }
        } else if (action.type === 'sorted') {
            this.isSorted[action.i] = true;
        }
        
        this.currentStep++;
        if (updateDOM) {
            this.stepEl.innerText = this.currentStep;
            this.updateColors(action);
        }
        return true;
    }

    stepBackward() {
        if (this.currentStep <= 0 || this.array.length > 1000) return;
        this.currentStep--;
        const action = this.actions[this.currentStep];
        const showLabels = this.array.length < 11;
        
        if (action.type === 'swap') {
            let t = this.array[action.i]; this.array[action.i] = this.array[action.j]; this.array[action.j] = t;
            this.bars[action.i].style.height = `${(this.array[action.i] / 105) * 250}px`;
            this.bars[action.j].style.height = `${(this.array[action.j] / 105) * 250}px`;
            if (showLabels) {
                this.bars[action.i].querySelector('.bar-value').innerText = this.array[action.i];
                this.bars[action.j].querySelector('.bar-value').innerText = this.array[action.j];
            }
        } else if (action.type === 'write') { 
            this.array[action.i] = action.oldVal;
            this.bars[action.i].style.height = `${(this.array[action.i] / 105) * 250}px`;
            if (showLabels) this.bars[action.i].querySelector('.bar-value').innerText = this.array[action.i];
        } else if (action.type === 'sorted') {
            this.isSorted[action.i] = false;
        }
        
        this.stepEl.innerText = this.currentStep;
        this.updateColors(this.currentStep > 0 ? this.actions[this.currentStep - 1] : null);
    }

    goToEnd() {
        if (this.array.length > 1000) return;
        while (this.currentStep < this.actions.length) {
            this.stepForward(false); 
        }
        const showLabels = this.array.length < 11;
        for(let i = 0; i < this.bars.length; i++) {
            this.bars[i].style.height = `${(this.array[i] / 105) * 250}px`;
            if (showLabels) this.bars[i].querySelector('.bar-value').innerText = this.array[i];
        }
        this.stepEl.innerText = this.currentStep;
        this.updateColors(null);
    }
}

function setupWorkspaces() {
    const container = document.getElementById('workspaces-container');
    container.innerHTML = '';
    visualizers = [];
    isPlaying = false;
    clearTimeout(playTimeout);
    document.getElementById('btn-play').innerHTML = '▶ Run';
    
    const selectedOptions = Array.from(document.getElementById('algo-select').selectedOptions);
    selectedOptions.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'workspace-wrapper';
        container.appendChild(div);
        visualizers.push(new Visualizer(opt.value, div));
    });

    // NEW: Tell MathJax to re-render the newly injected LaTeX
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}


// --- Event Listeners ---
document.getElementById('generate-btn').addEventListener('click', generateArray);
document.getElementById('btn-step-fwd').addEventListener('click', () => visualizers.forEach(v => v.stepForward()));
document.getElementById('btn-step-back').addEventListener('click', () => visualizers.forEach(v => v.stepBackward()));
document.getElementById('btn-reset').addEventListener('click', setupWorkspaces);
document.getElementById('btn-go-end').addEventListener('click', () => visualizers.forEach(v => v.goToEnd()));

// Multi-select listener (Updates instantly when you Ctrl+Click)
document.getElementById('algo-select').addEventListener('change', setupWorkspaces);

// Dynamic Play Loop
function playLoop() {
    if (!isPlaying) return;
    let active = false;
    visualizers.forEach(v => { if (v.stepForward()) active = true; });
    
    if (active) {
        // Read speed slider dynamically
        const delay = 101 - parseInt(document.getElementById('speed-slider').value);
        playTimeout = setTimeout(playLoop, delay);
    } else {
        isPlaying = false;
        document.getElementById('btn-play').innerHTML = '▶ Run';
    }
}

document.getElementById('btn-play').addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        document.getElementById('btn-play').innerHTML = '⏸ Pause';
        playLoop();
    } else {
        document.getElementById('btn-play').innerHTML = '▶ Run';
        clearTimeout(playTimeout);
    }
});

// Init
generateArray();
