/* eslint-env browser */
//this data will later be given by the survey with a corresponding JSON

var codeString1 = `public int[] getArray(int start, int end) {
    int[] array = new int[end - start + 1];
    for(int i = 0; i <= end - start; i++) {
        array[i] = start + i;
    }
    return array;
}`,
    codeString2 = `public void printValues(int start, int end) {
    int[] array = getArray(start, end);

    for(int i = 0; i < array.length; i++) {
        System.out.println((array));
    }
}

private int[] getArray(int start, int end) {
    int[] array = new int[end - start + 1];
    for(int i = 0; i <= end - start; i++) {
        array[i] = start + i;
    }
    return array;
}`,
    codeString3 = `public int arraySum(int[] array) {
    //Ergänzen Sie hier Ihre Lösung
}`,
    evaluationCode1 = `public int arraySum(int[] array) {
    for(int i = 0; i < array.length(); i++) {
        System.out.println(array[i]);
    }
}`,
    evaluationCode2 = `public int arraySum(int[] array) {
    int sum = 0;
    for(int i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}`,
    discussionCode2 = `public int arraySum(int[] array) {
    int sum = 0;

    for(int i = 0; i < array.length(); i++) {
        sum += array[i];
    }

    return sum;
}`;

const Examples = {
    syntax: {
        task: `<span class="bold">Aufgabe 1:</span> Markieren Sie alle Zeilen der folgenden Methode, in denen innerhalb eines Arrays Werte zugewiesen werden!`,
        code: codeString1,
        highlights: [
            {
                list: [1,3],
                editor: "5",
            },
            {
                list: [1],
                editor: "51",
            },
        ],
        heatmap: {
            light: [5],
            medium: [1],
            strong: [3],
        },
        solution: [1,3],
    },
    type: {
        code: codeString2,
        highlight: {
            anchor: { line: 4, ch: 28 },
            head: { line: 4, ch: 33 },
        },
        evaluations: [
            {isLegal: true, type: "int[]", editor: "14"}, 
            {isLegal: true, type: "String", editor: "37"},
        ],
        expression: "array",
        histogramm: [
            {
                group: "int[]",
                correct: 26,
                rest: 5,
            },
            {
                group: "int",
                correct: 6,
                rest: 13,
            },
            {
                group: "String",
                correct: 1,
                rest: 6,
            },
            {
                group: "unzulässig",
                correct: 0,
                rest: 3,
            },
        ],
        solution: {isLegal: true, type: "int[]"},
    },
    microtask: {
        task: `<span class="bold">Aufgabe 3:</span> Implementieren Sie die Methode \"public int arraySum(int[] array)\", die alle im übergebenen Array enthaltenen Werte zu einem Gesamtwert aufsummiert und zurückgibt!`,
        code: codeString3,
        evaluations: [{code: evaluationCode1, editor: "5"}, {code: evaluationCode2, editor: "13"}],
        discussionSolutions: [{code: evaluationCode2, percentage: 84}, {code: discussionCode2, percentage: 44}],
        solution: evaluationCode2,
    },
};

export default Examples;