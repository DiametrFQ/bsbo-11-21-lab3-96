class Vertex{
    constructor(key, leftSon, height, depth, rightSibling){
        this.key =  key                    //значение в вершине 
        this.leftSon = leftSon             //левый ребенок вершины 
        this.height = height               //высота поддерева данной вершины 
        this.depth = depth                 //глубина вершины 
        this.rightSibling = rightSibling   //ссылки на "братьев" данной вершины 
    }
}

const depth = (nums, i, head) =>{//строим дерево

    if(nums[i] < +head.key){ //меньше ли число данного узла
        if(head.leftSon.key === 0){ //у нас левый сын есть?
            if(head.leftSon.rightSibling.key > 0){//У нас нет левого сыны, а правый?
                head.leftSon = new Vertex(nums[i], new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)), 0, 0, head.leftSon.rightSibling)//Добавляем нового левого сына, и прикрепляем к нему правого
            }
            else{
                head.leftSon = new Vertex(nums[i], new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)), 0, 0, new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)))//Просто добавляем нового левого сына
            }
        }
        else{ //У нас есть левый сын - отправляем узел сравнивать с ним
            depth(nums, i, head.leftSon)
        }
    }
    else{
        if(head.leftSon.rightSibling.key == undefined||head.leftSon.rightSibling.key == 0){//у нас правый сын есть?
            if(+head.leftSon.key == 0){//А левый?
                head.leftSon = new Vertex(0, new Vertex( 0, new Vertex(0), 0, 0, new Vertex(0)), 0, 0, new Vertex(0))//Нет левого сына - создадим пустышку, чтобы добавить через него правого
            }
            head.leftSon.rightSibling = new Vertex(nums[i], new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)), 0, 0, new Vertex(0, new Vertex(0), 0, 0, new Vertex(0)))//создаем правого сына
        }
        else{//У нас есть правый сын - отправляем узел сравнивать с ним
            depth(nums, i, head.leftSon.rightSibling)
        }
    }
}

let newNums = ''
const semetry = (vertex) => {//симметричный обход дерева
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
const back = (vertex) => {//обратный обход дерева
    if(vertex.key>0)
    {
        back(vertex.leftSon)
        back(vertex.leftSon.rightSibling)
        newNums += vertex.key
    }
}

const treeToArr = (head, i, loor) => {//Превратить дерево в +- красивый вывод

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
const buildTree = (nums, typeRead) => {//полная постройка дерева
    newNums = ''
    let arr = [0]
    let arr2 = [0]

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

        arr[arr.indexOf(Math.max.apply(null, arr)) ] = 0
    }
    
    let root = new Vertex(+arr2[0], new Vertex(0, new Vertex(0), 0, 0, 0, new Vertex(0)), 0, 0, 0)// создаем корень

    for (let i = 1; i < arr2.length; i++) {
        depth(arr2,i, root)// создаем дерево
    }
    for (let i = 0; i < arr2.length; i++) {
        arrayTree[i] = [['']]
    }
    
    treeToArr(root, 0, 0, 0)// вывод дерева в консоль

    typeRead(root)// чтение дерева

    return [newNums, arr2]
}

let A = '4318' //значения дерева А
let B = '23456'//значения дерева B

let [A_read, A_vertexes] = buildTree(A, back)
let [B_read, B_vertexes] = buildTree(B, semetry) 

//Операция А = A \ B означает, что из дерева А исключаются узлы, присутствующие в дереве В
for(let j = 0; j < B.length; j++){
    if( A.includes(B[j]) ){
        A = A.replace(B[j], '')
    }
}
arrayTree = [[]]

let [A_read2, A_vertexes2] = buildTree(A, straight)

console.log("A "+ A)
console.log(A_read2, A_vertexes2)
console.log(arrayTree)

// let tree = '333337777999224'

// let [tree_read, tree_vertexes, tree_price] = buildTree(tree, semetry)

// console.log(tree_read, tree_vertexes, tree_price)
// console.log(arrayTree)