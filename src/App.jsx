import React from 'react';
import './App.css';

function App() {

    const graph = [[0, 1, 0], [0, 1, 0], [0, 0, 0]]
    const n = 3 //строки
    const m = 3 //столбцы

    const start_i = 0;
    const start_j = 0;
    const end_i = 2;
    const end_j = 0;

    const neighborValues = [null, null];

    let next_i = start_i;
    let next_j = start_j;
    let moveAlongX = '';
    let moveAlongY = '';
    let distance = 0;
    const visitedCells = []
    const twiceVisitedCells = []

    let distances = [];
    // for (let i = 0; i < N; i++) {
    //     distances[i] = [];
    //     for (let j = 0; j < M; j++) {
    //         distances[i][j] = Infinity;
    //     }
    // }

    const moveAlongX_start = (next_i === end_i) ? 'match' : (next_i < end_i);
    const moveAlongY_start = (next_j === end_j) ? 'match' : (next_j < end_j);

    const findSiblingValues = (directionX, directionY) => {
        if (directionX === 'match') {
            neighborValues[0] = 2;
        } else if (directionX === true) {
            if ((next_j + 1) > m) {
                neighborValues[0] = null;
            } else {
                neighborValues[0] = graph[next_i][next_j + 1];
            }
        } else if (directionX === false) {
            if ((next_j - 1) < 0) {
                neighborValues[0] = null;
            } else {
                neighborValues[0] = graph[next_i][next_j - 1];
            }
        }

        if (directionY === 'match') {
            neighborValues[1] = 2;
        } else if (directionY === true) {
            if ((next_i + 1) > n) {
                neighborValues[1] = null;
            } else {
                neighborValues[1] = graph[next_i + 1][next_j];
            }
        } else if (directionY === false) {
            if ((next_i - 1) < 0) {
                neighborValues[1] = null;
            } else {
                neighborValues[1] = graph[next_i - 1][next_j];
            }
        }
    }

    let checkWrongX = false;
    let checkWrongY = false;

    const recursiveDisplacementCalculations = (x) => {

        const startRecursive = () => {
            if (((moveAlongX === moveAlongX_start) && (moveAlongY === moveAlongY_start))) {
                recursiveDisplacementCalculations(x)
            } else if (moveAlongX !== moveAlongX_start) {
                moveAlongX = moveAlongX_start
                recursiveDisplacementCalculations(1)
            } else if (moveAlongY !== moveAlongY_start) {
                moveAlongY = moveAlongY_start
                recursiveDisplacementCalculations(0)
            }
        }

        if (visitedCells.length === n*m) {
            return// distances minimum
        } else {
            const changeCells = (ordinate, movement) => {
                movement ? (ordinate === 'next_i' ? next_j += 1 : next_i += 1)
                    : (ordinate === 'next_i' ? next_j -= 1 : next_i -= 1);

                // const equalsVisitedCells = visitedCells.filter((item) => item === [next_i, next_j]);
                // if (equalsVisitedCells.length === 0) {
                //     visitedCells.push([next_i, next_j])
                //     distance += 1
                // } else {
                //     twiceVisitedCells.push([next_i, next_j])
                //     distance -= 1
                // }
                if (visitedCells.filter((item) => item === [next_i, next_j]).length === 0) {
                    visitedCells.push([next_i, next_j])
                    distance += 1
                }
                distance += 1
            }

            moveAlongX = (next_i === end_i) ? 'match' : (next_i < end_i);
            moveAlongY = (next_j === end_j) ? 'match' : (next_j < end_j);
            findSiblingValues(moveAlongX, moveAlongY) //call?

            // if (moveAlongX = 'match') {
            //     if (moveAlongY = 'match') {
            //         return distance;
            //     } else {
            //
            //     }
            // } else if (moveAlongY = 'match') {

            if ((moveAlongX === 'match') && (moveAlongY === 'match')) {
                distances.push(distance)
                distance = 0;
                next_i = start_i;
                next_j = start_j;
                recursiveDisplacementCalculations(0);
            } else if ((moveAlongX === 'match') && (moveAlongY !== 'match')) {
                moveAlongX = true;
            } else if ((moveAlongX !== 'match') && (moveAlongY === 'match')) {
                moveAlongY = true;
            } else {
                if (neighborValues[x] === 0) {
                    if (x === 0) {
                        if ((moveAlongX === true)
                            && (visitedCells.filter((item) => item === [next_i, next_j + 1]).length === 0
                            || (neighborValues[Number(!x)] !== 0))
                            && [[next_i, next_j + 1]] !== visitedCells.slice(-1))
                        {
                            changeCells('next_i', moveAlongX)
                            startRecursive()

                        } else if ((moveAlongX === false)
                                && (visitedCells.filter((item) => item === [next_i, next_j - 1]).length === 0
                                    || (neighborValues[Number(!x)] !== 0))
                                && [[next_i, next_j - 1]] !== visitedCells.slice(-1))
                        {
                            changeCells('next_i', moveAlongX)
                            startRecursive()
                        }
                    } else if (x === 1) {
                        if ((moveAlongY === true)
                            && (visitedCells.filter((item) => item === [next_i + 1, next_j]).length === 0
                            || (neighborValues[x] !== 0))
                        && [[next_i + 1, next_j]] !== visitedCells.slice(-1))
                        {
                            changeCells('next_j', moveAlongY)
                            startRecursive()
                        } else if ((moveAlongY === false)
                            && (visitedCells.filter((item) => item === [next_i - 1, next_j]).length === 0
                            || (neighborValues[x] !== 0))
                        && [[next_i - 1, next_j]] !== visitedCells.slice(-1))
                        {
                            changeCells('next_j', moveAlongY)
                            startRecursive()
                        }
                    }
                } else if ((neighborValues[Number(!x)] === 0) && (moveAlongX === moveAlongX_start) && (moveAlongY === moveAlongY_start)) {
                    recursiveDisplacementCalculations(Number(!x))
                } else {
                    findSiblingValues(!moveAlongX_start, !moveAlongY_start);

                    if ((neighborValues[0] === 0) && (neighborValues[1] === 1)) {
                        moveAlongX = !moveAlongX_start;
                        changeCells('next_i', moveAlongX)
                        recursiveDisplacementCalculations(1)
                    } else if ((neighborValues[1] === 0) && (neighborValues[0] === 1)) {
                        moveAlongY = !moveAlongY_start;
                        changeCells('next_j', moveAlongY)
                        recursiveDisplacementCalculations(0)
                    } else if ((neighborValues[0] === 0) && (neighborValues[1] === 0)) {

                        if () {

                        }

                        moveAlongY = !moveAlongY_start;
                        changeCells('next_j', moveAlongY)
                        recursiveDisplacementCalculations(0)
                    } else {
                        distances.push(0)
                        distance = 0;
                        next_i = start_i;
                        next_j = start_j;
                        recursiveDisplacementCalculations(0);
                    }


                    // if ((moveAlongX === moveAlongX_start) && (moveAlongY === moveAlongY_start)) {
                    //     moveAlongX = !moveAlongX_start;
                    //     recursiveDisplacementCalculations(0)
                    // } else if ((moveAlongX !== moveAlongX_start) && (moveAlongY === moveAlongY_start)) {
                    //     moveAlongX = moveAlongX_start;
                    //     moveAlongY = !moveAlongY_start;
                    //     recursiveDisplacementCalculations(1)
                    // } else if ((moveAlongX === moveAlongX_start) && (moveAlongY !== moveAlongY_start)) {
                    //     moveAlongX = !moveAlongX_start;
                    //     moveAlongY = moveAlongY_start;
                    //     recursiveDisplacementCalculations(0)
                    // }
                }
            }
        }
    }

    recursiveDisplacementCalculations(0)

    return (
        <div className="App">
            k
        </div>
    );
}

