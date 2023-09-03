import React from 'react';
import './App.css';

function App() {

    const graph = [[0, 1, 0], [0, 1, 0], [0, 0, 0]]
    const n = 3 //строки
    const m = 3 //столбцы
    const start_i = 0;
    const start_j = 0;
    const end_j = 2;
    const end_i = 0;

    const neighborValues = [null, null];
    let distance = 0;
    const visitedCells = []
    let distances = [];
    const blockElements = [];
    graph.map((a) => a.map((b) => b === 1 ? blockElements.push(b) : ''))

    function findMoveAlongXY (x, next_i, next_j) {
        let moveAlongY_start = (next_i === end_i) ? 'match' : (next_i < end_i);
        let moveAlongX_start = (next_j === end_j) ? 'match' : (next_j < end_j);

        let moveAlongX = moveAlongX_start;
        let moveAlongY = moveAlongY_start;

        if (visitedCells.length === (n * m - blockElements.length)) {
            return Math.min(...distances)
            console.log(Math.min(...distances), 'result')
        } else if ((moveAlongX === 'match') && (moveAlongY === 'match')) {
            distances.push(distance)
            distance = 0;
            console.log(distances, 'match, push distance')
            findMoveAlongXY(0, start_i, start_j)
        } else if ((moveAlongX === 'match') && (moveAlongY !== 'match')) {
            moveAlongX = true;
            recursiveDisplacementCalculations(x, moveAlongX, moveAlongY, next_i, next_j, true);
        } else if ((moveAlongX !== 'match') && (moveAlongY === 'match')) {
            moveAlongY = true;
            recursiveDisplacementCalculations(x, moveAlongX, moveAlongY, next_i, next_j, true);
        }
    }

    function recursiveDisplacementCalculations (x, moveAlongX, moveAlongY, next_i, next_j, direction) {
        if (direction !== true) {
            moveAlongX = !moveAlongX;
            moveAlongY = !moveAlongY;
        }

        const findSiblingValues = (directionX, directionY) => {
            if (directionX === true) {
                if ((next_j + 1) > m) {
                    neighborValues[0] = 1;
                } else {
                    neighborValues[0] = graph[next_i][next_j + 1];
                }
            } else if (directionX === false) {
                if ((next_j - 1) < 0) {
                    neighborValues[0] = 1;
                } else {
                    neighborValues[0] = graph[next_i][next_j - 1];
                }
            }

            if (directionY === true) {
                if ((next_i + 1) > n) {
                    neighborValues[1] = 1;
                } else {
                    neighborValues[1] = graph[next_i + 1][next_j];
                }
            } else if (directionY === false) {
                if ((next_i - 1) < 0) {
                    neighborValues[1] = 1;
                } else {
                    neighborValues[1] = graph[next_i - 1][next_j];
                }
            }
        }
        findSiblingValues(moveAlongX, moveAlongY)
        const changeCells = (ordinate, movement) => {
            movement ? (ordinate === 'next_i' ? next_j += 1 : next_i += 1)
                : (ordinate === 'next_i' ? next_j -= 1 : next_i -= 1);
            distance += 1
            if (visitedCells.filter((item) => item === [next_i, next_j]).length === 0) {
                visitedCells.push([next_i, next_j])
                console.log(visitedCells, visitedCells.slice(-1), visitedCells.slice(-2, -1), 'visitedCells.slice(-1)')
            }
        }
        console.log(x, moveAlongX, moveAlongY, neighborValues, 'step 1')

        if (neighborValues[x] === 0) {
            if (x === 0) {
                if ((moveAlongX === true) && ((visitedCells.filter((item) => item === [next_i, next_j + 1]).length === 0) || (neighborValues[Number(!x)] !== 0)) && (visitedCells.length > 0 ? (visitedCells.slice(-1)[0][0] !== next_i && visitedCells.slice(-1)[0][1] !== (next_j + 1)) : true) && (visitedCells.length > 1 ? (visitedCells.slice(-2, -1)[0][0] !== next_i && visitedCells.slice(-2, -1)[0][1] !== (next_j + 1)) : true)) {
                    changeCells('next_i', moveAlongX)
                    console.log(next_i, next_j, visitedCells, distances, 'change x, true')
                    findMoveAlongXY(Number(!x), next_i, next_j)
                } else if ((moveAlongX === false) && ((visitedCells.filter((item) => item === [next_i, next_j - 1]).length === 0) || (neighborValues[Number(!x)] !== 0)) && (visitedCells.length > 0 ? (visitedCells.slice(-1)[0][0] !== next_i && visitedCells.slice(-1)[0][1] !== (next_j - 1)) : true) && (visitedCells.length > 1 ? (visitedCells.slice(-2, -1)[0][0] !== next_i && visitedCells.slice(-2, -1)[0][1] !== (next_j - 1)) : true)) {
                    changeCells('next_i', moveAlongX)
                    console.log(next_i, next_j, visitedCells, distances, 'change x, false')
                    findMoveAlongXY(Number(!x), next_i, next_j)
                } else {
                    if(!!direction) {
                        console.log('findWrongWay, x===0')
                        recursiveDisplacementCalculations(0, moveAlongX, moveAlongY, next_i, next_j, false);
                    }
                }
            } else if (x === 1) {
                if ((moveAlongY === true) && ((visitedCells.filter((item) => item === [next_i + 1, next_j]).length === 0) || (neighborValues[x] !== 0)) && (visitedCells.length > 0 ? (visitedCells.slice(-1)[0][0] !== (next_i + 1) && visitedCells.slice(-1)[0][1] !== next_j) : true) && (visitedCells.length > 1 ? (visitedCells.slice(-2, -1)[0][0] !== (next_i + 1) && visitedCells.slice(-2, -1)[0][1] !== next_j) : true)) {
                    changeCells('next_j', moveAlongY)
                    console.log(next_i, next_j, [next_i + 1, next_j], visitedCells, distance, distances, 'change y, true')
                    findMoveAlongXY(0, next_i, next_j)
                } else if ((moveAlongY === false) && ((visitedCells.filter((item) => item === [next_i - 1, next_j]).length === 0) || (neighborValues[x] !== 0)) && (visitedCells.length > 0 ? (visitedCells.slice(-1)[0][0] !== (next_i - 1) && visitedCells.slice(-1)[0][1] !== next_j) : true) && (visitedCells.length > 1 ? (visitedCells.slice(-2, -1)[0][0] !== (next_i - 1) && visitedCells.slice(-2, -1)[0][1] !== next_j) : true)) {
                    changeCells('next_j', moveAlongY)
                    console.log(next_i, next_j, visitedCells, distances, visitedCells.slice(-1), 'change y, false')
                    findMoveAlongXY(0, next_i, next_j)
                } else {
                    if (!!direction) {
                        console.log('findWrongWay, x===1')
                        return recursiveDisplacementCalculations(0, moveAlongX, moveAlongY, next_i, next_j, false);
                    }
                }
            }
        } else if (neighborValues[Number(!x)] === 0) {
            recursiveDisplacementCalculations(Number(!x), moveAlongX, moveAlongY, next_i, next_j, true);
            console.log('step 3')
        } else {
            if (!direction) {
                findMoveAlongXY(0, next_i, next_j)
            } else {
                console.log('findWrongWay')
                recursiveDisplacementCalculations(0, moveAlongX, moveAlongY, next_i, next_j, false);
            }
        }
    }

    findMoveAlongXY(0, start_i, start_j)
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