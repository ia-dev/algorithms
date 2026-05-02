import { bubbleSort } from './algorithms/sorting/bubbleSort.js';
import { quickSort } from './algorithms/sorting/quickSort.js';
import { selectionSort } from './algorithms/sorting/selectionSort.js';
import { insertionSort } from './algorithms/sorting/insertionSort.js';
import { mergeSort } from './algorithms/sorting/mergeSort.js';
import { radixSort } from './algorithms/sorting/radixSort.js';
import { powerSort } from './algorithms/sorting/powerSort.js';

const algorithms = { 
    'bubble': bubbleSort, 'quick': quickSort, 'selection': selectionSort, 
    'insertion': insertionSort, 'merge': mergeSort, 'radix': radixSort, 'power': powerSort 
};

const complexities = {
    'bubble': { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    'quick': { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    'selection': { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    'insertion': { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    'merge': { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    'radix': { best: 'O(nk)', avg: 'O(nk)', worst: 'O(nk)', space: 'O(n+k)' },
    'power': { best: 'O(n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' }
};

const pseudocodes = {
    'bubble': String.raw`$$ \begin{array}{l} \textbf{for } i = 0 \text{ to } n-1 \\ \quad \textbf{for } j = 0 \text{ to } n-i-1 \\ \quad \quad \textbf{if } A[j] > A[j+1] \textbf{ then} \\ \quad \quad \quad \text{swap}(A[j], A[j+1]) \end{array} $$`,
    
    'selection': String.raw`$$ \begin{array}{l} \textbf{for } i = 0 \text{ to } n-1 \\ \quad \text{min} = i \\ \quad \textbf{for } j = i+1 \text{ to } n \\ \quad \quad \textbf{if } A[j] < A[\text{min}] \textbf{ then } \text{min} = j \\ \quad \text{swap}(A[i], A[\text{min}]) \end{array} $$`,
    
    'insertion': String.raw`$$ \begin{array}{l} \textbf{for } i = 1 \text{ to } n-1 \\ \quad j = i \\ \quad \textbf{while } j > 0 \text{ and } A[j-1] > A[j] \\ \quad \quad \text{swap}(A[j], A[j-1]) \\ \quad \quad j = j - 1 \end{array} $$`,
    
    'merge': String.raw`$$ \begin{array}{l} \text{MergeSort}(A, L, R) \\ \quad \textbf{if } L < R \textbf{ then} \\ \quad \quad M = (L+R)/2 \\ \quad \quad \text{MergeSort}(A, L, M) \\ \quad \quad \text{MergeSort}(A, M+1, R) \\ \quad \quad \text{Merge}(A, L, M, R) \end{array} $$`,
    
    'quick': String.raw`$$ \begin{array}{l} \text{QuickSort}(A, L, R) \\ \quad \textbf{if } L < R \textbf{ then} \\ \quad \quad P = \text{Partition}(A, L, R) \\ \quad \quad \text{QuickSort}(A, L, P-1) \\ \quad \quad \text{QuickSort}(A, P+1, R) \end{array} $$`,
    
    'radix': String.raw`$$ \begin{array}{l} \text{max} = \text{GetMax}(A) \\ \textbf{for } \text{exp} = 1, 10, 100, \dots \text{ while } \text{max}/\text{exp} > 0 \\ \quad \text{CountingSort}(A, \text{exp}) \end{array} $$`,
    
    'power': String.raw`$$ \begin{array}{l} \text{Identify natural runs in } A \\ \textbf{while } \text{more than 1 run exists} \\ \quad \text{Merge adjacent runs based on power} \end{array} $$`
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
        this.isSorted = new Array(this.array.length).fill(false); // Track sorted elements
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
                    <p>Time: <span class="time-val">0</span> | Steps: <span class="step-val">0</span></p>
                    <p class="complexity">Best: ${info.best} | Avg: ${info.avg} | Worst: ${info.worst} | Space: ${info.space}</p>
                </div>
                <!-- FIX: Added explicit height and position relative here -->
                <div class="bars-container" style="height: 250px; position: relative; display: flex; align-items: flex-end; width: 100%;"></div>
                <div class="pseudocode-container">
                    ${code}
                </div>
            </div>
        `;
        this.barsContainer = this.container.querySelector('.bars-container');
        this.stepEl = this.container.querySelector('.step-val');
        this.timeEl = this.container.querySelector('.time-val');
        this.renderBars();
    }


    renderBars() {
        if (this.array.length > 1000) {
            this.barsContainer.innerHTML = `<p>Visuals disabled for size > 1000. Benchmark only.</p>`;
            return;
        }
        this.barsContainer.innerHTML = '';
        this.bars = this.array.map(val => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            // FIX: Calculate exact pixels instead of percentages
            bar.style.height = `${(val / 105) * 250}px`; 
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
            write: (i, val) => { // NEW: Allows overwriting values for Merge/Radix sort
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
        for(let i = 0; i < this.bars.length; i++) {
            this.bars[i].style.backgroundColor = this.isSorted[i] ? 'var(--bar-sorted)' : 'var(--bar-default)';
        }
        if (activeAction) {
            if (activeAction.type === 'compare') {
                this.bars[activeAction.i].style.backgroundColor = 'var(--bar-compare)';
                this.bars[activeAction.j].style.backgroundColor = 'var(--bar-compare)';
            } else if (activeAction.type === 'swap') {
                this.bars[activeAction.i].style.backgroundColor = 'var(--bar-swap)';
                this.bars[activeAction.j].style.backgroundColor = 'var(--bar-swap)';
            } else if (activeAction.type === 'write') {
                this.bars[activeAction.i].style.backgroundColor = 'var(--bar-swap)'; // Highlight overwrite
            }
        }
    }

    stepForward(updateDOM = true) {
        if (this.currentStep >= this.actions.length || this.array.length > 1000) return false;
        const action = this.actions[this.currentStep];
        
        if (action.type === 'swap') {
            let t = this.array[action.i]; this.array[action.i] = this.array[action.j]; this.array[action.j] = t;
            if (updateDOM) {
                // FIX: Use 250px
                this.bars[action.i].style.height = `${(this.array[action.i] / 105) * 250}px`;
                this.bars[action.j].style.height = `${(this.array[action.j] / 105) * 250}px`;
            }
        } else if (action.type === 'write') { 
            this.array[action.i] = action.val;
            // FIX: Use 250px
            if (updateDOM) this.bars[action.i].style.height = `${(this.array[action.i] / 105) * 250}px`;
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
        
        if (action.type === 'swap') {
            let t = this.array[action.i]; this.array[action.i] = this.array[action.j]; this.array[action.j] = t;
            // FIX: Use 250px
            this.bars[action.i].style.height = `${(this.array[action.i] / 105) * 250}px`;
            this.bars[action.j].style.height = `${(this.array[action.j] / 105) * 250}px`;
        } else if (action.type === 'write') { 
            this.array[action.i] = action.oldVal;
            // FIX: Use 250px
            this.bars[action.i].style.height = `${(this.array[action.i] / 105) * 250}px`;
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
        for(let i = 0; i < this.bars.length; i++) {
            // FIX: Use 250px
            this.bars[i].style.height = `${(this.array[i] / 105) * 250}px`;
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