export default App;


// // Функция для нахождения кратчайшего пути в лабиринте
// function findShortestPath(N, M, x1, y1, x2, y2, labyrinth) {
//     // Создаем двумерный массив для хранения расстояний до каждой ячейки
//     let distances = [];
//     for (let i = 0; i < N; i++) {
//         distances[i] = [];
//         for (let j = 0; j < M; j++) {
//             distances[i][j] = Infinity;
//         }
//     }
//
//     // Начальное расстояние до точки пробуждения будет 0
//     distances[x1][y1] = 0;
//
//     // Создаем очередь, которую будем использовать для обхода лабиринта в ширину
//     let queue = [];
//     queue.push({ x: x1, y: y1 });
//
//     // Пока очередь не пуста, продолжаем обходить лабиринт
//     while (queue.length > 0) {
//         let current = queue.shift();
//
//         // Проверяем ячейки, куда можно переместиться из текущей ячейки
//         let neighbors = [
//             { x: current.x + 1, y: current.y }, // справа
//             { x: current.x - 1, y: current.y }, // слева
//             { x: current.x, y: current.y + 1 }, // сверху
//             { x: current.x, y: current.y - 1 }, // снизу
//         ];
//
//         for (let i = 0; i < neighbors.length; i++) {
//             let neighbor = neighbors[i];
//
//             // Проверяем, что соседняя ячейка находится в пределах лабиринта
//             if (neighbor.x >= 0 && neighbor.x < N && neighbor.y >= 0 && neighbor.y < M) {
//                 // Проверяем, что соседняя ячейка является проходом (0) и еще не была посещена
//                 if (labyrinth[neighbor.x][neighbor.y] === 0 && distances[neighbor.x][neighbor.y] === Infinity) {
//                     // Обновляем расстояние до соседней ячейки
//                     distances[neighbor.x][neighbor.y] = distances[current.x][current.y] + 1;
//
//                     // Если соседняя ячейка - точка выхода, возвращаем найденное расстояние
//                     if (neighbor.x === x2 && neighbor.y === y2) {
//                         return distances[neighbor.x][neighbor.y];
//                     }
//
//                     // Добавляем соседнюю ячейку в очередь для дальнейшего обхода
//                     queue.push(neighbor);
//                 }
//             }
//         }
//     }
//
//     // Если не удалось достичь точки выхода, возвращаем 0
//     return 0;
// }
//
// // Чтение входных данных
// let input = require('fs').readFileSync('/dev/stdin', 'utf8');
// let lines = input.split('\n');
//
// let NM = lines[0].split(' ').map(Number);
// let N = NM[0];
// let M = NM[1];
//
// let start = lines[1].split(' ').map(Number);
// let x1 = start[0];
// let y1 = start[1];
//
// let end = lines[2].split(' ').map(Number);
// let x2 = end[0];
// let y2 = end[1];
//
// let labyrinth = [];
// for (var i = 3; i < N + 3; i++) {
//     labyrinth.push(lines[i].split(' ').map(Number));
// }
//
// // Вызов функции для нахождения кратчайшего пути
// let shortestPathLength = findShortestPath(N, M, x1, y1, x2, y2, labyrinth);
//
// // Вывод результатов
// console.log(shortestPathLength);