const Compare = {
    LESS_THAN:-1,
    BIGGER_THAN:1
}
const defaultCompare=(a,b)=>{
    if(a==b){
        return 0
    }
    return a<b ? Compare.LESS_THAN: Compare.BIGGER_THAN
}
let swaps=[]
const partition=(array,left,right,compareFn) =>{
    const pivot = array[Math.floor((right+left)/2)]

    let i=left
    let j=right
    while(i<=j){
        while(compareFn(array[i],pivot)=== Compare.LESS_THAN){
            i++
        }
        while(compareFn(array[j],pivot)=== Compare.BIGGER_THAN){
            j--
        }
        if(i<=j){
            let temp=array[i]
            array[i]=array[j]
            array[j]=temp
            swaps.push({firstPosition: i,lastPosition: j})
            i++
            j--
        }
    }
    return i
}
const merge = (array, left, mid, right,swaps) => {
    let leftArray = array.slice(left, mid+1)
    let rightArray = array.slice(mid + 1, right + 1)

    let i = 0, j = 0, k = left

    while (i < leftArray.length && j < rightArray.length) {
        if (parseInt(leftArray[i]) <= parseInt(rightArray[j])) {
            array[k] = leftArray[i];
            swaps.push({ firstPosition: left+i, lastPosition: k})
            i++
        } else {
            array[k] = rightArray[j]
            swaps.push({ firstPosition: mid+1+j, lastPosition: k });
    
            j++
        }
        k++
    }
    while (i < leftArray.length) {
        array[k] = leftArray[i]
        swaps.push({ firstPosition: left + i, lastPosition: k });
        i++
        k++
    }
    while (j < rightArray.length) {
        array[k] = rightArray[j]
        swaps.push({ firstPosition: mid + 1 + j, lastPosition: k });
        j++
        k++
    }
    console.log(array)
};

const mergeSortHelper = (array, left, right,swaps) => {
    if(left>= right){
        return
    }
    if (left < right) {
        const mid = left+Math.floor((right - left) / 2)
        mergeSortHelper(array, left, mid,swaps)
        mergeSortHelper(array, mid + 1, right,swaps)
        merge(array, left, mid, right,swaps)
    }
}
const quick=(array,left,right,compareFn)=>{
    if(left<right){
        const index = partition(array,left,right,compareFn)
        if(left < index-1){
            quick(array,left,index-1,compareFn)
        }
        if(index<right){
            quick(array,index,right,compareFn)
        }
    }
}
class SortingAlgorithms{
    constructor({swapBars}) {
        this.swapBars=swapBars
    }
     
    bubbleSort(array){
        const swaps =[]
        for(let i=0;i<array.length;i++){
            for(let j=0;j<array.length-i-1;j++){
                if(array[j]>array[j+1]){
                    let temp=array[j]
                    array[j]=array[j+1]
                    array[j+1]=temp
                    swaps.push({ firstPosition: j,lastPosition: j+1})
                }
            }
        }
        return swaps
    }
    selectionSort(array){
        const swaps=[]
        for(let i=0;i<array.length-1;i++){
            let min=i
            for(let j=i+1;j<array.length;j++){
                if(array[j]<array[min]){
                    min=j
                }
            }
            let temp=array[min]
            array[min]=array[i]
            array[i]=temp
            swaps.push({firstPosition: min,lastPosition: i})
        }
        return swaps
    }
    insertionSort(array) {
        const swaps = [];
        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                swaps.push({ firstPosition: j + 1, lastPosition: j });
                j--;
            }
            array[j + 1] = key;
        }
        return swaps;
    }
    quickSort(array,compareFn=defaultCompare){
        swaps=[]
        quick(array,0,array.length-1,compareFn)
        return swaps
    }
    mergeSort(array) {
        swaps = [];
        mergeSortHelper(array, 0, parseInt(array.length )- 1,swaps)
        console.log("Final sorted array:", array)
        console.log("Final swap operations:", swaps);
        return swaps;
    }
}


export{
    SortingAlgorithms
}