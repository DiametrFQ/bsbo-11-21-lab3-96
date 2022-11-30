class Vertex{
    constructor(key, leftSon, height, depth, rightSibling){
        this.key =  key                    //значение в вершине 
        this.leftSon = leftSon             //левый ребенок вершины 
        this.height = height               //высота поддерева данной вершины 
        this.depth = depth                 //глубина вершины 
        this.rightSibling = rightSibling   //ссылки на "братьев" данной вершины 
    }
}

const depth = (nums, i, head) =>{

    if(nums[i] < +head.key){
        if(head.leftSon.key === 0){
            if(head.leftSon.rightSibling.key > 0){
                head.leftSon = new Vertex(nums[i], new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)), 0, 0, head.leftSon.rightSibling)
            }
            else{
                head.leftSon = new Vertex(nums[i], new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)), 0, 0, new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)))
            }
        }
        else{
            depth(nums, i, head.leftSon)
        }
    }
    else{
        if(head.leftSon.rightSibling.key == undefined||head.leftSon.rightSibling.key == 0){
            if(+head.leftSon.key == 0){
                head.leftSon = new Vertex(0, new Vertex( 0, new Vertex(0), 0, 0, new Vertex(0)), 0, 0, new Vertex(0))
            }
            head.leftSon.rightSibling = new Vertex(nums[i], new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)), 0, 0, new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)))
        }
        else{
            depth(nums, i, head.leftSon.rightSibling)
        }
    }
}

let newNums = ''
const semetry = (vertex) => {
    if(vertex.leftSon.key >0){
        semetry(vertex.leftSon)
        if(vertex.leftSon.rightSibling.key >0 && vertex.leftSon.key >0){
            newNums.length -= 1
        }
        else{
            newNums += vertex.key
        }
    }
    if(vertex.leftSon.rightSibling.key >0){
        newNums += vertex.key
        semetry(vertex.leftSon.rightSibling)
    }
    if(vertex.leftSon.rightSibling.key == 0 && vertex.leftSon.key == 0 ){
        newNums += vertex.key
    }
}

const straight = (vertex) => {
    if(vertex.key>0)
    {
        newNums += vertex.key
        straight(vertex.leftSon)
        straight(vertex.leftSon.rightSibling)
    }
}
const back = (vertex) => {
    if(vertex.key>0)
    {
        back(vertex.leftSon)
        back(vertex.leftSon.rightSibling)
        newNums += vertex.key
    }
}

const treeToArr = (head, i, loor) => {

    arrayTree[ i ][ loor ] += `${head.key} `

    if(head.leftSon != undefined && head.leftSon.key > 0){
        arrayTree[ i+1 ][ loor] += `${head.key} ->`
        treeToArr(head.leftSon, i+1, loor)
    }
    if(head.leftSon.rightSibling != undefined && head.leftSon.rightSibling.key > 0){
        arrayTree[ i+1 ][ loor+1 ] = arrayTree[ i+1 ][ loor+1 ] == undefined? '': arrayTree[ i+1 ][ loor+1 ]
        arrayTree[ i+1 ][ loor+1 ] += `${head.key} -> `
        treeToArr(head.leftSon.rightSibling, i+1, loor+1)
    }
}

let arrayTree = [[]]
const buildTree = (nums, typeRead) => {
    newNums = ''
    let arr = [0]
    let arr2 = [0]
    let arr3 = [0]

    for (let j = 1; j <= 10; j++)  arr[j] = 0    

    for (let i = 1; i < 10; i++) {
        for (let j = 0; j <= nums.length; j++) {
            if(nums[j] == i) arr[i] += 1
        }
    }
    for(let i = 0; i <= 9; i++) {
        if(arr.indexOf(Math.max.apply(null, arr)) == 0){
            break
        }
        arr2[i] = arr.indexOf(Math.max.apply(null, arr))
        arr3[i] = arr[arr.indexOf(Math.max.apply(null, arr)) ]

        arr[arr.indexOf(Math.max.apply(null, arr)) ] = 0
    }
    
    let root = new Vertex(+arr2[0], new Vertex(0, new Vertex(0), 0, 0, 0, new Vertex(0)), 0, 0, 0)

    for (let i = 1; i < arr2.length; i++) {
        depth(arr2,i, root)
    }

    for (let i = 0; i < arr2.length; i++) {
        arrayTree[i] = [['']]
    }
    
    treeToArr(root, 0, 0, 0)

    typeRead(root)

    return [newNums, arr2, arr3]
}

let A = '44673543'
let B = '1277685555555555555555533333333333334444444'
let C = ''

let [A_read, A_vertexes, A_price] = buildTree(A, back)
let [B_read, B_vertexes, B_price] = buildTree(B, semetry)

for (let i = 0; i < A_vertexes.length; i++) {

    for(let j = 0; j < A_price[i]; j++){
        C+=A_vertexes[i]
    } 
}
for (let i = 0; i < B_vertexes.length; i++) {

    for(let j = 0; j < B_price[i]; j++){
        C+=B_vertexes[i]
    }
}
let [C_read, C_vertexes, C_price] = buildTree(C, straight)

WAH = 0

for (let i = 0; i < C_vertexes.length; i++) {

    WAH += C_read[i] * C_vertexes[i]
}

console.log("Cредневзвешенная высота "+ WAH)
console.log("C "+ C)

console.log(C_read, C_vertexes, C_price)
console.log(arrayTree)