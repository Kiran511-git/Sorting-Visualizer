import {sleep} from "./helpers/util.js";
import { SortingAlgorithms } from "./helpers/sortingAlgorithms.js";
let nBars = 10
let numbersBars = document.getElementById('numbersBars')
const stage = document.getElementById('stage')
stage.style.width = `${nBars * 300}px`
const selectAlgorithm =document.getElementById('selectAlgorithm')
const generateBtn=document.getElementById('generateBtn')
const solveBtn =document.getElementById('solveBtn')
let bars=[]
let barsDivs=[]
const sortingAlgorithms = new SortingAlgorithms({})
const start = () => {
    stage.innerHTML = ''
    const stageWidth = stage.clientWidth
    const maxBarWidth = 10 // Maximum width of a bar
    const minBarWidth = 10 // Minimum width of a bar
    const spacing = 15 // Space between bars

    // Calculate the optimal bar width based on the number of bars
    let barWidth = Math.max(
        minBarWidth,
        Math.floor((stageWidth - (nBars + 1) * spacing) / nBars)
    );

    // If the calculated barWidth exceeds the maxBarWidth, use maxBarWidth
    if (barWidth > maxBarWidth) {
        barWidth = maxBarWidth
    }

    bars = Array(nBars).fill(0).map(() => {
        return {
            width: barWidth,
            height: Math.floor(Math.random() * 200) + 1
        }
    })

    barsDivs = []
    for (let i = 0; i < bars.length; i++) {
        const bar = document.createElement('div')
        bar.style.width = `${bars[i].width}px`
        bar.style.height = `${bars[i].height}px`
        bar.style.left = `${spacing + i * (barWidth + spacing)}px` // Adjust position
        bar.classList.add('bar')
        bars[i] = { ...bars[i], position: i }
        barsDivs.push(bar)
        stage.appendChild(bar)
    }

    // Adjust stage width to fit all bars including spacing
    stage.style.width = `${nBars * (barWidth + spacing) + spacing}px`
};

start()
async function swapBars(barsDivs, i, j) {
    if (barsDivs[i] && barsDivs[j]) {
        const leftI = barsDivs[i].style.left
        const leftJ = barsDivs[j].style.left

        // Swap the left positions of the bars
        barsDivs[i].style.left = leftJ
        barsDivs[j].style.left = leftI

        // Add animation classes
        barsDivs[i].classList.add('activate')
        barsDivs[j].classList.add('activate')

        await sleep(300)

        // Remove animation classes
        barsDivs[i].classList.remove('activate')
        barsDivs[j].classList.remove('activate')

        // Swap the actual bars in the array to keep the reference correct
        let temp = barsDivs[i]
        barsDivs[i] = barsDivs[j]
        barsDivs[j] = temp
    }
}

const algorithms = [
    sortingAlgorithms.bubbleSort,
    sortingAlgorithms.selectionSort,
    sortingAlgorithms.insertionSort,
    sortingAlgorithms.quickSort,
    sortingAlgorithms.mergeSort
]
const solve = async () => {
    const array = structuredClone(bars.map(el => el.height))
    const swaps = algorithms[selectAlgorithm.selectedIndex](array)
    
    for (let i = 0; i < swaps.length; i++) {
        const {firstPosition,lastPosition} = swaps[i]
        if (firstPosition !== lastPosition) {
            await swapBars(barsDivs, firstPosition, lastPosition)
        }
    }
}

generateBtn.addEventListener('click',() =>{
    nBars = parseInt(numbersBars.value,10)
    stage.style.width = `${nBars * 30}px`
    start()
})
solveBtn.addEventListener('click',() =>{
    solve()
})